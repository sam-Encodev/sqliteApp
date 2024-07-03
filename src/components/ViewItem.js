import React from "react";
import { item } from "../styles";
import DeleteItem from "./DeleteItem";
import { Text, View } from "react-native";

export default function ViewItem({ data, removeUser }) {
 return (
  <View key={data.item.id} style={item}>
   <Text>{data.item.name}</Text>
   <DeleteItem dataId={data.item.id} removeUser={removeUser} />
  </View>
 );
}
