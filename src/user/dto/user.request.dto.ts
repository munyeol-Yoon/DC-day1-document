import { PickType } from '@nestjs/mapped-types';
import { UserEntity } from '../entity/user.entity';

export class UserRequestDto extends PickType(UserEntity, [
  'name',
  'email',
  'password',
]) {}
