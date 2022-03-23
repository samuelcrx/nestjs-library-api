import { InputType, OmitType } from '@nestjs/graphql'
import { CreateUserInput } from './create-user.input'

@InputType()
export class RegisterUserInput extends OmitType(CreateUserInput, [] as const) {}
