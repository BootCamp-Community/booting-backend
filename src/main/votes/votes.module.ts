import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from '../../configs/typeorm-ex.module';
import { AuthModule } from '../auth/auth.module';
import { ConfigService } from '@nestjs/config';
import { VotesService } from './votes.service';
import { VoteEntity } from './votes.entity';
import { VoteRepository } from './votes.repository';
import { VotesController } from './votes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([VoteEntity]), TypeOrmExModule.forCustomRepository([VoteRepository]), AuthModule],
  providers: [ConfigService, VotesService],
  controllers: [VotesController],
})
export class VotesModule {}
