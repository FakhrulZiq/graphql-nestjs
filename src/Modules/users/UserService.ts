import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../dataAccess/models/User';
import { Repository } from 'typeorm';
import { CreateUserInput } from 'src/dataAccess/dto/create-user.input';
import { applicationError } from 'src/utilities/exceptionInstance';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getUsers() {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw applicationError(`Failed to get users: ${error.message}`);
    }
  }

  async getUserById(id: number) {
    try {
      const user = await this.userRepository.findOneBy({ id });
      if (!user) throw new Error('User not found');
      return user;
    } catch (error) {
      throw applicationError(
        `Failed to get user by ID ${id}: ${error.message}`,
      );
    }
  }

  async createUser(createUserData: CreateUserInput) {
    try {
      const users = new User();
      users.displayName = createUserData.displayName;
      users.username = createUserData.username;
      users.settings.userId = createUserData.settingUserId;
      return await this.userRepository.save(users);
    } catch (error) {
      throw applicationError(`Failed to create user: ${error.message}`);
    }
  }
}
