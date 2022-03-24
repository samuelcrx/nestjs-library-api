import { HttpException, HttpStatus } from '@nestjs/common'

type ExceptionBody<Type = any> = {
  message: string
  fieldErrors?: Partial<Type>
}

export class CustomException<Type> extends HttpException {
  constructor(exceptionBody: ExceptionBody<Type>, statusCode: HttpStatus) {
    super(exceptionBody, statusCode)
  }
}
