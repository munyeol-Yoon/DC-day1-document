import { PickType } from '@nestjs/mapped-types';
import { UserEntity } from 'src/user/entity/user.entity';

export class LoginRequestDto extends PickType(UserEntity, [
  'email',
  'password',
]) {}
