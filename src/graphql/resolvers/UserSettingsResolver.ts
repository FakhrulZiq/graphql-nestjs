import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserSetting } from '../models/UserSettings';
import { CreateUserSettingsInput } from '../dto/create-user-settings.input';
import { UserSettingService } from 'src/Modules/users/UserSettingService';

@Resolver()
export class UserSettingsResolver {
  constructor(private userSettingService: UserSettingService) {}

  @Mutation((returns) => UserSetting)
  async createUserSettings(
    @Args('createUserSettingsData')
    createUserSettingsData: CreateUserSettingsInput,
  ) {
    const userSetting = await this.userSettingService.createUserSetting(
      createUserSettingsData,
    );
    return userSetting;
  }
}
