const typeDefs = /* GraphQL */`
  type User {
    _id: ID
    username: String!
    password: String!
    wins: Int
  }

  type Auth {
    token: ID!
    user: User
  }

  type Mutation {
    login(username: String!, password: String!): Auth
    signup(username: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
