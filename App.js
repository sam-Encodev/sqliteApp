import Main from "./src/Main";
import { config } from "@tamagui/config/v3";
import { StatusBar } from "expo-status-bar";
import { TamaguiProvider, createTamagui } from "tamagui";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const appConfig = createTamagui(config);
export default function App() {
 return (
  <NavigationContainer>
   <TamaguiProvider config={appConfig}>
    <GestureHandlerRootView style={{ flex: 1 }}>
     <StatusBar style="auto" />
     <Main />
    </GestureHandlerRootView>
   </TamaguiProvider>
  </NavigationContainer>
 );
}
