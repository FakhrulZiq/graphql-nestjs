import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../models/User';
import { UserSetting } from '../models/UserSettings';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.getOrThrow('MYSQL_HOST'),
        port: config.getOrThrow('MYSQL_PORT'),
        database: config.getOrThrow('MYSQL_NAME'),
        username: config.getOrThrow('MYSQL_USERNAME'),
        password: config.getOrThrow('MYSQL_PASSWORD'),
        entities: [User, UserSetting],
        autoLoadEntities: false,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
 