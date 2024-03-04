import { PickType } from '@nestjs/mapped-types';
import { UserEntity } from '../entity/user.entity';

export class UserResponseDto extends PickType(UserEntity, [
  'id',
  'name',
  'email',
]) {}
