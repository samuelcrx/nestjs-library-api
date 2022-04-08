import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { CreateBookInput } from './dto/create-book.input'
import { UpdateBookInput } from './dto/update-book.input'
import { InjectModel } from '@nestjs/mongoose'
import { Book, BookDocument } from './schemas/books.schema'
import { AuthorsService } from '@/authors/authors.service'

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: Model<BookDocument>,
    private authorsService: AuthorsService
  ) {}

  async create(createBookInput: CreateBookInput) {
    const author = await this.authorsService.findOne(createBookInput.author)
    if (!author) {
      throw new Error("Author's id is invalid")
    }

    const createdBook = this.bookModel.create(createBookInput)
    if (!createdBook) {
      throw new Error("Book wasn't create")
    }
    return createdBook
  }

  findAll() {
    return this.bookModel.find().exec()
  }

  findOne(id: string) {
    return this.bookModel.findById(id).exec()
  }

  update(id: string, updateBookInput: UpdateBookInput) {
    return this.bookModel.findByIdAndUpdate(updateBookInput).exec()
  }

  remove(id: string) {
    return this.bookModel.findByIdAndDelete(id).exec()
  }
}
