import React from "react";
import { eq } from "drizzle-orm";
import { db } from "../../../db";
import ListItem from "./ListItem";
import EmptyState from "../EmptyState";
import TransactionSummary from "./Summary";
import { transaction } from "../../../db/schema";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import {
 View,
 FlatList,
 Platform,
 ActionSheetIOS,
 TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { store } from "../../store";

export default function TransactionList() {
 const navigation = useNavigation();
 const { data } = useLiveQuery(db.select().from(transaction));
 const setSelectedItem = store((state) => state.setSelectedItem);

 const _handleDelete = async ({ itemID }) => {
  await db.delete(transaction).where(eq(transaction.id, itemID));
 };

 const _handleEdit = ({ item }) => {
  setSelectedItem(item);
  navigation.navigate({
   name: "EditTransaction",
   params: { index: item?.id },
  });
 };

 const _handelActions = (item) => {
  ActionSheetIOS.showActionSheetWithOptions(
   {
    options: ["Edit", "Delete", "Cancel"],
    destructiveButtonIndex: 1,
    cancelButtonIndex: 2,
   },
   (buttonIndex) => {
    if (buttonIndex === 1) {
     _handleDelete({ itemID: item?.id });
    } else if (buttonIndex === 0) {
     _handleEdit({ item });
    }
   },
  );
 };

 return (
  <View style={{ height: "100%" }}>
   <FlatList
    data={data}
    renderItem={({ item, index }) => (
     <View key={item?.id}>
      <TouchableOpacity
       activeOpacity={0.7}
       onPress={() => {
        // setSelectedIndex(index);
        if (Platform.OS === "ios") {
         return _handelActions(item);
        }

        // setSelectedItem(item);
        // navigation.navigate({
        //  name: "Sheet",
        //  params: { index },
        // });
       }}
       onLongPress={() => console.log("onLongPress")}
      >
       <ListItem transaction={item} />
      </TouchableOpacity>
     </View>
    )}
    keyExtractor={(item) => item.id}
    showsVerticalScrollIndicator={false}
    ListHeaderComponent={<TransactionSummary />}
    ListEmptyComponent={<EmptyState content="No transactions yet" />}
    contentContainerStyle={{ gap: 10, paddingTop: 10, paddingBottom: 30 }}
   />
  </View>
 );
}
