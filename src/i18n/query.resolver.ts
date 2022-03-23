import { I18nResolver } from 'nestjs-i18n'
import { Injectable, ExecutionContext } from '@nestjs/common'

@Injectable()
export class QueryResolver implements I18nResolver {
  resolve(context: ExecutionContext) {
    let req: any

    switch (context.getType() as string) {
      case 'http':
        req = context.switchToHttp().getRequest()
        break
      case 'graphql':
        ;[, , { req }] = context.getArgs()
        break
    }

    let lang: string

    if (req && req.headers) {
      lang = req.headers.locale
    }

    return lang
  }
}
