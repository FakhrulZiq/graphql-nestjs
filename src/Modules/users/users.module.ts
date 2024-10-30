import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/dataAccess/models/User';
import { UserSetting } from 'src/dataAccess/models/UserSettings';
import { UserSettingsResolver } from 'src/dataAccess/resolvers/UserSettingsResolver';
import { UserResolver } from './UserResolver';
import { UserService } from './UserService';
import { UserSettingService } from './UserSettingService';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserSetting])],
  providers: [
    UserResolver,
    UserService,
    UserSettingService,
    UserSettingsResolver,
  ],
})
export class UserModule {}
