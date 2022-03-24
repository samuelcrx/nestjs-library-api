import { ObjectType, Field } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type AuthorDocument = Author & Document

@ObjectType()
@Schema()
export class Author {
  @Field(() => String, { description: "author's id" })
  _id: string

  @Field(() => String, { description: "author's first name" })
  @Prop()
  first_name: string

  @Field(() => String, { description: "author's last name" })
  @Prop()
  last_name: string

  @Field(() => Number, { description: "author's  age" })
  @Prop()
  age?: number
}

export const AuthorSchema = SchemaFactory.createForClass(Author)
