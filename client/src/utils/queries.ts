import { gql } from '@apollo/client';

export const GET_ME = gql` // retrieves the information of a specific user, including their groups and expenses (both paid and created)
  query me {
    me {
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
`
export const GET_GROUP = gql` //fetches the details of a specific group, including the group members and associated expenses
  query getGroup($id: ID!) {
      getGroup(id: $id) {
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
  `;
 
  export const GET_EXPENSES = gql` //all expenses for a given group
  query getExpenses($groupId: ID!) {
    getExpenses(groupId: $groupId) {
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
  }
`;

export const GET_DEBTS = gql`
  query getDebts {
    getDebts(userId: "me") {
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
`;
/*
GET_ME retrieves a user's profile, including their groups and expenses.

GET_GROUP retrieves information about a specific group.

GET_EXPENSES retrieves all expenses for a given group.

GET_DEBTS retrieves debts related to a specific user. */