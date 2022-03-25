import { getModelToken } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'
import { User } from './schemas/user.schema'
import { UsersService } from './users.service'

import {
  mockRegisterUser,
  mockUpdateUserParams,
  mockUpdatedUserModel,
  mockUserModel,
  mockUserArrayModel
} from './../common/tests/userMocks'
import { InternalServerErrorException, NotFoundException } from '@nestjs/common'

describe('UsersService', () => {
  let service: UsersService
  const userModel = new User()

  const mockRepository = {
    find: jest.fn().mockReturnValue(mockUserArrayModel),
    findOne: jest.fn().mockReturnValue(mockUserModel),
    create: jest.fn().mockReturnValue(mockUserModel),
    save: jest.fn().mockReturnValue(mockUserModel),
    update: jest.fn().mockReturnValue(mockUpdatedUserModel),
    delete: jest.fn().mockReturnValue({ affected: 1 })
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: userModel
        }
      ]
    }).compile()

    service = module.get<UsersService>(UsersService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('When create a new user', () => {
    it('Should create a new user', async () => {
      const user = service.create(mockRegisterUser)

      expect(mockRepository.create).toBeCalledWith(mockRegisterUser)
      expect(mockRepository.save).toBeCalledTimes(1)
      expect(user).resolves.toBe(mockUserModel)
    })
  })

  describe('When search all Users', () => {
    it('Should list all users', async () => {
      const users = service.findAll()

      expect(users).resolves.toBe(mockUserArrayModel)
      expect(mockRepository.find).toHaveBeenCalledTimes(1)
    })
  })

  describe('When search an User by id', () => {
    it('Should find a existing user', async () => {
      const userFound = service.findOne('1')

      expect(mockRepository.findOne).toHaveBeenCalledWith(mockUserModel._id)
      expect(userFound).resolves.toBe(mockUserModel)
    })
    it('Should return a exception when does not to find a user', async () => {
      mockRepository.findOne.mockReturnValue(null)

      const user = service.findOne('3')

      expect(user).rejects.toThrow(NotFoundException)
      expect(mockRepository.findOne).toHaveBeenCalledWith('3')
    })
  })

  describe('When update User', () => {
    it('Should update an user', async () => {
      service.findOne = jest.fn().mockReturnValueOnce(mockUserModel)

      const userUpdated = service.update(
        mockUpdateUserParams.id,
        mockUpdateUserParams
      )

      expect(service.findOne).toHaveBeenCalledWith(mockUpdateUserParams.id)
      expect(userUpdated).resolves.toBe(mockUpdatedUserModel)
    })

    describe('When delete User', () => {
      it('Should delete an existing user', async () => {
        service.findOne = jest.fn().mockReturnValueOnce(mockUserModel)

        await service.remove('1')

        expect(service.findOne).toHaveBeenCalledWith('1')
        expect(mockRepository.delete).toBeCalledWith(mockUserModel)
      })

      it("Should return an internal server error if database doesn't delete the user", async () => {
        service.findOne = jest.fn().mockReturnValueOnce(mockUserModel)
        mockRepository.delete.mockReturnValueOnce(null)

        const deletedUser = service.remove('1')

        expect(service.findOne).toHaveBeenCalledWith('1')
        expect(mockRepository.delete).toBeCalledWith(mockUserModel)
        expect(deletedUser).rejects.toThrow(InternalServerErrorException)
      })
    })
  })
})
