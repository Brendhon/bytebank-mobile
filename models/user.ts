// User types
export interface User {
  _id: string;
  name: string;
  email: string;
  acceptPrivacy: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthPayload {
  token: string;
  user: User;
}

// Input types
export interface LoginInput {
  email: string;
  password: string;
}

export interface UserInput {
  name: string;
  email: string;
  password: string;
  acceptPrivacy: boolean;
}

export interface UserUpdateInput {
  name?: string;
  email?: string;
  password?: string;
  acceptPrivacy?: boolean;
}

// Query/Mutation variables
export interface LoginVariables {
  input: LoginInput;
}

export interface RegisterVariables {
  input: UserInput;
}

export interface UpdateUserVariables {
  input: UserUpdateInput;
}

export interface ValidatePasswordVariables {
  password: string;
}

// Response types
export interface LoginResponse {
  login: AuthPayload;
}

export interface RegisterResponse {
  register: AuthPayload;
}

export interface GetMeResponse {
  me: User | null;
}

export interface UpdateUserResponse {
  updateUser: User;
}

export interface DeleteUserResponse {
  deleteUser: boolean;
}

export interface ValidatePasswordResponse {
  validatePassword: boolean;
}
