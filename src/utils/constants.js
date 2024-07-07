export const types = [
 {
  id: 0,
  name: "Expense",
  color: "red",
 },
 {
  id: 1,
  name: "Income",
  color: "green",
 },
];

export const categories = [
 { id: 1, name: "Groceries", type: "Expense", color: "#FFD700", emoji: "🛒" },
 { id: 2, name: "Rent", type: "Expense", color: "#FF6347", emoji: "🏠" },
 { id: 3, name: "Salary", type: "Income", color: "#32CD32", emoji: "💰" },
 {
  id: 4,
  name: "Freelancing",
  type: "Income",
  color: "#6495ED",
  emoji: "👨🏻‍💻",
 },
 {
  id: 5,
  name: "Electronics",
  type: "Expense",
  color: "#8A2BE2",
  emoji: "🖥️",
 },
 {
  id: 6,
  name: "Utilities",
  type: "Expense",
  color: "#00CED1",
  emoji: "💡",
 },
];

export const transactions = [
 {
  id: 1,
  category_id: 5,
  amount: 60,
  date: Date.now,
  description: "jello",
  type: "Income",
  created_at: Date.now,
  updatedAt: Date.now,
 },
 {
  id: 2,
  category_id: 6,
  amount: 60,
  date: Date.now,
  description: "jello",
  type: "Expense",
  created_at: Date.now,
  updatedAt: Date.now,
 },
 {
  id: 3,
  category_id: 6,
  amount: 60,
  date: Date.now,
  description: "jello",
  type: "Expense",
  created_at: Date.now,
  updatedAt: Date.now,
 },
 {
  id: 4,
  category_id: 5,
  amount: 60,
  date: Date.now,
  description: "jello",
  type: "Income",
  created_at: Date.now,
  updatedAt: Date.now,
 },
 {
  id: 5,
  category_id: 6,
  amount: 60,
  date: Date.now,
  description: "jello",
  type: "Expense",
  created_at: Date.now,
  updatedAt: Date.now,
 },
 {
  id: 6,
  category_id: 6,
  amount: 60,
  date: Date.now,
  description: "jello",
  type: "Expense",
  created_at: Date.now,
  updatedAt: Date.now,
 },
];

export const typeColor = (transactionType) => {
 switch (transactionType) {
  case "Income":
   return "green";
  default:
   return "red";
 }
};

export const iconType = (type) => {
 if (type === "Expense") {
  return "minuscircle";
 }

 return "pluscircle";
};

export const categoryForCurrentItem = (transaction) =>
 categories.find((category) => category.id === transaction.category_id);

export const readablePeriod = new Date().toLocaleDateString("default", {
 month: "long",
 year: "numeric",
});

export const getMoneyTextStyle = (value) => ({
 fontWeight: "500",
 color: value < 0 ? "#ff4500" : "#2e8b57",
});

export const formatMoney = (value) => {
 const absValue = Math.abs(value).toFixed(2);
 return `${value < 0 ? "-" : ""}$${absValue}`;
};

export const numericValue = (text) => {
 return text.replace(/[^0-9.]/g, "");
};

export const getTransactionType = (data, type) => {
 const filter = data.filter((t) => t.type === type);
 return filter[0]?.sum ?? 0;
};

export const getIndex = (item, data = types) => {
 // console.log({item})
 // console.log(data)
 const filter = data.filter((t) => t.name === item);
 return filter[0];
};

export const getID = (item, data = types) => {
 const filter = data.filter((t) => t.id === item);
 return filter[0];
};
