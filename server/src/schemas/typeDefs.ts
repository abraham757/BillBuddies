const typeDefs = `
# Define the Bill type, which represents a bill in the application
type Bill {
  billId: ID!
  amount: Float!
  description: String
  participants: [String]!  # List of participants involved in this bill
  paidBy: String!  # User who paid for the bill
  date: String
}

# Define the User type, with information about the user and their bills
type User {
  _id: ID!
  username: String!
  email: String!
  billCount: Int  # Count of bills associated with the user
  savedBills: [Bill]  # The list of bills saved by the user
}

# Auth type to return the JWT token and the user details
type Auth {
  token: ID!
  user: User
}

# Input type to pass the data when adding a bill
input BillInput {
  billId: String!
  amount: Float!
  description: String
  participants: [String]!  # Participants involved in this bill
  paidBy: String!  # User who paid for the bill
  date: String
}

# Root queries for getting data from the server
type Query {
  me: User  # Get the current logged-in user
  bills: [Bill]  # Fetch all bills across all users (remove duplicates)
  user(username: String): User  # Get a user by their username
}

# Root mutations to modify data on the server
type Mutation {
  login(email: String, username: String, password: String!): Auth  # Login the user
  addUser(username: String!, email: String!, password: String!): Auth  # Register a new user
  saveBill(billData: BillInput!): User  # Save a bill to a user's saved bills
  removeBill(billId: ID!): User  # Remove a bill from the user's saved bills
}
`;

export default typeDefs;
