import React from "react";
import { Text } from "react-native";

export default function EmptyState({ content = "EmptyState" }) {
 return <Text style={{ textAlign: "center" }}>{content}</Text>;
}
