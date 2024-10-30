//why it throw error Cannot find module 'src/_mocks_/mockUsers' from 'graphql/resolvers/UserResolver.spec.ts'
import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from '../../Modules/users/UserResolver';
import { mockUsers } from '../../mocks/mockUsers';
import { mockUserSettings } from '../../mocks/mockUserSetting';

describe('UserResolver', () => {
  let resolver: UserResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserResolver],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('getUserById', () => {
    it('should return a user by id', () => {
      const userId = 1;
      const user = resolver.getUserById(userId);
      expect(user).toEqual(mockUsers.find((user) => user.id === userId));
    });

    it('should return null if user not found', () => {
      const userId = 999;
      const user = resolver.getUserById(userId);
      expect(user).toThrowError;
    });
  });

  describe('getUsers', () => {
    it('should return all users', () => {
      const users = resolver.getUsers();
      expect(users).toEqual(mockUsers);
    });
  });

  describe('getUserSettings', () => {
    it('should return user settings by user id', () => {
      const userId = 1;
      const userSettings = mockUserSettings.find(
        (setting) => setting.userId === userId,
      );
      expect(
        resolver.getUserSettings({
          id: userId,
          username: 'fakhrul',
        }),
      ).toEqual(userSettings);
    });
  });
});
