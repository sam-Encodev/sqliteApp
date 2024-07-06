import React from "react";
import { eq } from "drizzle-orm";
import { db } from "../../../db";
import ListItem from "./ListItem";
import EmptyState from "../EmptyState";
import TransactionSummary from "./Summary";
import { transaction } from "../../../db/schema";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import {
 TouchableOpacity,
 View,
 FlatList,
 ActionSheetIOS,
 Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function TransactionList() {
 const navigation = useNavigation();
 const { data } = useLiveQuery(db.select().from(transaction));

 const _handleDelete = async (id) => {
  await db.delete(transaction).where(eq(transaction.id, id));
 };

 const _handleEdit = (index) => {
  console.log("edit");
  navigation.navigate({
   name: "AddTransaction",
   params: { index },
  });
 };

 //  const [selecetedIndex, setSelectedIndex] = useState(null);

 const _handelActions = (index) => {
  ActionSheetIOS.showActionSheetWithOptions(
   {
    options: ["Edit", "Delete", "Cancel"],
    destructiveButtonIndex: 1,
    cancelButtonIndex: 2,
   },
   (buttonIndex) => {
    if (buttonIndex === 1) {
     _handleDelete(data.item.id);
    } else if (buttonIndex === 0) {
     _handleEdit(index);
    } else {
     null;
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
         return _handelActions(index);
        }

        navigation.navigate({
         name: "Sheet",
         params: { index },
        });
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
