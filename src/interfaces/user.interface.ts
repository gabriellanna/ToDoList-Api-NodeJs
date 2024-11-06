export interface User {
  id: number;
  email: string;
  password: string;
}

export interface UserCreate {
  email: string;
  password: string;
}

export interface UserRegisterDto {
  email: string;
  password: string;
}

export interface UserResponseDto {
  email: string;
}

export interface UserResponseTokenDto {
  token: string;
}

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  create(data: UserRegisterDto): Promise<User>;
}
