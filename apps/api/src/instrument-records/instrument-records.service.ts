import { accessibleBy } from '@casl/mongoose';
import type { FormDataType } from '@douglasneuroinformatics/form-types';
import { linearRegression } from '@douglasneuroinformatics/stats';
import { yearsPassed } from '@douglasneuroinformatics/utils';
import { Injectable } from '@nestjs/common';
import type { FormInstrument, FormInstrumentMeasures } from '@open-data-capture/common/instrument';
import type {
  CreateInstrumentRecordData,
  InstrumentRecordsExport,
  LinearRegressionResults
} from '@open-data-capture/common/instrument-records';
import type { FilterQuery } from 'mongoose';

import type { EntityOperationOptions } from '@/core/types';
import { GroupsService } from '@/groups/groups.service';
import { InstrumentsService } from '@/instruments/instruments.service';
import { SubjectsService } from '@/subjects/subjects.service';

import { InstrumentRecordsRepository } from './instrument-records.repository';

import type { InstrumentRecordEntity } from './entities/instrument-record.entity';

@Injectable()
export class InstrumentRecordsService {
  constructor(
    private readonly groupsService: GroupsService,
    private readonly instrumentRecordsRepository: InstrumentRecordsRepository,
    private readonly instrumentsService: InstrumentsService,
    private readonly subjectsService: SubjectsService
  ) {}

  async count(filter: FilterQuery<InstrumentRecordEntity> = {}, { ability }: EntityOperationOptions = {}) {
    return this.instrumentRecordsRepository.count({
      $and: [filter, ability ? accessibleBy(ability, 'read').InstrumentRecord : {}]
    });
  }

  async create(
    { assignmentId, data, date, groupId, instrumentId, subjectIdentifier }: CreateInstrumentRecordData,
    options?: EntityOperationOptions
  ) {
    const group = groupId ? await this.groupsService.findById(groupId, options) : undefined;
    const instrument = await this.instrumentsService.findById(instrumentId);
    const subject = await this.subjectsService.findById(subjectIdentifier);

    return this.instrumentRecordsRepository.create({
      assignmentId,
      data,
      date,
      group,
      instrument,
      subject
    });
  }

  async exists(filter: FilterQuery<InstrumentRecordEntity>) {
    return this.instrumentRecordsRepository.exists(filter);
  }

  async exportRecords(
    { groupId }: { groupId?: string } = {},
    { ability }: EntityOperationOptions = {}
  ): Promise<InstrumentRecordsExport> {
    const group = groupId ? await this.groupsService.findById(groupId, { ability }) : undefined;
    const subjects = group
      ? await this.subjectsService.findByGroup(group.name, { ability })
      : await this.subjectsService.findAll({ ability });
    const data: InstrumentRecordsExport = [];
    for (const subject of subjects) {
      const records = await this.instrumentRecordsRepository.find(
        {
          group,
          subject
        },
        {
          populate: 'instrument'
        }
      );
      for (const record of records) {
        if (record.instrument.kind !== 'form') {
          continue;
        }
        const formData = record.data as FormDataType;
        for (const measure of Object.keys(formData)) {
          data.push({
            instrumentName: record.instrument.name,
            instrumentVersion: record.instrument.version,
            measure: measure,
            subjectAge: yearsPassed(subject.dateOfBirth),
            subjectId: subject.identifier,
            subjectSex: subject.sex,
            timestamp: record.date.toISOString(),
            value: formData[measure] as unknown
          });
        }
      }
    }
    return data;
  }

  async find(
    {
      groupId,
      instrumentId,
      minDate,
      subjectIdentifier
    }: { groupId?: string; instrumentId?: string; minDate?: Date; subjectIdentifier?: string },
    { ability }: EntityOperationOptions = {}
  ) {
    const group = groupId ? await this.groupsService.findById(groupId) : undefined;
    const instrument = instrumentId ? await this.instrumentsService.findById(instrumentId) : undefined;
    const subject = subjectIdentifier ? await this.subjectsService.findById(subjectIdentifier) : undefined;

    const records = await this.instrumentRecordsRepository.find(
      {
        $and: [
          ability ? accessibleBy(ability).InstrumentRecord : {},
          {
            date: minDate ? { $gte: minDate } : undefined,
            group,
            instrument,
            subject
          }
        ]
      },
      {
        populate: {
          path: 'instrument',
          select: ['bundle', 'kind', 'measures']
        }
      }
    );

    return records.map((doc) => {
      const obj = doc.toObject({
        depopulate: true,
        transform: (_, ret) => {
          delete ret._id;
          delete ret.__v;
        },
        virtuals: true
      });
      if (doc.instrument.kind === 'form' && doc.instrument.measures) {
        obj.computedMeasures = this.computeMeasure(
          doc.instrument.measures as FormInstrumentMeasures,
          doc.data as FormDataType
        );
      }
      return obj;
    });
  }

  async linearModel(
    { groupId, instrumentId }: { groupId?: string; instrumentId: string },
    { ability }: EntityOperationOptions = {}
  ) {
    const group = groupId ? await this.groupsService.findById(groupId) : undefined;
    const instrument = (await this.instrumentsService.findById(instrumentId)) as unknown as FormInstrument;
    if (!instrument.measures) {
      throw new Error('Instrument must contain measures');
    }
    const records = await this.instrumentRecordsRepository.find(
      {
        $and: [ability ? accessibleBy(ability).InstrumentRecord : {}, { group, instrument }]
      },
      {
        populate: 'instrument'
      }
    );

    const data: Record<string, [number, number][]> = {};
    for (const record of records) {
      const computedMeasures = this.computeMeasure(instrument.measures, record.data as FormDataType);
      for (const measure in computedMeasures) {
        const x = record.date.getTime();
        const y = computedMeasures[measure]!;
        if (Array.isArray(data[measure])) {
          data[measure]!.push([x, y]);
        } else {
          data[measure] = [[x, y]];
        }
      }
    }

    const results: LinearRegressionResults = {};
    for (const measure in data) {
      results[measure] = linearRegression(data[measure]!);
    }
    return results;
  }

  private computeMeasure(measures: FormInstrumentMeasures, data: FormDataType) {
    const computedMeasures: Record<string, number> = {};
    for (const key in measures) {
      computedMeasures[key] = measures[key]!.value(data);
    }
    return computedMeasures;
  }
}
