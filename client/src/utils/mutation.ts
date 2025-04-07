import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
token
      user {
        _id
        username
        email
        groups {
          _id
          groupId
          members {
            _id
            username
          }
          expenses {
            _id
            amount
            description
            date
            paidBy {
              _id
              username
            }
          }
        }
        expensesPaid {
          _id
          amount
          description
          date
          groupId {
            _id
            groupId
          }
          paidBy {
            _id
            username
          }
        }
        expensesCreated {
          _id
          amount
          description
          date
          groupId {
            _id
            groupId
          }
          createdBy {
            _id
            username
          }
        }
      }
    }
  }
`; /* When a user logs in, the following data will be returned:
      token: The authentication token for the session.
      user: The user object containing:
      groups: All groups the user is part of, with associated expenses.
      expensesPaid: All expenses the user has paid. 
      expensesCreated: All expenses the user has created. */

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
       token
      user {
        _id
        username
        email
        groups {
          _id
          groupId
          members {
            _id
            username
          }
          expenses {
            _id
            amount
            description
            date
            paidBy {
              _id
              username
            }
          }
        }
        expensesPaid {
          _id
          amount
          description
          date
          groupId {
            _id
            groupId
          }
          paidBy {
            _id
            username
          }
        }
        expensesCreated {
          _id
          amount
          description
          date
          groupId {
            _id
            groupId
          }
          createdBy {
            _id
            username
          }
        }
      }
    }
  }
`; /* Create a new user, and after successful creation, return the newly created user's information along with a token for authentication*/

export const CREATE_GROUP = gql`
  mutation createGroup($groupId: String!, $members: [ID!]!) {
    createGroup(groupId: $groupId, members: $members) {
      _id
      groupId
      members {
        _id
        username
      }
      expenses {
        _id
        amount
        description
        date
        paidBy {
          _id
          username
        }
      }
    }
  }
`;// Create a group and return the newly created group along with its members and expenses

export const ADD_EXPENSE = gql`
  mutation addExpense($groupId: ID!, $paidBy: ID!, $amount: Float!, $description: String!) {
    addExpense(groupId: $groupId, paidBy: $paidBy, amount: $amount, description: $description) {
      _id
      groupId {
        _id
        groupId
        members {
          _id
          username
        }
      }
      amount
      description
      date
      paidBy {
        _id
        username
      }
    }
  }
`; // Add an expense to a group and return the updated group data along with the expense

export const SPLIT_EXPENSE = gql`
  mutation splitExpense($expenseId: ID!) {
    splitExpense(expenseId: $expenseId) {
      _id
      fromUser {
        _id
        username
      }
      toUser {
        _id
        username
      }
      amount
      expenseId {
        _id
        description
        amount
        date
      }
      settled
    }
  }
`; // Split an expense among users and return the resulting debts
export const SETTLE_DEBT = gql`
  mutation settleDebt($debtId: ID!) {
    settleDebt(debtId: $debtId) {
      _id
      fromUser {
        _id
        username
      }
      toUser {
        _id
        username
      }
      amount
      expenseId {
        _id
        description
        amount
        date
      }
      settled
    }
  }
`;// Allow a user to settle a debt and return the updated debt status

export const EDIT_EXPENSE = gql`
  mutation editExpense($expenseId: ID!, $amount: Float!, $description: String!) {
    editExpense(expenseId: $expenseId, amount: $amount, description: $description) {
      _id
      amount
      description
      date
      groupId {
        _id
        groupId
        members {
          _id
          username
        }
      }
      paidBy {
        _id
        username
      }
    }
  }
`; // Allow a user to delete an expense and return the deleted expense details

export const DELETE_EXPENSE = gql`
  mutation deleteExpense($expenseId: ID!) {
    deleteExpense(expenseId: $expenseId) {
      _id
      amount
      description
      date
      groupId {
        _id
        groupId
        members {
          _id
          username
        }
      }
      paidBy {
        _id
        username
      }
    }
  }
`; // Allow a user to delete an expense and return the deleted expense details
