import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSetting } from '../../graphql/models/UserSettings';
import { CreateUserSettingsInput } from 'src/graphql/dto/create-user-settings.input';
import { User } from 'src/graphql/models/User';
import { find } from 'rxjs';

@Injectable()
export class UserSettingService {
  constructor(
    @InjectRepository(UserSetting)
    private userSetingRepository: Repository<UserSetting>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  getUserSettingById(userId: number) {
    return this.userSetingRepository.findOneBy({ userId });
  }

  async createUserSetting(createUserSettingData: CreateUserSettingsInput) {
    const user = await this.userRepository.findOneBy({
      id: createUserSettingData.userId,
    });

    if (!user) throw new Error('User Not Found');

    const newUserSetting = this.userSetingRepository.create(
      createUserSettingData,
    );
    const savedSettings = await this.userSetingRepository.save(newUserSetting);

    user.settings = savedSettings;
    await this.userRepository.save(user);

    return user;
  }
}
