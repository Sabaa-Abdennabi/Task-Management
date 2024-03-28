import { ConflictException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthDto } from './DTO/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async signUp(authcred: AuthDto): Promise<void> {
    return this.userRepository.signUp(authcred);
  }


  

  async signIn(auth: AuthDto):Promise<string> {
    
    const result = await this.userRepository.validateUserPassword(auth);
    if(result){
        return 'User authenticated';
    }else{
        throw new ConflictException('Invalid credentials');
    }
  }
}
