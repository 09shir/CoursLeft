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
          credits
        }
      }
    }
  }
`
