import { CreateUserInput } from 'src/users/dto/create-user.input'
import { UpdateUserInput } from 'src/users/dto/update-user.input'
import { User } from './../../users/schemas/user.schema'

export const mockRegisterUser: CreateUserInput = {
  firstName: 'First',
  lastName: 'Second',
  email: 'user@mail.com',
  password: 'Qwerty123!'
}

export const mockUpdateUserParams: UpdateUserInput = {
  id: '1',
  email: 'myNewEmaild@mail.com'
}

export const mockUserModel: User = {
  _id: '1',
  ...mockRegisterUser
}

export const mockUpdatedUserModel: User = {
  ...mockUserModel,
  email: 'updated-email@email.com'
}

export const mockUserArrayModel: User[] = [
  mockUserModel,
  {
    _id: '2',
    firstName: 'Second',
    lastName: 'User',
    email: 'user2@mail.com',
    password: 'Qwerty123!'
  },
  {
    _id: '3',
    firstName: 'Third',
    lastName: 'User',
    email: 'user3@mail.com',
    password: 'Qwerty123!'
  }
]
