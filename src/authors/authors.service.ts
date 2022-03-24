import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { CreateAuthorInput } from './dto/create-author.input'
import { UpdateAuthorInput } from './dto/update-author.input'
import { InjectModel } from '@nestjs/mongoose'
import { Author, AuthorDocument } from './schemas/authors.schema'

@Injectable()
export class AuthorsService {
  constructor(
    @InjectModel(Author.name)
    private authorModel: Model<AuthorDocument>
  ) {}

  async create(createAuthorInput: CreateAuthorInput) {
    console.log('New author ', createAuthorInput)
    const newAuthor = await this.authorModel.create(createAuthorInput)

    if (!newAuthor) {
      throw new Error("Author wasn't create")
    }
    console.log('New author ', newAuthor)
    return newAuthor
  }

  findAll() {
    return this.authorModel.find().exec()
  }

  findOne(id: string) {
    return this.authorModel.findById(id).exec()
  }

  update(id: string, updateAuthorInput: UpdateAuthorInput) {
    return this.authorModel.findByIdAndUpdate(id, updateAuthorInput).exec()
  }

  remove(id: string) {
    return this.authorModel.findByIdAndDelete(id).exec()
  }
}
