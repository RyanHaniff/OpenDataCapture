import { EntitySchema } from '@douglasneuroinformatics/nestjs/core';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import type { Sex, Subject } from '@open-data-capture/common/subject';
import { type HydratedDocument, Schema as MongooseSchema } from 'mongoose';

import { GroupEntity } from '@/groups/entities/group.entity';

@EntitySchema<Subject>()
export class SubjectEntity {
  static readonly modelName = 'Subject';

  @Prop({ required: true })
  dateOfBirth: Date;

  @Prop({ required: false })
  firstName?: string;

  @Prop({ default: [], required: false, type: [{ ref: GroupEntity.modelName, type: MongooseSchema.Types.ObjectId }] })
  groups: GroupEntity[];

  @Prop({ required: true })
  identifier: string;

  @Prop({ required: false })
  lastName?: string;

  @Prop({ enum: ['male', 'female'] satisfies Sex[], required: true, type: String })
  sex: Sex;
}

export type SubjectDocument = HydratedDocument<SubjectEntity>;

export const SubjectSchema = SchemaFactory.createForClass(SubjectEntity);
