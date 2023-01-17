import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export class ConfigService {
  static getCorsConfigs(): CorsOptions {
    const corsOptions: CorsOptions = {
      origin: ['http://localhost:3000'],
      credentials: true,
    };

    return corsOptions;
  }
}
