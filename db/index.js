import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite/next";

export const expoDb = openDatabaseSync("budget.db", {
 enableChangeListener: true,
});
export const db = drizzle(expoDb);
