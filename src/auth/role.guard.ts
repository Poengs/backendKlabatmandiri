import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role, ROLES_KEY } from './role.meta';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest();
    if (!user?.role) return false;
    
    // Logika hierarki Anda
    return requiredRoles.some((role) => this.matchRoles(role, user.role));
  }

  private matchRoles(requiredRole: Role, userRole: string): boolean {
    const normalizedUserRole = String(userRole).toLowerCase();
    const normalizedRequiredRole = String(requiredRole).toLowerCase() as Role;

    // Admin dapat mengakses semua endpoint yang memakai RolesGuard.
    if (normalizedUserRole === Role.ADMIN) return true;
    if (normalizedRequiredRole === normalizedUserRole) return true;
    
    // Hierarki Pengurus
    if (normalizedRequiredRole === Role.PENGURUS) {
      return normalizedUserRole === Role.KETUA || normalizedUserRole === Role.BENDAHARA;
    }
    
    return false;
  }
}