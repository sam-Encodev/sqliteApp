import React from "react";
import { db } from "../db";
import Home from "./screens/Home";
import { StyleSheet, Alert, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import HeaderButton from "./components/HeaderButton";
import migrations from "../db/migrations/migrations";
import AddTransaction from "./screens/AddTransaction";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function Main() {
  useDrizzleStudio(db);
  const { success, error } = useMigrations(db, migrations);

  React.useEffect(() => {
    if (error) {
      // return Alert.alert("Error", error.message, [
      //   { text: "OK", onPress: () => console.log("OK Pressed") },
      // ]);
    }
  }, [error]);

  // if (!success) {
  //   return Alert.alert("Info", "Migration is in progress...", [
  //     { text: "OK", onPress: () => console.log("OK Pressed") },
  //   ]);
  // }

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => ({
          title: null,
          headerRight: () => (
            <HeaderButton
              icon={
                <MaterialIcons
                  name="add-circle-outline"
                  size={18}
                  color="#007BFF"
                  style={{ marginRight: 5 }}
                />
              }
              title="New Transaction"
              onPress={() => navigation.navigate("AddTransaction")}
            />
          ),
          headerLeft: () => (
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold" 
              }}
            >
              Budget Tracker
            </Text>
          ),
        })}
      />
      <Stack.Screen
        name="AddTransaction"
        component={AddTransaction}
        options={({ navigation }) => ({
          presentation: "modal",
          title: null,
          headerTransparent: false,
          headerRight: () => <HeaderButton title="Save" />,
        })}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {},
});
