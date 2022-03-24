import { ObjectType, Field } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Schema as MongooseSchema } from 'mongoose'
import { Author } from '../../authors/schemas/authors.schema'

export type BookDocument = Book & Document

@ObjectType()
@Schema()
export class Book {
  @Field(() => String, { description: "books's id" })
  _id: string

  @Field(() => String, { description: "books's title" })
  @Prop()
  title: string

  @Field(() => String, { description: "books's description" })
  @Prop()
  description?: string

  @Field(() => String, { description: "books's  publishing_company" })
  @Prop()
  publishing_company: string

  @Field(() => Author, { description: "book's author" })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Author' })
  author: Author
}

export const BookSchema = SchemaFactory.createForClass(Book)
