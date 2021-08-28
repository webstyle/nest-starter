import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    constructor(@InjectPinoLogger(LoggerMiddleware.name) private readonly logger: PinoLogger) {}

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, path: url } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('finish', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');

      this.logger.info(
        `${method} ${url} ${statusCode} ${contentLength} - ${userAgent} ${ip}`
      );
    });

    next();
  }
}