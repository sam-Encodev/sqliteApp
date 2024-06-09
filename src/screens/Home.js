import { db } from "../../db";
import { user } from "../../db/schema";
import { count, eq } from "drizzle-orm";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView } from "react-native";

import Content from "../components/Content";

export default function Home() {
  const [state, setState] = useState([]);
  const [qty, setQty] = React.useState(0);

  const getUsers = async () => {
    const query = await db.select().from(user);
    setState(query);
  };

  const countUsers = async () => {
    const usersCount = await db.select({ count: count() }).from(user);
    setQty(usersCount[0].count);
  };

  useEffect(() => {
    console.log("Content.js mounted");
    try {
      getUsers();
      countUsers();
    } catch (error) {
      console.log({ error });
    }
  }, []);

  const addUser = async (info) => {
    await db.insert(user).values({
      name: info.name,
      email: info.email,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    await getUsers();
    await countUsers();
  };

  const removeUser = async (id) => {
    await db.delete(user).where(eq(user.id, id)).returning();

    await getUsers();
    await countUsers();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Content
        qty={qty}
        users={state}
        addUser={addUser}
        removeUser={removeUser}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
});
