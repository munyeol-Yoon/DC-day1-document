import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRequestDto } from './dto/user.request.dto';

@Controller('api')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  async createUser(@Body() body: UserRequestDto) {
    return this.userService.createUser(body);
  }
}
