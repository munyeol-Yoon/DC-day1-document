import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRequestDto } from './dto/user.request.dto';
import { UserResponseDto } from './dto/user.response.dto';

@Controller('api')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  async createUser(@Body() body: UserRequestDto): Promise<UserResponseDto> {
    return this.userService.createUser(body);
  }
}
