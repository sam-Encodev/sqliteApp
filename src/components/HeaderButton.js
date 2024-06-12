import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function HeaderButton({ icon, title, onPress }) {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={styles.button}
      onPress={onPress}
    >
      {icon ? icon : null}
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  text: {
    fontWeight: "700",
    color: "#007BFF",
    fontSize: 14,
  },
});
