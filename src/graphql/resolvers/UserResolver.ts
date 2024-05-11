//create a unit testing code from this resolver and name it userResolver.spec.ts
import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User } from '../models/User';
import { mockUsers } from '../../mocks/mockUsers';
import { UserSetting } from '../models/UserSettings';
import { mockUserSettings } from '../../mocks/mockUserSetting';
import { NotFoundException } from '@nestjs/common';

@Resolver((of) => User)
export class UserResolver {
  // @Query((returns) => User, { nullable: true })
  // getUserById(@Args('id', { type: () => Int }) id: number) {
  //   return mockUsers.find((user) => user.id === id);
  // }
  @Query((returns) => User, { nullable: true })
  getUserById(@Args('id', { type: () => Int }) id: number): User | null {
    const user = mockUsers.find((user) => user.id === id);
    // if (!user) {
    //   throw new NotFoundException(`User with ID ${id} not found`); // Throw NotFoundException if user is not found
    // }
    return user || null;
  }

  @Query(() => [User])
  getUsers() {
    return mockUsers;
  }

  @ResolveField((returns) => UserSetting, { name: 'settings', nullable: true })
  getUserSettings(@Parent() user: User) {
    return mockUserSettings.find((setting) => setting.userId === user.id);
  }
}
