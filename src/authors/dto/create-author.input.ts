import { InputType, Int, Field } from '@nestjs/graphql'
import { IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class CreateAuthorInput {
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: "author's first name" })
  first_name: string

  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: "author's last name" })
  last_name: string

  @IsString()
  @Field(() => Number, { description: "author's age" })
  age?: number
}
