import {
 Text,
 View,
 Alert,
 TextInput,
 StyleSheet,
 TouchableOpacity,
} from "react-native";

export default function AddText({ text, setText, addUser }) {
 const info = {
  name: `${text}`,
  email: `${text}@gmail.com`,
 };

 const onPress = () => {
  if (text === "") {
   Alert.alert("Text input can't be blank");
   return;
  }
  addUser(info);
  setText("");
 };

 return (
  <View style={styles.inputXbutton}>
   <TextInput
    editable
    multiline
    numberOfLines={4}
    maxLength={40}
    style={styles.input}
    onChangeText={(text) => setText(text)}
    placeholder="enter text"
    value={text}
   />
   <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text>Press Here</Text>
   </TouchableOpacity>
  </View>
 );
}

const styles = StyleSheet.create({
 inputXbutton: {
  padding: 10,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  borderWidth: 1,
  width: "100%",
 },
 input: {
  height: 40,
  borderWidth: 1,
  width: "70%",
  padding: 10,
 },
 button: {
  verticalAlign: "center",
  alignItems: "center",
  justifyContent: "center",
  height: 40,
  width: "30%",
  backgroundColor: "gray",
 },
});
