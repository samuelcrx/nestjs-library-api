import { CreateBookInput } from 'src/books/dto/create-book.input'
import { UpdateBookInput } from 'src/books/dto/update-book.input'
import { Book } from './../../books/schemas/books.schema'

export const mockCreateBook: CreateBookInput = {
  title: 'Book Title',
  description: 'A little book on the table',
  publishing_company: 'Middleware',
  author: '2'
}

export const mockUpdateBookParams: UpdateBookInput = {
  id: '1',
  title: 'New book title',
  author: '6'
}

export const mockBookModel: Book = {
  _id: '1',
  ...mockCreateBook,
  author: {
    _id: '50',
    first_name: 'First',
    last_name: 'Second',
    age: 21
  }
}

export const mockUpdatedBookModel: Book = {
  ...mockBookModel,
  title: 'A New Title'
}

export const mockBookArrayModel: Book[] = [
  mockBookModel,
  {
    _id: '2',
    title: 'First Title',
    description: 'A new book description',
    publishing_company: 'Maoi',
    author: {
      _id: '50',
      first_name: 'First',
      last_name: 'Second',
      age: 47
    }
  },
  {
    _id: '8',
    title: 'Second Title',
    description: 'A new and new book description',
    publishing_company: 'Research',
    author: {
      _id: '52',
      first_name: 'My',
      last_name: 'Author',
      age: 34
    }
  }
]
