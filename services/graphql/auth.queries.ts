import { gql } from '@apollo/client';
import { AUTH_PAYLOAD_FIELDS, USER_FIELDS } from './fragments';

// Login mutation
export const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      ...AuthPayloadFields
    }
  }
  ${AUTH_PAYLOAD_FIELDS}
`;

// Register mutation
export const REGISTER = gql`
  mutation Register($input: UserInput!) {
    register(input: $input) {
      ...AuthPayloadFields
    }
  }
  ${AUTH_PAYLOAD_FIELDS}
`;

// Get current user query
export const GET_ME = gql`
  query Me {
    me {
      ...UserFields
    }
  }
  ${USER_FIELDS}
`;

// Update user mutation
export const UPDATE_USER = gql`
  mutation UpdateUser($input: UserUpdateInput!) {
    updateUser(input: $input) {
      ...UserFields
    }
  }
  ${USER_FIELDS}
`;

// Delete user mutation
export const DELETE_USER = gql`
  mutation DeleteUser {
    deleteUser
  }
`;

// Validate password mutation
export const VALIDATE_PASSWORD = gql`
  mutation ValidatePassword($password: String!) {
    validatePassword(password: $password)
  }
`;
