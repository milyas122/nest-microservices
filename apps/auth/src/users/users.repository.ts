import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './models/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersRepository {
  protected readonly logger = new Logger('User');

  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return this.userModel.create({ ...createUserDto });
  }
}
