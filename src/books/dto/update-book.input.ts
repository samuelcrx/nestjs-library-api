import { CreateBookInput } from './create-book.input'
import { InputType, Field, PartialType } from '@nestjs/graphql'
import { IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class UpdateBookInput extends PartialType(CreateBookInput) {
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  id: string
}
