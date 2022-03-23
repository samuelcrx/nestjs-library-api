import { SetMetadata } from '@nestjs/common'
import { applyDecorators } from '@nestjs/common'

export const SKIP_AUTH = 'SKIP_AUTH'
export const SkipAuth = (skipAuth = true) =>
  applyDecorators(SetMetadata(SKIP_AUTH, skipAuth))
