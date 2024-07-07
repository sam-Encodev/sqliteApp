import React from "react";
import { db } from "../../db";
import { desc, eq } from "drizzle-orm";
import { store } from "../store";
import { transaction } from "../../db/schema";
import HeaderButton from "../components/HeaderButton";
import CategoryButton from "../components/CategoryButton";
import { View, Text, TextInput, Alert } from "react-native";
import {
 categories as items,
 numericValue,
 types,
 getIndex,
 getID,
} from "../utils/constants";
import SegmentedControl from "@react-native-segmented-control/segmented-control";

export default function EditTransaction({ route, navigation }) {
 const { params } = route;
 const selectedItem = store((state) => state.selectedItem);

 const [selected, setSelected] = React.useState({
  index: getIndex(selectedItem?.type).id,
  type: getIndex(selectedItem?.type).name,
 });

 console.log({ selected });
 const [amount, setAmount] = React.useState("");
 const [categories, setCategories] = React.useState([]);
 const [description, setDescription] = React.useState("");
 const [categoryId, setCategoryId] = React.useState(null);
 const [typeSelected, setTypeSelected] = React.useState("");

 console.log({ selectedItem });
 //  const setSelectedItem = store((state) => state.setSelectedItem);

 React.useEffect(() => {
  navigation.setOptions({
   headerTitle: "Edit Transaction",
   headerRight: () => (
    <HeaderButton
     title="Update"
     onPress={(e) => {
      e.preventDefault();
      updateTransaction();
     }}
    />
   ),
  });

  getExpenseType();
 }, [navigation, amount, description, categoryId]);

 async function getExpenseType() {
  const selectedType = selected.index === 0 ? "Expense" : "Income";
  const filteredList = items.filter((item) => {
   return item.type === selectedType;
  });
  setCategories(filteredList);
 }

 const updateTransaction = async () => {
  const data = {
   amount: amount,
   description: description,
   category_id: categoryId,
   type: selected.type,
  };
  
  await db
   .update(transaction)
   .set({
    amount: Number(amount),
    description: description,
    category_id: categoryId,
    type: selected.type,
   })
   .where(eq(transaction.id, params?.index));

  // console.log({ data });

  // navigation.goBack();
 };

 return (
  <View style={{ flex: 1, padding: 15 }}>
   <TextInput
    placeholder={params?.index ? selectedItem.amount : "$Amount"}
    style={{ fontSize: 32, marginBottom: 15, fontWeight: "bold" }}
    keyboardType="numeric"
    onChangeText={(text) => {
     setAmount(text);
    }}
   />

   <TextInput
    placeholder={params?.index ? selectedItem.description : "Description"}
    style={{ marginBottom: 15 }}
    onChangeText={(text) => {
     setDescription(text);
    }}
   />

   <SegmentedControl
    values={["Expense", "Income"]}
    style={{ marginBottom: 15 }}
    selectedIndex={params?.index ? selected.index : 0}
    onChange={(event) => {
     setSelected({
      index: event.nativeEvent.selectedSegmentIndex,
      type: event.nativeEvent.value,
     });
     const filteredList = items.filter((item) => {
      return item.type === event.nativeEvent.value;
     });
     setCategories(filteredList);
    }}
   />

   {categories.map((cat) => (
    <CategoryButton
     key={cat.name}
     id={cat.id}
     title={cat.name}
     isSelected={
      !typeSelected
       ? getID(selectedItem?.category_id, categories)?.name === cat.name
       : typeSelected === cat.name
     }
     setTypeSelected={setTypeSelected}
     setCategoryId={setCategoryId}
    />
   ))}
  </View>
 );
}
