import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      savedBills {
        billId
        totalAmount
        description
        participants
        paidBy
        date
        createdBy
        title

      }
    }
  }
`;
