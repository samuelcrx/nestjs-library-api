import { InputType, Int, Field } from '@nestjs/graphql'
import { IsString, IsNotEmpty } from 'class-validator'

@InputType()
export class CreateBookInput {
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: "book's title" })
  title: string

  @IsString()
  @Field(() => String, { description: "book's description" })
  description?: string

  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: "book's publish company" })
  publishing_company: string

  @Field(() => String, { description: "book's author" })
  author: string
}
