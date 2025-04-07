import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        savedBills {
          billId
          amount
          description
          participants
          paidBy
          date
        }
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        savedBills {
          billId
          amount
          description
          participants
          paidBy
          date
        }
      }
    }
  }
`;

export const SAVE_BILL = gql`
  mutation saveBill($billData: BillInput!) {
    saveBill(billData: $billData) {
      _id
      username
      email
      savedBills {
        billId
        amount
        description
        participants
        paidBy
        date
      }
    }
  }
`;

export const REMOVE_BILL = gql`
  mutation removeBill($billId: ID!) {
    removeBill(billId: $billId) {
      _id
      username
      email
      savedBills {
        billId
        amount
        description
        participants
        paidBy
        date
      }
    }
  }
`;
