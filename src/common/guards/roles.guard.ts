import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    if (!user || !requiredRoles.includes(user.role)) {
      const roleInfo = user
        ? `Role Anda: ${user.role}.`
        : 'Pengguna tidak terautentikasi.';
      const required = `Role yang dibutuhkan: ${requiredRoles.join(', ')}.`;
      throw new ForbiddenException(`Akses ditolak. ${roleInfo} ${required}`);
    }

    return true;
  }
}
