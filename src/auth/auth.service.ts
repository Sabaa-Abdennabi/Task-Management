import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthDto } from './DTO/auth.dto';

@Injectable()
export class AuthService {
    
    constructor(
        @InjectRepository(UserRepository)
        private userRepository : UserRepository,
    ){}

    async signUp(authcred : AuthDto): Promise<void>{
        return this.userRepository.signUp(authcred);
    }
 

}
