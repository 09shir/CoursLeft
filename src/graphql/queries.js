/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        email
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getBoard = /* GraphQL */ `
  query GetBoard($id: ID!) {
    getBoard(id: $id) {
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
export const listBoards = /* GraphQL */ `
  query ListBoards(
    $filter: ModelBoardFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBoards(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        updatedAt
        userBoardsId
        username
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getTerm = /* GraphQL */ `
  query GetTerm($id: ID!) {
    getTerm(id: $id) {
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

export const getCoursesbyTerm = /* GraphQL */ `
  query GetTerm($id: ID!) {
    getTerm(id: $id) {
      id
      courses {
        items {
          id
          name
        }
      }
    }
  }
`;

export const getTermsbyBoard = /* GraphQL */ `
  query MyQuery($id: ID!) {
    getBoard(id: $id) {
      terms {
        items {
          id
          name
        }
      }
    }
  }
`

export const listTerms = /* GraphQL */ `
  query ListTerms(
    $filter: ModelTermFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTerms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        updatedAt
        boardTermsId
        username
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getCourse = /* GraphQL */ `
  query GetCourse($id: ID!) {
    getCourse(id: $id) {
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
export const listCourses = /* GraphQL */ `
  query ListCourses(
    $filter: ModelCourseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCourses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        updatedAt
        termCoursesId
        username
        __typename
      }
      nextToken
      __typename
    }
  }
`;
