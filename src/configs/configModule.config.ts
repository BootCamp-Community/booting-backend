import { ConfigModuleOptions } from '@nestjs/config';

export const configModuleConfig: ConfigModuleOptions = {
  isGlobal: true,
  envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.dev',
  ignoreEnvFile: process.env.NODE_ENV === 'prod', // prod는 별도 서비스에서 주입해주자
};
