import { Module } from '@nestjs/common'
import { BooksService } from './books.service'
import { BookesResolver } from './books.resolver'
import { MongooseModule } from '@nestjs/mongoose'
import { Book, BookSchema } from './schemas/books.schema'
import { AuthorsModule } from '../authors/authors.module'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
    AuthorsModule
  ],
  providers: [BookesResolver, BooksService]
})
export class BooksModule {}
