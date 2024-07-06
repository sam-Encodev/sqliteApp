import React from "react";
import { Text, View } from "react-native";

export default function ErrorScreen({ route }) {
 const { error } = route.params;
 return (
  <View>
   <Text>
    Error${":("} {String(error)}
   </Text>
  </View>
 );
}
