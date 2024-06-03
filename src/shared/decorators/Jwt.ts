import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Jwt = createParamDecorator((_, context: ExecutionContext) => {
  return context.switchToHttp().getRequest()?._meta?.jwt || null;
});
