import { Body, Controller, Injectable, Post, ValidationPipe } from '@nestjs/common';
import { AuthDto } from './DTO/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService : AuthService){}

    @Post('/signup')
    signUp(@Body(ValidationPipe) authDto : AuthDto){
    return this.authService.signUp(authDto);    
    }
}
