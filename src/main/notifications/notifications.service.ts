import { Injectable } from '@nestjs/common';
import { NotificationRepository } from './notifications.repository';

@Injectable()
export class NotificationsService {
  constructor(private notificationRepository: NotificationRepository) {}

  async getAllNotifications(user) {
    const notifications = await this.notificationRepository.find({
      where: { receiverId: user.id },
      order: { createdAt: 'DESC' },
    });

    await this.notificationRepository.update({ receiverId: user.id, isRead: false }, { isRead: true });

    // TODO : pagination 적용해서 10개씩 가져오기

    return {
      count: notifications.length,
      notifications,
    };
  }
}
