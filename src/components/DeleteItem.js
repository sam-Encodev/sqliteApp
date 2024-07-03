import React from "react";
import { buttone } from "../styles";
import { Text, TouchableOpacity } from "react-native";

export default function DeleteItem({ dataId, removeUser }) {
 return (
  <TouchableOpacity style={buttone} onPress={() => removeUser(dataId)}>
   <Text>x</Text>
  </TouchableOpacity>
 );
}
