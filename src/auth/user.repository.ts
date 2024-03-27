import { Repository, EntityRepository, DataSource } from 'typeorm';
import { User } from './user.entity';
import { AuthDto } from './DTO/auth.dto';
import * as bcrypt from 'bcrypt';

import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    const user = new User();
    user.username = username;    
    user.salt = await bcrypt.genSalt();;
    user.password = await this.hashPassword(password,user.salt);
    try {
      await user.save();
    } catch (error) {
      if (error.code == '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
  private async hashPassword(password: string, salt: string):Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
