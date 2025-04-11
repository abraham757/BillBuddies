
# BillBuddies 

# BillBuddies - Shared Expense Tracker

## Overview
BillBuddies is a web application built to help groups of people track shared expenses. Whether it's a group of friends on a trip, roommates sharing bills, or a project team managing expenses, BillBuddies allows users to track who owes what to whom. Users can sign up, log in, create groups, add expenses, and view a breakdown of the amounts owed by each member of the group.

This application utilizes **React** on the front-end, a **Node.js and Express.js** backend with **GraphQL** for data querying and mutations, **MongoDB** for storing data, and **JWT (JSON Web Tokens)** for user authentication.

---

## Features

- **User Authentication**: Sign up and login functionality using **JWT** for authentication.
- **Expense Tracking**: Add and track shared expenses within groups.
- **User-Friendly UI**: Interactive and responsive front-end built with **React** and **TailwindCSS**.
- **GraphQL Integration**: Efficient queries and mutations for data retrieval, addition, and updates using **GraphQL**.
- **MongoDB Database**: Uses **MongoDB** and **Mongoose** for storing user and expense data securely.
- **Group Management**: Users can create, manage, and view groups of people to split expenses with.
- **Secure API**: Sensitive data (like API keys) is securely managed and stored using **environment variables**.

---

## Tech Stack

- **Front-End**: 
  - React
  - TailwindCSS for styling
  - Apollo Client for interacting with GraphQL API
  - React Router for routing

- **Back-End**:
  - Node.js & Express.js (with GraphQL and Apollo Server)
  - MongoDB (with Mongoose ODM)
  - JWT (for user authentication)
  
- **DevOps**:
  - GitHub Actions for continuous integration and deployment

---

## GraphQL API

The application uses a **GraphQL API** to manage data such as users, groups, and expenses.

### Queries:
- **`GET_ME`**: Fetch the current authenticated user and their groups.
- **`GET_GROUP`**: Fetch details of a specific group by its ID, including members and expenses.

### Mutations:
- **`LOGIN_USER`**: User login via email and password.
- **`REGISTER_USER`**: User registration with name, email, and password.
- **`CREATE_GROUP`**: Create a new group for expense tracking.
- **`ADD_EXPENSE`**: Add a new expense to a group.
- **`REMOVE_EXPENSE`**: Remove an existing expense from a group.

---

## Setup and Installation

### Prerequisites:
- **Node.js** (v14+)
- **MongoDB** (Local instance or MongoDB Atlas for cloud DB)
- **Apollo Client** for GraphQL queries

### Local Development Setup:


   git clone https://github.com/your-username/billbuddies.git

