import { BooksModule } from '@/books/books.module'
import {
  mockBookArrayModel,
  mockBookModel,
  mockCreateBook,
  mockUpdateBookParams,
  mockUpdatedBookModel
} from '@/common/tests/bookMocks'
import { InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { getModelToken } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'
import { BooksService } from './books.service'
import { Book } from './schemas/books.schema'

describe('BooksService', () => {
  let service: BooksService
  const bookModel = new Book()

  const mockRepository = {
    find: jest.fn().mockReturnValue(mockBookArrayModel),
    findOne: jest.fn().mockReturnValue(mockBookModel),
    create: jest.fn().mockReturnValue(mockBookModel),
    save: jest.fn().mockReturnValue(mockBookModel),
    update: jest.fn().mockReturnValue(mockUpdatedBookModel),
    delete: jest.fn().mockReturnValue({ affected: 1 })
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [BooksModule],
      providers: [
        BooksService,
        {
          provide: getModelToken(Book.name),
          useValue: bookModel
        }
      ]
    }).compile()

    service = module.get<BooksService>(BooksService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
  describe('When create a new Book', () => {
    it('Should create a new book', async () => {
      const book = service.create(mockCreateBook)

      expect(mockRepository.create).toBeCalledWith(mockCreateBook)
      expect(mockRepository.save).toBeCalledTimes(1)
      expect(book).resolves.toBe(mockBookModel)
    })
  })

  describe('When search all Books', () => {
    it('Should list all books', async () => {
      const books = service.findAll()

      expect(books).resolves.toBe(mockBookArrayModel)
      expect(mockRepository.find).toHaveBeenCalledTimes(1)
    })
  })

  describe('When search an Book by id', () => {
    it('Should find a existing book', async () => {
      const bookFound = service.findOne('1')

      expect(mockRepository.findOne).toHaveBeenCalledWith(mockBookModel._id)
      expect(bookFound).resolves.toBe(mockBookModel)
    })
    it('Should return a exception when does not to find a book', async () => {
      mockRepository.findOne.mockReturnValue(null)

      const book = service.findOne('3')

      expect(book).rejects.toThrow(NotFoundException)
      expect(mockRepository.findOne).toHaveBeenCalledWith('3')
    })
  })

  describe('When update Book', () => {
    it('Should update an book', async () => {
      service.findOne = jest.fn().mockReturnValueOnce(mockBookModel)

      const bookUpdated = service.update(
        mockUpdateBookParams.id,
        mockUpdateBookParams
      )

      expect(service.findOne).toHaveBeenCalledWith(mockUpdateBookParams.id)
      expect(bookUpdated).resolves.toBe(mockUpdatedBookModel)
    })

    describe('When delete Book', () => {
      it('Should delete an existing book', async () => {
        service.findOne = jest.fn().mockReturnValueOnce(mockBookModel)

        await service.remove('1')

        expect(service.findOne).toHaveBeenCalledWith('1')
        expect(mockRepository.delete).toBeCalledWith(mockBookModel)
      })

      it("Should return an internal server error if database doesn't delete the book", async () => {
        service.findOne = jest.fn().mockReturnValueOnce(mockBookModel)
        mockRepository.delete.mockReturnValueOnce(null)

        const deletedBook = service.remove('1')

        expect(service.findOne).toHaveBeenCalledWith('1')
        expect(mockRepository.delete).toBeCalledWith(mockBookModel)
        expect(deletedBook).rejects.toThrow(InternalServerErrorException)
      })
    })
  })
})
