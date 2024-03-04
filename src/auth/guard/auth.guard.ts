import { JwtService } from '@nestjs/jwt';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  // JwtService 의존성 주입
  constructor(private jwtService: JwtService) {}

  // catActivate 메서드는 모든 요청에 실행
  // true 를 반환하면 요청이 진행되고, false 면 요청이 거부됨
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest(); // 요청 객체 추출
    const token = this.extractTokenFromHeader(request); // 토큰 추출

    if (!token) {
      throw new UnauthorizedException('토큰 없음');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      }); // 토큰 유효성 검사

      // 유효한 토큰일시 요청객체에 payload 를 추가
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('토큰 문제');
    }
    return true;
  }

  // 요청 헤더에서 Bearer [token] 형식의 토큰 추출
  private extractTokenFromHeader(request: Request): string | undefined {
    // 헤더에서 authorization 을 읽어 공백을 기준으로 분리
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    // 토큰 타입이 Bearer 이면 토큰 값을 반환
    return type === 'Bearer' ? token : undefined;
  }
}
