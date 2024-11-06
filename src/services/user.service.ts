import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/user.repository';
import { IUserRepository, UserRegisterDto, UserResponseDto, UserResponseTokenDto } from '../interfaces/user.interface';

export class UserService {
  private userRepository: IUserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  async register(email: string, password: string): Promise<UserResponseDto> {

    const userDb = await this.userRepository.findByEmail(email);
    if (userDb?.email === email) throw new Error("Email já cadastrado.");

    const hashedPassword = await bcrypt.hash(password, 10);
    const userRegisteDtoMap: UserRegisterDto = { email: email, password: hashedPassword, };
    const userCreate = await this.userRepository.create(userRegisteDtoMap);

    const responseMap: UserResponseDto = { email: userCreate.email };
    return responseMap;
  };


  async login(email: string, password: string): Promise<UserResponseTokenDto> {

    const userDb = await this.userRepository.findByEmail(email);
    const isSamePassword = userDb && await bcrypt.compare(password, userDb.password);

    if (!userDb?.email || !isSamePassword) throw Error('Email ou Senha incorretos!');

    const token = jwt.sign(
      { userId: userDb.id, useEmail: userDb.email },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    const responseMap: UserResponseTokenDto = { token: token }
    return responseMap;
  };

};
