import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { AccessibleModel } from '@casl/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from './schemas/user.schema';

import { EntityRepository } from '@/core/entity.repository';

@Injectable()
export class UsersRepository extends EntityRepository<User> {
  constructor(@InjectModel(User.name) userModel: Model<UserDocument, AccessibleModel<UserDocument>>) {
    super(userModel);
  }
}
