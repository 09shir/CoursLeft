/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      username
      email
      boards {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      username
      email
      boards {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      username
      email
      boards {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createBoard = /* GraphQL */ `
  mutation CreateBoard(
    $input: CreateBoardInput!
    $condition: ModelBoardConditionInput
  ) {
    createBoard(input: $input, condition: $condition) {
      id
      name
      user {
        id
        username
        email
        createdAt
        updatedAt
        __typename
      }
      terms {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      userBoardsId
      username
      __typename
    }
  }
`;
export const updateBoard = /* GraphQL */ `
  mutation UpdateBoard(
    $input: UpdateBoardInput!
    $condition: ModelBoardConditionInput
  ) {
    updateBoard(input: $input, condition: $condition) {
      id
      name
      user {
        id
        username
        email
        createdAt
        updatedAt
        __typename
      }
      terms {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      userBoardsId
      username
      __typename
    }
  }
`;
export const deleteBoard = /* GraphQL */ `
  mutation DeleteBoard(
    $input: DeleteBoardInput!
    $condition: ModelBoardConditionInput
  ) {
    deleteBoard(input: $input, condition: $condition) {
      id
      name
      user {
        id
        username
        email
        createdAt
        updatedAt
        __typename
      }
      terms {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      userBoardsId
      username
      __typename
    }
  }
`;
export const createTerm = /* GraphQL */ `
  mutation CreateTerm(
    $input: CreateTermInput!
    $condition: ModelTermConditionInput
  ) {
    createTerm(input: $input, condition: $condition) {
      id
      name
      board {
        id
        name
        createdAt
        updatedAt
        userBoardsId
        username
        __typename
      }
      courses {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      boardTermsId
      username
      __typename
    }
  }
`;
export const updateTerm = /* GraphQL */ `
  mutation UpdateTerm(
    $input: UpdateTermInput!
    $condition: ModelTermConditionInput
  ) {
    updateTerm(input: $input, condition: $condition) {
      id
      name
      board {
        id
        name
        createdAt
        updatedAt
        userBoardsId
        username
        __typename
      }
      courses {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      boardTermsId
      username
      __typename
    }
  }
`;
export const deleteTerm = /* GraphQL */ `
  mutation DeleteTerm(
    $input: DeleteTermInput!
    $condition: ModelTermConditionInput
  ) {
    deleteTerm(input: $input, condition: $condition) {
      id
      name
      board {
        id
        name
        createdAt
        updatedAt
        userBoardsId
        username
        __typename
      }
      courses {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      boardTermsId
      username
      __typename
    }
  }
`;
export const createCourse = /* GraphQL */ `
  mutation CreateCourse(
    $input: CreateCourseInput!
    $condition: ModelCourseConditionInput
  ) {
    createCourse(input: $input, condition: $condition) {
      id
      name
      term {
        id
        name
        createdAt
        updatedAt
        boardTermsId
        username
        __typename
      }
      createdAt
      updatedAt
      termCoursesId
      username
      __typename
    }
  }
`;
export const updateCourse = /* GraphQL */ `
  mutation UpdateCourse(
    $input: UpdateCourseInput!
    $condition: ModelCourseConditionInput
  ) {
    updateCourse(input: $input, condition: $condition) {
      id
      name
      term {
        id
        name
        createdAt
        updatedAt
        boardTermsId
        username
        __typename
      }
      createdAt
      updatedAt
      termCoursesId
      username
      __typename
    }
  }
`;
export const deleteCourse = /* GraphQL */ `
  mutation DeleteCourse(
    $input: DeleteCourseInput!
    $condition: ModelCourseConditionInput
  ) {
    deleteCourse(input: $input, condition: $condition) {
      id
      name
      term {
        id
        name
        createdAt
        updatedAt
        boardTermsId
        username
        __typename
      }
      createdAt
      updatedAt
      termCoursesId
      username
      __typename
    }
  }
`;
