import {
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { RegisterUserInput } from './dto/register-user.input'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { User, UserDocument } from './schemas/user.schema'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(input: RegisterUserInput) {
    const { password: plainPassword } = input
    const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_ROUNDS))
    const password = await bcrypt.hash(plainPassword, salt)
    return this.userModel.create({ ...input, password })
  }

  async findAll() {
    return this.userModel.find().exec()
  }

  async findOne(id: string) {
    const user = this.userModel.findById(id).exec()

    if (!user) {
      throw new NotFoundException('User not found')
    }
    return user
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    const user = this.userModel.findByIdAndUpdate(id, updateUserInput).exec()

    if (!user) {
      throw new NotFoundException("User doesn't exist")
    }
    return user
  }

  async remove(id: string) {
    const userDeleted = this.userModel.findByIdAndRemove(id).exec()

    if (!userDeleted) {
      throw new InternalServerErrorException()
    }
    return userDeleted
  }

  async findByEmail(email: string) {
    const userByEmail = this.userModel.findOne({ email }).exec()

    if (!userByEmail) {
      throw new NotFoundException("User doesn't exist")
    }

    return userByEmail
  }
}
