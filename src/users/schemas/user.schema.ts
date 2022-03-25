import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { ObjectType, Field } from '@nestjs/graphql'

export type UserDocument = User & Document

@Schema()
@ObjectType()
export class User {
  @Field(() => String, {
    description: "user's _id on registration",
    nullable: true
  })
  _id?: string

  @Prop({ unique: true })
  @Field(() => String, { description: "user's email" })
  email: string

  @Prop()
  @Field(() => String, { description: "user's name" })
  firstName: string

  @Prop()
  @Field(() => String, { description: "user's last name" })
  lastName: string

  @Prop()
  @Field(() => String, { description: "user's password" })
  password: string

  @Field()
  createdAt?: Date

  @Field()
  updatedAt?: Date
}

export const UserSchema = SchemaFactory.createForClass(User)
