import { PartialType } from '@nestjs/swagger';

import { CreateUserData, CreateUserDto, isStrongPassword } from './create-user.dto';

import { ValidationSchema } from '@/core/validation-schema.decorator';

@ValidationSchema<Partial<CreateUserData>>({
  type: 'object',
  properties: {
    username: {
      type: 'string',
      nullable: true
    },
    password: {
      type: 'string',
      pattern: isStrongPassword.source,
      nullable: true
    },
    role: {
      type: 'string',
      enum: ['system-admin', 'group-manager', 'standard-user'],
      nullable: true
    }
  }
})
export class UpdateUserDto extends PartialType(CreateUserDto) implements Partial<CreateUserData> {}
