import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginRequestDto } from './dto/login.req.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async signIn(body: LoginRequestDto): Promise<any> {
    const user = await this.userRepository.findOne({
      where: {
        email: body.email,
      },
    });

    if (user.password !== body.password) {
      throw new UnauthorizedException('비밀번호 틀림');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;

    // TODO JWT 생성하고 반환

    return result;
  }
}
