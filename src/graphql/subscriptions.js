/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser(
    $filter: ModelSubscriptionUserFilterInput
    $username: String
  ) {
    onCreateUser(filter: $filter, username: $username) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser(
    $filter: ModelSubscriptionUserFilterInput
    $username: String
  ) {
    onUpdateUser(filter: $filter, username: $username) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser(
    $filter: ModelSubscriptionUserFilterInput
    $username: String
  ) {
    onDeleteUser(filter: $filter, username: $username) {
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
export const onCreateBoard = /* GraphQL */ `
  subscription OnCreateBoard(
    $filter: ModelSubscriptionBoardFilterInput
    $username: String
  ) {
    onCreateBoard(filter: $filter, username: $username) {
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
export const onUpdateBoard = /* GraphQL */ `
  subscription OnUpdateBoard(
    $filter: ModelSubscriptionBoardFilterInput
    $username: String
  ) {
    onUpdateBoard(filter: $filter, username: $username) {
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
export const onDeleteBoard = /* GraphQL */ `
  subscription OnDeleteBoard(
    $filter: ModelSubscriptionBoardFilterInput
    $username: String
  ) {
    onDeleteBoard(filter: $filter, username: $username) {
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
export const onCreateTerm = /* GraphQL */ `
  subscription OnCreateTerm(
    $filter: ModelSubscriptionTermFilterInput
    $username: String
  ) {
    onCreateTerm(filter: $filter, username: $username) {
      id
      name
      credits
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
export const onUpdateTerm = /* GraphQL */ `
  subscription OnUpdateTerm(
    $filter: ModelSubscriptionTermFilterInput
    $username: String
  ) {
    onUpdateTerm(filter: $filter, username: $username) {
      id
      name
      credits
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
export const onDeleteTerm = /* GraphQL */ `
  subscription OnDeleteTerm(
    $filter: ModelSubscriptionTermFilterInput
    $username: String
  ) {
    onDeleteTerm(filter: $filter, username: $username) {
      id
      name
      credits
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
export const onCreateCourse = /* GraphQL */ `
  subscription OnCreateCourse(
    $filter: ModelSubscriptionCourseFilterInput
    $username: String
  ) {
    onCreateCourse(filter: $filter, username: $username) {
      id
      name
      term {
        id
        name
        credits
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
export const onUpdateCourse = /* GraphQL */ `
  subscription OnUpdateCourse(
    $filter: ModelSubscriptionCourseFilterInput
    $username: String
  ) {
    onUpdateCourse(filter: $filter, username: $username) {
      id
      name
      term {
        id
        name
        credits
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
export const onDeleteCourse = /* GraphQL */ `
  subscription OnDeleteCourse(
    $filter: ModelSubscriptionCourseFilterInput
    $username: String
  ) {
    onDeleteCourse(filter: $filter, username: $username) {
      id
      name
      term {
        id
        name
        credits
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
