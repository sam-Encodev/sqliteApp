import { eq } from "drizzle-orm";
import { db } from "../db";
import { user } from "../db/schema";

const getUsers = async () => {
 await db.select().from(user);
};

const deleteUsers = async () => {
 await db.delete(user);
};

const deleteUser = async (id) => {
 await db.delete(user).where(eq(user.id, id));
};

const getUser = async (id) => {
 await db.select().from(user).where(eq(user.id, id));
};

const countUsers = async () => {
 await db.select({ count: count() }).from(user);
};

const addUser = async ({ name, email }) => {
 await db.insert(user).values({
  name: name,
  email: email,
  createdAt: Date.now(),
  updatedAt: Date.now(),
 });

 getUsers();
};

const updateUser = async (name) => {
 await db.update(user).set({ name: "Mr. Dan" }).where(eq(user.name, name));
};

export { addUser };
