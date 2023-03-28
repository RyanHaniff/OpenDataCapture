import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { type BaseInstrument, type Group, InstrumentKind, type InstrumentRecord, type Subject } from '@ddcp/common';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

import { InstrumentEntity } from './instrument.entity';

import { GroupEntity } from '@/groups/entities/group.entity';
import { SubjectEntity } from '@/subjects/entities/subject.entity';

@Schema({ strict: 'throw' })
export class InstrumentRecordEntity implements InstrumentRecord<BaseInstrument> {
  static readonly modelName = 'InstrumentRecord';

  @Prop({ enum: InstrumentKind, required: true, type: String })
  kind: InstrumentKind;

  @Prop({ required: true, type: Date })
  dateCollected: Date;

  @Prop({ required: true, ref: InstrumentEntity.modelName, type: MongooseSchema.Types.ObjectId })
  instrument: BaseInstrument;

  @Prop({ required: true, ref: GroupEntity.modelName, type: MongooseSchema.Types.ObjectId })
  group: Group;

  @Prop({ required: true, ref: SubjectEntity.modelName, type: MongooseSchema.Types.ObjectId })
  subject: Subject;

  @Prop({ required: true, type: MongooseSchema.Types.Mixed })
  data: any;
}

export type InstrumentRecordDocument = HydratedDocument<InstrumentRecordEntity>;

export const InstrumentRecordSchema = SchemaFactory.createForClass(InstrumentRecordEntity);
