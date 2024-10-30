import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSetting } from '../../dataAccess/models/UserSettings';
import { CreateUserSettingsInput } from 'src/dataAccess/dto/create-user-settings.input';
import { User } from 'src/dataAccess/models/User';
import { applicationError } from 'src/utilities/exceptionInstance';

@Injectable()
export class UserSettingService {
  constructor(
    @InjectRepository(UserSetting)
    private userSetingRepository: Repository<UserSetting>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  getUserSettingById(userId: number) {
    try {
      return this.userSetingRepository.findOneBy({ userId });
    } catch (error) {
      throw applicationError(error);
    }
  }

  async createUserSetting(
    createUserSettingData: CreateUserSettingsInput,
  ): Promise<UserSetting> {
    try {
      const user = await this.userRepository.findOneBy({
        id: createUserSettingData.userId,
      });

      if (!user) throw new Error('User Not Found');

      const newUserSetting = this.userSetingRepository.create(
        createUserSettingData,
      );
      const savedSettings =
        await this.userSetingRepository.save(newUserSetting);

      user.settings = savedSettings;
      await this.userRepository.save(user);

      return savedSettings;
    } catch (error) {
      throw applicationError(error);
    }
  }
}
