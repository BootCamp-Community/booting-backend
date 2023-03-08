import { Test } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { PostRepository } from './posts.repository';
import { Repository } from 'typeorm';
import { PostEntity } from './posts.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
describe('PostsService', () => {
  let service: PostsService;
  let repository: Repository<PostEntity>;

  // 테스트보다 이전에 시작되는 로직
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: getRepositoryToken(PostRepository),
          useClass: Repository<PostEntity>,
        },
      ],
    }).compile();

    service = moduleRef.get<PostsService>(PostsService);
    repository = moduleRef.get<Repository<PostEntity>>(getRepositoryToken(PostRepository));
  });

  it('게시글 ID에 해당하는 게시글의 정보를 가져와야 한다.', () => {
    expect(2 + 2).toBe(4);
  });
});
