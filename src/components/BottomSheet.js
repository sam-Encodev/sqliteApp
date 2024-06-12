import React, { useMemo } from "react";
import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";

const Sheet = ({ handleRef, handleClose }) => {
  const snapPoints = useMemo(() => ["1%", "50%"], []);

  return (
    <BottomSheet
      ref={handleRef}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
    >
      <View style={styles.contentContainer}>
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.button}
          onPress={() => handleClose()}
        >
          <Ionicons name="close-outline" size={24} color="black" />
        </TouchableOpacity>
        <BottomSheetScrollView style={styles.container}></BottomSheetScrollView>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 15,
  },
  button: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});

export default Sheet;
