import { Inject, Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { Model } from 'mongoose';
import { User } from './entities/user.entity';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_MODEL')
    private usersModel: Model<User>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const hashPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser: User = {
      name: createUserDto.name,
      email: createUserDto.email,
      username: createUserDto.username,
      password: hashPassword,
      role: createUserDto.role,
    };

    const createdUser = new this.usersModel(newUser);
    return await createdUser.save();
  }

  async findAll() {
    return await this.usersModel.find().exec();
  }

  async findOne(id: string) {
    return await this.usersModel.findById(id).exec();
  }

  async findOneByUsername(username: string) {
    return await this.usersModel.findOne({
      username: username
    }).exec();
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser: Partial<User> = {
      name: updateUserDto.name,
    };

    return this.usersModel.findByIdAndUpdate(id, updatedUser, { new: true }).exec();
  }

  remove(id: string) {
    return this.usersModel.findByIdAndDelete(id).exec();
  }
}
