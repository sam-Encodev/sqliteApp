import React from "react";
import { View } from "react-native";
import Transactions from "../components/Transactions";

export default function Home({ navigation }) {
  return (
    <View
      style={{
        marginHorizontal: 10,
        marginTop: 10,
      }}
    >
      <Transactions />
    </View>
  );
}
