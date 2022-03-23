import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { GraphQLError } from 'graphql'
import { GqlJwtAuthGuard } from '@/guards/gql-jwt-auth.guard'
import { I18nModule, I18nJsonParser } from 'nestjs-i18n'
import { QueryResolver } from './i18n/query.resolver'
import { AuthorsModule } from './authors/authors.module';
import { BooksModule } from './books/books.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL, {
      useNewUrlParser: true
    }),
    I18nModule.forRoot({
      fallbacks: {
        'pt-*': 'pt'
      },
      fallbackLanguage: 'pt',
      parserOptions: {
        path: join(process.cwd(), 'src/i18n/'),
        watch: true
      },
      parser: I18nJsonParser,
      resolvers: [QueryResolver]
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/graphql.schema.gql'),
      sortSchema: true,
      formatError: (error: GraphQLError) => ({
        message: error.extensions?.exception?.response?.message || error.message
      })
    }),
    UsersModule,
    AuthModule,
    AuthorsModule,
    BooksModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: GqlJwtAuthGuard
    }
  ]
})
export class AppModule {}
