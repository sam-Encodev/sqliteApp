import { db } from "../db";
import Home from "./screens/Home";
import { View, Text } from "react-native";
import migrations from "../db/migrations/migrations";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";

export default function Main() {
 const { success, error } = useMigrations(db, migrations);

 if (error) {
  return (
   <View>
    <Text>Migration error: {error.message}</Text>
   </View>
  );
 }
 if (!success) {
  return (
   <View>
    <Text>Migration is in progress...</Text>
   </View>
  );
 }

 return <Home />;
}
