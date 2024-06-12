import {
  formatMoney,
  readablePeriod,
  getMoneyTextStyle,
} from "../../utils/constants";
import * as React from "react";
import { db } from "../../../db";
import { sql } from "drizzle-orm";
import { StyleSheet, Text, View } from "react-native";
import { transaction } from "../../../db/schema";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { getTransactionType } from "../../utils/constants";

export default function TransactionSummary() {
  const { data } = useLiveQuery(
    db
      .select({
        type: transaction.type,
        sum: sql`cast(sum(${transaction.amount}) as int)`,
      })
      .from(transaction)
      .groupBy(transaction.type)
  );

  const totalExpenses = getTransactionType(data, "Expense");
  const totalIncome = getTransactionType(data, "Income");
  const savings = totalIncome - totalExpenses;

  return (
    <View style={styles.container}>
      <Text style={styles.periodTitle}>Summary for {readablePeriod}</Text>
      <Text style={styles.summaryText}>
        Income:{" "}
        <Text style={getMoneyTextStyle(totalIncome)}>
          {formatMoney(totalIncome)}
        </Text>
      </Text>
      <Text style={styles.summaryText}>
        Total Expenses:{" "}
        <Text style={getMoneyTextStyle(totalExpenses)}>
          {formatMoney(totalExpenses)}
        </Text>
      </Text>
      <Text style={styles.summaryText}>
        Savings:{" "}
        <Text style={getMoneyTextStyle(savings)}>{formatMoney(savings)}</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    paddingBottom: 7,
    padding: 15,
    borderRadius: 15,
    backgroundColor: "white",
    elevation: 8,
    shadowColor: "#000",
    shadowRadius: 8,
    shadowOffset: { height: 6, width: 0 },
    shadowOpacity: 0.15,
  },
  periodTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  summaryText: {
    fontSize: 15,
    color: "#333",
    marginBottom: 10,
  },
});
