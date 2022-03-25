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

  async create(createAuthorInput: CreateAuthorInput): Promise<Author> {
    console.log('New author ', createAuthorInput)
    const newAuthor = await this.authorModel.create(createAuthorInput)

    if (!newAuthor) {
      throw new Error("Author wasn't create")
    }
    console.log('New author ', newAuthor)
    return newAuthor
  }

  async findAll(): Promise<Array<Author>> {
    return await this.authorModel.find().exec()
  }

  async findOne(id: string): Promise<Author> {
    return await this.authorModel.findById(id).exec()
  }

  async update(
    id: string,
    updateAuthorInput: UpdateAuthorInput
  ): Promise<Author> {
    return await this.authorModel
      .findByIdAndUpdate(id, updateAuthorInput)
      .exec()
  }

  async remove(id: string): Promise<any> {
    return await this.authorModel.findByIdAndDelete(id).exec()
  }
}
