const typeDefs = /* GraphQL */`
  type User {
    _id: ID
    username: String!
    password: String!
    wins: Int
    avatar: String
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
    signup(username: String!, password: String!, avatar: String): Auth
    addWin(_id: ID): User
  }
`;

module.exports = typeDefs;
