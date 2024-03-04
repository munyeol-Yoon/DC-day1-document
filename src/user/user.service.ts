import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { UserRequestDto } from './dto/user.request.dto';
import { UserResponseDto } from './dto/user.response.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(body: UserRequestDto): Promise<UserResponseDto> {
    const user = await this.userRepository.create({
      ...body,
    });

    const saveUser = await this.userRepository.save(user);

    const result: UserResponseDto = {
      id: saveUser.id,
      name: saveUser.name,
      email: saveUser.email,
    };

    return result;
  }
}
