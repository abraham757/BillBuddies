//server/src/models/index.ts
//Compile all models and export into one index.ts
import User from "./User.js";
import Debt from "./Debt.js";
import Expense from "./Expense.js";
import Group from "./Group.js";

export { User,Group, Debt, Expense};