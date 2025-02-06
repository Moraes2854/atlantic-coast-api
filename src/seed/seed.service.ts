import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../auth/entities/user.entity';


import * as users from './data/users.json'


@Injectable()
export class SeedService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository:Repository<User>,

    ){
    }

    async execute(){
        try {
            await this.createUsers();
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException( error.message );
        }

    }

    async createUsers(){
        await this.userRepository.delete({});
        for (const userData of users) {
            const user = this.userRepository.create(userData);
            await this.userRepository.save( user );
        }
    }
}
