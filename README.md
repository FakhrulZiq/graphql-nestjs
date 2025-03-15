# 🚀 Personal Loan Tracking System (GraphQL & NestJS)

A **NestJS GraphQL API** for managing personal loans, built with **TypeScript, PostgreSQL, and TypeORM**. This system allows **user onboarding, online payments via Billplz, manual payment receipt approval, and loan tracking**.

## ✨ Features
- **GraphQL API** with Queries & Mutations
- **User Onboarding & Authentication**
- **Online Payment Integration (Billplz Payment Gateway)**
- **Manual Payment Receipt Approval**
- **Payment Tracking & Loan Management**
- **Automated GraphQL Documentation using Magidoc**
- **Database Integration with MySQL & TypeORM**
- **Modular & Scalable Architecture**
- **Environment Variables Support**

## 🛠 Tech Stack
- **Backend:** NestJS, GraphQL, TypeScript
- **Database:** PostgreSQL, TypeORM
- **Authentication:** JWT, Passport
- **Payment Gateway:** Billplz
- **GraphQL Documentation:** Magidoc

## 🚀 Getting Started

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [PostgreSQL](https://www.postgresql.org/)

### Installation
```bash
git clone https://github.com/FakhrulZiq/graphql-nestjs.git
cd graphql-nestjs
npm install
```

### Setup Environment Variables
Create a `.env` file and add the following variables:
```env
MYSQL_HOST=.............
MYSQL_PORT=.............
MYSQL_USERNAME=.........
MYSQL_PASSWORD=.........
MYSQL_NAME=.............

BILLPLZ_COLLECTION_ID=.
BILLPLZ_API_KEY=.......
BILLPLZ_URL=...........
```

### Running the Application
```bash
# Start the development server
npm run start:dev

# Start the production server
npm run start:prod
```

## 📌 Usage

### GraphQL Playground
Once the server is running, open GraphQL Playground at:
```
http://localhost:3000/graphql
```

Example Query:
```graphql
query {
  getUsers {
    id
    name
    email
  }
}
```

Example Mutation:
```graphql
mutation {
  createUser(input: { name: "John Doe", email: "john@example.com" }) {
    id
    name
  }
}
```

### 📖 GraphQL Documentation
Magidoc automatically generates GraphQL API documentation. To view it, run the following command.
```
magidoc preview
```

## 🤝 Contributing
Contributions are welcome! Please follow the guidelines:
- Fork the repository
- Create a new branch (`feature/your-feature`)
- Commit your changes
- Open a pull request

## 📜 License
This project is licensed under the **MIT License**.

---

