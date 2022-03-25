import {
  mockAuthorArrayModel,
  mockAuthorModel,
  mockCreateAuthor,
  mockUpdateAuthorParams,
  mockUpdatedAuthorModel
} from '@/common/tests/authorMocks'
import { InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { getModelToken } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'
import { AuthorsService } from './authors.service'
import { Author } from './schemas/authors.schema'

describe('AuthorsService', () => {
  let service: AuthorsService
  const authorModel = new Author()

  const mockRepository = {
    find: jest.fn().mockReturnValue(mockAuthorArrayModel),
    findOne: jest.fn().mockReturnValue(mockAuthorModel),
    create: jest.fn().mockReturnValue(mockAuthorModel),
    save: jest.fn().mockReturnValue(mockAuthorModel),
    update: jest.fn().mockReturnValue(mockUpdatedAuthorModel),
    delete: jest.fn().mockReturnValue({ affected: 1 })
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorsService,
        {
          provide: getModelToken(Author.name),
          useValue: authorModel
        }
      ]
    }).compile()

    service = module.get<AuthorsService>(AuthorsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('When create a new Author', () => {
    it('Should create a new author', async () => {
      const author = service.create(mockCreateAuthor)

      expect(mockRepository.create).toBeCalledWith(mockCreateAuthor)
      expect(mockRepository.save).toBeCalledTimes(1)
      expect(author).resolves.toBe(mockAuthorModel)
    })
  })

  describe('When search all Authors', () => {
    it('Should list all authors', async () => {
      const authors = service.findAll()

      expect(authors).resolves.toBe(mockAuthorArrayModel)
      expect(mockRepository.find).toHaveBeenCalledTimes(1)
    })
  })

  describe('When search an Author by id', () => {
    it('Should find a existing author', async () => {
      const authorFound = service.findOne('1')

      expect(mockRepository.findOne).toHaveBeenCalledWith(mockAuthorModel._id)
      expect(authorFound).resolves.toBe(mockAuthorModel)
    })
    it('Should return a exception when does not to find a author', async () => {
      mockRepository.findOne.mockReturnValue(null)

      const author = service.findOne('3')

      expect(author).rejects.toThrow(NotFoundException)
      expect(mockRepository.findOne).toHaveBeenCalledWith('3')
    })
  })

  describe('When update Author', () => {
    it('Should update an author', async () => {
      service.findOne = jest.fn().mockReturnValueOnce(mockAuthorModel)

      const authorUpdated = service.update(
        mockUpdateAuthorParams.id,
        mockUpdateAuthorParams
      )

      expect(service.findOne).toHaveBeenCalledWith(mockUpdateAuthorParams.id)
      expect(authorUpdated).resolves.toBe(mockUpdatedAuthorModel)
    })

    describe('When delete Author', () => {
      it('Should delete an existing author', async () => {
        service.findOne = jest.fn().mockReturnValueOnce(mockAuthorModel)

        await service.remove('1')

        expect(service.findOne).toHaveBeenCalledWith('1')
        expect(mockRepository.delete).toBeCalledWith(mockAuthorModel)
      })

      it("Should return an internal server error if database doesn't delete the author", async () => {
        service.findOne = jest.fn().mockReturnValueOnce(mockAuthorModel)
        mockRepository.delete.mockReturnValueOnce(null)

        const deletedAuthor = service.remove('1')

        expect(service.findOne).toHaveBeenCalledWith('1')
        expect(mockRepository.delete).toBeCalledWith(mockAuthorModel)
        expect(deletedAuthor).rejects.toThrow(InternalServerErrorException)
      })
    })
  })
})
