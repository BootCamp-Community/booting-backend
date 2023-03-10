import { CustomRepository } from '../../configs/typeorm-ex.decorator';
import { NotificationEntity } from './notifications.entity';
import { Repository } from 'typeorm';

@CustomRepository(NotificationEntity)
export class NotificationRepository extends Repository<NotificationEntity> {}
