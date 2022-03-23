import { Args, Resolver, Mutation, Query } from '@nestjs/graphql'
import { AuthService } from './auth.service'
import { SkipAuth } from '../common/decorators/skip-auth.decorator'
import { GqlUserDecorator } from '../common/decorators/gql-jwt-user-decorator'
import { AuthArgs } from './dto/auth.args'
import { AuthJWT } from './entities/auth-jwt.entity'
import { User } from '@/users/schemas/user.schema'
import { I18n, I18nContext } from 'nestjs-i18n'

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthJWT)
  @SkipAuth()
  async login(@Args() authArgs: AuthArgs, @I18n() i18n: I18nContext) {
    return this.authService.login(authArgs, i18n)
  }

  @Query(() => User)
  async whoAmI(@GqlUserDecorator() user: User): Promise<any> {
    return user
  }
}
