import { View, TouchableOpacity, Text } from "react-native";
import React, { useCallback, useMemo, useRef } from "react";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";

const Sheet = ({ route, navigation }) => {
 const { params } = route;
 const sheetRef = useRef(null);

 const snapPoints = useMemo(() => ["15%", "90%"], []);

 // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
 const handleSheetChanges = useCallback(
  (index) => {
   if (index === -1) {
    return navigation.pop();
   }
  },
  [navigation],
 );

 const handleClosePress = useCallback(() => {
  sheetRef.current?.close();
 }, []);

 const renderBackdrop = useCallback(
  (props) => (
   <BottomSheetBackdrop
    {...props}
    enableTouchThrough={false}
    disappearsOnIndex={-1}
    appearsOnIndex={0}
    pressBehavior="close"
    onPress={() => handleClosePress()}
   />
  ),
  [],
 );

 // renders
 return (
  <View style={{ flex: 1 }}>
   <BottomSheet
    index={0}
    snapPoints={snapPoints}
    enablePanDownToClose={true}
    onChange={handleSheetChanges}
    backdropComponent={renderBackdrop}
    onPress={() => handleClosePress()}
   >
    <View style={{ height: "100%" }}>
     <TouchableOpacity onPress={() => console.log("edit")}>
      <Text
       style={{
        color: "black",
        textAlign: "center",
        fontSize: 20,
        padding: 10,
       }}
      >
       Edit
      </Text>
     </TouchableOpacity>

     <TouchableOpacity onPress={() => console.log("delete")}>
      <Text
       style={{
        color: "red",
        textAlign: "center",
        fontSize: 20,
       }}
      >
       Delete
      </Text>
     </TouchableOpacity>
    </View>
   </BottomSheet>
  </View>
 );
};
export default Sheet;
