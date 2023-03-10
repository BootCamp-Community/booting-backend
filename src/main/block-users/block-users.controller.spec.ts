import { Test, TestingModule } from '@nestjs/testing';
import { BlockUsersController } from './block-users.controller';

describe('UserBlocksController', () => {
  let controller: BlockUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlockUsersController],
    }).compile();

    controller = module.get<BlockUsersController>(BlockUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
