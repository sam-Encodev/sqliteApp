import React from "react";
import { eq } from "drizzle-orm";
import { db } from "../../../db";
import EmptyState from "../EmptyState";
import TransactionSummary from "./Summary";
import ListItem from "./ListItem";
import { transaction } from "../../../db/schema";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { TouchableOpacity, View, FlatList } from "react-native";

export default function TransactionList() {
  const { data } = useLiveQuery(db.select().from(transaction));

  const deleteTransaction = async (id) => {
    await db.delete(transaction).where(eq(transaction.id, id));
  };

  return (
    <View
      style={{
        height: "100%",
      }}
    >
      <FlatList
        ListHeaderComponent={<TransactionSummary />}
        ListEmptyComponent={<EmptyState content="No transactions yet" />}
        data={data}
        renderItem={(data) => (
          <View key={data.item.id}>
            <TouchableOpacity
              activeOpacity={0.7}
              onLongPress={() => deleteTransaction(data.item.id)}
            >
              <ListItem transaction={data.item} />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 10, paddingTop: 10, paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
