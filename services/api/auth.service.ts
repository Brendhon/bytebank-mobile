import { apolloClient } from './client';
import {
  LOGIN,
  REGISTER,
  GET_ME,
  UPDATE_USER,
  DELETE_USER,
  VALIDATE_PASSWORD,
} from '../graphql/auth.queries';
import {
  LoginVariables,
  RegisterVariables,
  UpdateUserVariables,
  ValidatePasswordVariables,
  LoginResponse,
  RegisterResponse,
  GetMeResponse,
  UpdateUserResponse,
  DeleteUserResponse,
  ValidatePasswordResponse,
  User,
  AuthPayload,
} from './types';

/**
 * Authentication service for user-related operations
 */
export class AuthService {
  /**
   * Login user with email and password
   */
  static async login(email: string, password: string): Promise<AuthPayload> {
    try {
      const { data } = await apolloClient.mutate<LoginResponse, LoginVariables>({
        mutation: LOGIN,
        variables: {
          input: { email, password },
        },
      });

      if (!data?.login) {
        throw new Error('Login failed. Please check your credentials.');
      }

      return data.login;
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Failed to login. Please try again.');
    }
  }

  /**
   * Register a new user
   */
  static async register(
    name: string,
    email: string,
    password: string,
    acceptPrivacy: boolean
  ): Promise<AuthPayload> {
    try {
      const { data } = await apolloClient.mutate<RegisterResponse, RegisterVariables>({
        mutation: REGISTER,
        variables: {
          input: { name, email, password, acceptPrivacy },
        },
      });

      if (!data?.register) {
        throw new Error('Registration failed. Please try again.');
      }

      return data.register;
    } catch (error) {
      console.error('Registration error:', error);
      throw new Error('Failed to register. Please try again.');
    }
  }

  /**
   * Get current authenticated user
   */
  static async getMe(): Promise<User | null> {
    try {
      const { data } = await apolloClient.query<GetMeResponse>({
        query: GET_ME,
      });

      return data.me;
    } catch (error) {
      console.error('Get me error:', error);
      throw new Error('Failed to get user information.');
    }
  }

  /**
   * Update current user information
   */
  static async updateUser(updates: UpdateUserVariables['input']): Promise<User> {
    try {
      const { data } = await apolloClient.mutate<UpdateUserResponse, UpdateUserVariables>({
        mutation: UPDATE_USER,
        variables: {
          input: updates,
        },
      });

      if (!data?.updateUser) {
        throw new Error('Failed to update user information.');
      }

      return data.updateUser;
    } catch (error) {
      console.error('Update user error:', error);
      throw new Error('Failed to update user information.');
    }
  }

  /**
   * Delete current user account
   */
  static async deleteUser(): Promise<boolean> {
    try {
      const { data } = await apolloClient.mutate<DeleteUserResponse>({
        mutation: DELETE_USER,
      });

      return data?.deleteUser ?? false;
    } catch (error) {
      console.error('Delete user error:', error);
      throw new Error('Failed to delete user account.');
    }
  }

  /**
   * Validate user password
   */
  static async validatePassword(password: string): Promise<boolean> {
    try {
      const { data } = await apolloClient.mutate<
        ValidatePasswordResponse,
        ValidatePasswordVariables
      >({
        mutation: VALIDATE_PASSWORD,
        variables: { password },
      });

      return data?.validatePassword ?? false;
    } catch (error) {
      console.error('Validate password error:', error);
      throw new Error('Failed to validate password.');
    }
  }
}
