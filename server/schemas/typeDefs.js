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

  type Query {
    me: User
    leaderBoard: [User]!
  }

  type Mutation {
    login(username: String!, password: String!): Auth
    signup(username: String!, password: String!): Auth
    addWin(id: ID!): User
  }
`;

module.exports = typeDefs;
