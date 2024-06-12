import React from "react";
import { StyleSheet, Text } from "react-native";

export default function EmptyState({ content = "EmptyState" }) {
  return <Text style={styles.headerText}>{content}</Text>;
}

const styles = StyleSheet.create({
  headerText: {
    textAlign: "center",
  },
});
