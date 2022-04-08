import * as Chance from 'chance'
const chance = new Chance()

const registerUserInput = {
  firstName: chance.first(),
  lastName: chance.last(),
  email: chance.email()
}

export const CREATE_USER_OPERATION_NAME = 'RegisterUser'
export const UPDATE_USER_OPERATION_NAME = 'UpdateUser'
export const FIND_ONE_USER_OPERATION_NAME = 'FindUser'
export const FIND_USERS_OPERATION_NAME = 'FindAllUser'
export const DELETE_USER_OPERATION_NAME = 'deleteUser'

export const CREATE_USER_MUTATION = `mutation RegisterUser($registerUserInput: RegisterUserInput!) {
  registerUser(registerUserInput:$registerUserInput){
    _id
    email
    firstName
    lastName
  }
}`

export const generateCreateUserVariables = () => {
  return {
    registerUserInput
  }
}

export const UPDATE_USER_MUTATION = `mutation UpdateUser($updateUserInput: UpdateUserInput!) {
  updateUser(updateUserInput:$updateUserInput){
    _id
    email
    name
    lastName
  }
}`

export const generateUpdateUserVariables = () => {
  return {
    updateUserInput: {
      firstName: chance.first(),
      email: chance.email()
    }
  }
}

export const FIND_USER_QUERY = `query User($id: Id!) {
  user(id: $id){
    _id
    email
    name
    lastName
  }
}`

export const FIND_ALL_USERS_QUERY = `query Users {
  users {
    _id
    email
    name
    lastName
  }
}`
