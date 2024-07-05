import Main from "./src/Main";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
 return (
  <NavigationContainer>
   <GestureHandlerRootView style={{ flex: 1 }}>
    <StatusBar style="auto" />
    <Main />
   </GestureHandlerRootView>
  </NavigationContainer>
 );
}
