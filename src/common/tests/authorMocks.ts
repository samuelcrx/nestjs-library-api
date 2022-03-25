import { CreateAuthorInput } from 'src/authors/dto/create-author.input'
import { UpdateAuthorInput } from 'src/authors/dto/update-author.input'
import { Author } from './../../authors/schemas/authors.schema'

export const mockCreateAuthor: CreateAuthorInput = {
  first_name: 'First',
  last_name: 'Second',
  age: 21
}

export const mockUpdateAuthorParams: UpdateAuthorInput = {
  id: '1',
  first_name: 'myNewEmaild@mail.com',
  age: 24
}

export const mockAuthorModel: Author = {
  _id: '1',
  ...mockCreateAuthor
}

export const mockUpdatedAuthorModel: Author = {
  ...mockAuthorModel,
  first_name: 'Silva',
  last_name: 'Origin'
}

export const mockAuthorArrayModel: Author[] = [
  mockAuthorModel,
  {
    _id: '2',
    first_name: 'Second',
    last_name: 'Author',
    age: 21
  },
  {
    _id: '4',
    first_name: 'Fourty',
    last_name: 'Author',
    age: 32
  }
]
