import { Module } from '@nestjs/common';
import { BlockUserEntity } from './block-users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { BlockUsersService } from './block-users.service';
import { BlockUsersController } from './block-users.controller';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmExModule } from '../../configs/typeorm-ex.module';
import { BlockUserRepository } from './block-users.repository';
import { UserRepository } from '../users/users.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([BlockUserEntity]),
    TypeOrmExModule.forCustomRepository([BlockUserRepository, UserRepository]),
    AuthModule,
  ],
  providers: [ConfigService, BlockUsersService],
  controllers: [BlockUsersController],
})
export class BlockUsersModule {}
