import { Test, TestingModule } from '@nestjs/testing';
import { BlockUsersService } from './block-users.service';

describe('BlockUsersService', () => {
  let service: BlockUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlockUsersService],
    }).compile();

    service = module.get<BlockUsersService>(BlockUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
