import { CreateAuthorInput } from './create-author.input'
import { InputType, Field, PartialType } from '@nestjs/graphql'
import { IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class UpdateAuthorInput extends PartialType(CreateAuthorInput) {
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  id: string
}
