import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  } from "react-native";
import React from "react";
import AddText from "./AddText";
import EmptyState from "./EmptyState";

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
            <View
              key={data.item.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
                padding: 10,
                marginTop: 10,
                borderWidth: 3,
                marginHorizontal: 10,
                alignItems: "center",
              }}
            >
              <Text>{data.item.name}</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => removeUser(data.item.id)}
              >
                <Text>x</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ gap: 10, paddingTop: 10, paddingBottom: 20 }}
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
  text: {
    padding: 10,
    marginTop: 10,
    borderWidth: 3,
    marginHorizontal: 10,
  },
  button: {
    alignItems: "center",
    padding: 10,
    width: "10%",
    backgroundColor: "tomato",
    borderRadius: 10,
  },
});
