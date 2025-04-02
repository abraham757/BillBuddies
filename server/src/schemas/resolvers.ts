// src/schema/resolvers.ts
import { User, Group, Expense, Debt } from "../models/index.js";
//Will want to add authentiucation here

const resolvers = {
/*# Queries
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
    addExpense(groupId: ID!, userId: ID!, amount: Float!, description: String!, debtOwes: [DebtInput]!): Expense
    createDebt(fromUserId: ID!, toUserId: ID!, amount: Float!, expenseId: ID!): Debt  # This mutation links a debt to an expense
    settleDebt(debtId: ID!): Debt
    editExpense(expenseId: ID!, amount: Float!, description: String!): Expense
    deleteExpense(expenseId: ID!): Expense
  }

  input DebtInput {
    toUserId: ID!
    amount: Float!
  } */

}

export default resolvers;
