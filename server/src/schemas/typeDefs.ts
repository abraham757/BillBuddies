const typeDefs = `
  # User type
  type User {
    _id: ID!
    username: String!
    email: String!
    groups: [Group]
    expensesPaid: [Expense]! # Expenses this user actually paid for
    expensesCreated: [Expense]! # Expenses this user logged in the system
  }

  # Group type
  type Group {
    _id: ID!
    groupId: String!
    members: [User]
    expenses: [Expense]
  }

  # Expense type
  type Expense {
    _id: ID!
    amount: Float!
    description: String!
    date: String!
    groupId: Group!
    createdBy: User! # Who added/logged the expense
    paidBy User! # Identifies who actually covered the expense
  }

  # Debt type
  type Debt {
    _id: ID!
    fromUser: User! # Who owes money
    toUser: User! # Who is owed money
    amount: Float!
    expenseId: Expense!
    settled: Boolean!
  }

  # Queries
  type Query {
    getUser(id: ID!): User
    getGroup(id: ID!): Group
    getExpenses(groupId: ID!): [Expense]
    getDebts(userId: ID!): [Debt]  # Get debts for a specific user
  }

  # Mutations
  type Mutation {
    createUser(username: String!, email: String!, password: String!): User
    createGroup(groupId: String!, members: [ID!]!): Group
    addExpense(groupId: ID!, paidBy: ID!, amount: Float!, description: String!): Expense #Option add currency
    splitExpense(expenseId: ID!): [Debt] 
    settleDebt(debtId: ID!): Debt
    editExpense(expenseId: ID!, amount: Float!, description: String!): Expense
    deleteExpense(expenseId: ID!): Expense
  }
`;

export default typeDefs;