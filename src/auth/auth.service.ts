import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginRequestDto } from './dto/login.req.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async signIn(body: LoginRequestDto): Promise<{ access_token: string }> {
    const user = await this.userRepository.findOne({
      where: {
        email: body.email,
      },
    });

    if (user.password !== body.password) {
      throw new UnauthorizedException('비밀번호 틀림');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const { password, ...result } = user;

    const payload = { sub: user.id, name: user.name };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
