/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User } from '../../dataAccess/models/User';
import { mockUsers } from '../../mocks/mockUsers';
import { UserSetting } from '../../dataAccess/models/UserSettings';
import { mockUserSettings } from '../../mocks/mockUserSetting';
import { CreateUserInput } from 'src/dataAccess/dto/create-user.input';
import { Inject } from '@nestjs/common';
import { UserService } from './UserService';
import { UserSettingService } from './UserSettingService';

@Resolver((of) => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private userSettingService: UserSettingService,
  ) {}
  // @Query((returns) => User, { nullable: true })
  // getUserById(@Args('id', { type: () => Int }) id: number) {
  //   return mockUsers.find((user) => user.id === id);
  // }
  @Query((returns) => User, { nullable: true })
  async getUserById(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<User> {
    const user = await this.userService.getUserById(id);
    // if (!user) {
    //   throw new NotFoundException(`User with ID ${id} not found`); // Throw NotFoundException if user is not found
    // }
    return user || null;
  }

  @Query(() => [User])
  getUsers() {
    return this.userService.getUsers();
  }

  @ResolveField((returns) => UserSetting, { name: 'settings', nullable: true })
  getUserSettings(@Parent() user: User) {
    return this.userSettingService.getUserSettingById(user.id);
  }

  @Mutation((returns) => User)
  createUser(@Args('createUserData') createUserData: CreateUserInput) {
    return this.userService.createUser(createUserData);
  }
}
