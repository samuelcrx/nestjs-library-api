import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { UsersModule } from './../src/users/users.module'
import { User } from '@/users/schemas/user.schema'
import {
  CREATE_USER_MUTATION,
  CREATE_USER_OPERATION_NAME,
  generateCreateUserVariables,
  FIND_USER_QUERY,
  FIND_ONE_USER_OPERATION_NAME,
  FIND_USERS_OPERATION_NAME,
  FIND_ALL_USERS_QUERY
} from '../src/common/tests/e2e-tests/e2e-user-test'

describe('Users resolver (e2e)', () => {
  let app: INestApplication
  let user: User
  let users: User[]

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule]
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  describe('When register an User', () => {
    it('Should create an user with mutation', () => {
      const createUserInput = generateCreateUserVariables().registerUserInput
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          operationName: CREATE_USER_OPERATION_NAME,
          query: CREATE_USER_MUTATION,
          variables: { createUserInput },
          Headers: {
            authorization: process.env.TEST_LOGGED_TOKEN
          }
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.registerUser).toBeDefined()
          user = res.body.data.registerUser
          expect(user._id).toBeDefined()
          expect(user.firstName).toBe(createUserInput.firstName)
          expect(user.lastName).toBe(createUserInput.lastName)
        })
    })
  })

  describe('When find an User', () => {
    it('Should return an user', () => {
      const createUserInput = generateCreateUserVariables().registerUserInput
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          operationName: FIND_ONE_USER_OPERATION_NAME,
          query: FIND_USER_QUERY,
          variables: { Id: '623c212266f23f9421af08e5' }
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.user).toBeDefined()
          user = res.body.data.user
          expect(user._id).toBeDefined()
          expect(user.firstName).toBe(createUserInput.firstName)
          expect(user.lastName).toBe(createUserInput.lastName)
        })
    })

    it('Should return an error when try find user', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          operationName: FIND_ONE_USER_OPERATION_NAME,
          query: FIND_USER_QUERY,
          variables: { Id: '623c212266f23f9421af08e2' }
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.errors).toBeDefined()
          expect(res.body.data.errors[0].message).toBe('User not found')
        })
    })
  })

  describe('When finda all users', () => {
    it('Should find all users with query', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          operationName: FIND_USERS_OPERATION_NAME,
          query: FIND_ALL_USERS_QUERY
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.users).toBeDefined()
          users = res.body.data.users
          expect(users).toBe([
            {
              _id: '623c212266f23f9421af08e5',
              firstName: 'Samuel',
              email: 'samuel@mail.com',
              lastName: 'Braga'
            },
            {
              _id: '6246f8e9447696d9af656521',
              firstName: 'Samuel',
              email: 'samuel2@mail.com',
              lastName: 'Braga'
            }
          ])
        })
    })
  })

  describe('When create an User with mutation', () => {
    it('Should create an user with mutation', () => {
      const createUserInput = generateCreateUserVariables().registerUserInput
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          operationName: CREATE_USER_OPERATION_NAME,
          query: CREATE_USER_MUTATION,
          variables: { createUserInput }
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.createUser).toBeDefined()
          user = res.body.data.createUser
          expect(user._id).toBeDefined()
          expect(user.firstName).toBe(createUserInput.firstName)
          expect(user.lastName).toBe(createUserInput.lastName)
        })
    })
  })
})
