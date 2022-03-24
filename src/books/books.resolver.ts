import {
  Resolver,
  ResolveField,
  Parent,
  Query,
  Mutation,
  Args
} from '@nestjs/graphql'
import { BooksService } from './books.service'
import { Book } from './schemas/books.schema'
import { CreateBookInput } from './dto/create-book.input'
import { UpdateBookInput } from './dto/update-book.input'
import { AuthorsService } from '../authors/authors.service'
import { SkipAuth } from '@/common/decorators/skip-auth.decorator'

@Resolver(() => Book)
export class BookesResolver {
  constructor(
    private readonly booksService: BooksService,
    private authorsService: AuthorsService
  ) {}

  @SkipAuth()
  @Mutation(() => Book)
  createBook(@Args('createBookInput') createBookInput: CreateBookInput) {
    return this.booksService.create(createBookInput)
  }

  @Query(() => [Book], { name: 'classes' })
  findAll() {
    return this.booksService.findAll()
  }

  @Query(() => Book, { name: 'class' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.booksService.findOne(id)
  }

  // @Mutation(() => Book)
  // updateBook(@Args('updateBookInput') updateBookInput: UpdateBookInput) {
  //   return this.booksService.update(updateBookInput.id, updateBookInput)
  // }

  @Mutation(() => Book)
  removeBook(@Args('id', { type: () => String }) id: string) {
    return this.booksService.remove(id)
  }

  @ResolveField()
  author(@Parent() { author }: Book) {
    return this.authorsService.findOne(author._id)
  }
}
