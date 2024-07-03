import React from "react";
import AddText from "./AddText";
import ViewItem from "./ViewItem";
import EmptyState from "./EmptyState";
import { Text, View, FlatList, StyleSheet } from "react-native";

export default function Content({ qty, users, addUser, removeUser }) {
 const [text, setText] = React.useState(null);

 return (
  <View style={styles.container}>
   <View style={styles.box}>
    <Text style={styles.headerText}>Content: {qty}</Text>

    <FlatList
     ListEmptyComponent={<EmptyState />}
     data={users}
     renderItem={(data) => (
      <ViewItem key={data.item.id} data={data} removeUser={removeUser} />
     )}
     keyExtractor={(item) => item.id}
     contentContainerStyle={styles.contentContainer}
     showsVerticalScrollIndicator={true}
    />
   </View>

   <AddText text={text} setText={setText} addUser={addUser} />
  </View>
 );
}

const styles = StyleSheet.create({
 container: {
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
 },
 box: {
  height: "92%",
 },
 headerText: {
  fontSize: 20,
  borderWidth: 1,
  textAlign: "center",
  paddingVertical: 10,
  backgroundColor: "#f2f2f2",
 },
 contentContainer: {
  gap: 10,
  paddingTop: 10,
  paddingBottom: 20,
 },
});
