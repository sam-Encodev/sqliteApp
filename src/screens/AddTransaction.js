import React from "react";
import { db } from "../../db";
import { store } from "../store";
import { transaction } from "../../db/schema";
import HeaderButton from "../components/HeaderButton";
import CategoryButton from "../components/CategoryButton";
import { View, Text, TextInput, Alert } from "react-native";
import { categories as items, numericValue, types } from "../utils/constants";
import SegmentedControl from "@react-native-segmented-control/segmented-control";

export default function AddTransaction({ route, navigation }) {
 const selectedItem = store((state) => state.selectedItem);
 const setSelectedItem = store((state) => state.setSelectedItem);

 console.log({ selectedItem: selectedItem.amount });
 const { params } = route;
 console.log(params?.index);

 const [selected, setSelected] = React.useState({
  index: 0,
  type: types[0].name,
 });

 const [categories, setCategories] = React.useState([]);
 const [amount, setAmount] = React.useState(String(selectedItem?.amount) || "");
 const [categoryId, setCategoryId] = React.useState(
  selectedItem.category_id || null,
 );
 const [description, setDescription] = React.useState(
  selectedItem.description || "",
 );
 const [typeSelected, setTypeSelected] = React.useState(
  selectedItem.type || "",
 );

 const addTransaction = async (selected, categoryId) => {
  if (
   amount === "" ||
   Number.isNaN(amount) ||
   !categoryId ||
   !description === "" ||
   !selected.type
  ) {
   Alert.alert("Please fill all fields");
   return;
  }

  await db.insert(transaction).values({
   amount: Number(amount),
   description: description,
   category_id: categoryId,
   type: selected.type,
  });

  navigation.goBack();
 };

 const updateTransaction = async (selected, categoryId) => {
  if (
   amount === "" ||
   Number.isNaN(amount) ||
   !categoryId ||
   !description === "" ||
   !selected.type
  ) {
   Alert.alert("Please fill all fields");
   return;
  }

  await db.insert(transaction).values({
   amount: Number(amount),
   description: description,
   category_id: categoryId,
   type: selected.type,
  });

  navigation.goBack();
 };

 // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
 React.useEffect(() => {
  setSelectedItem();

  navigation.setOptions({
   headerTitle: params?.index ? "Edit Transaction" : "Add Transaction",
   headerRight: () => (
    <HeaderButton
     title={params?.index ? "Update" : "Save"}
     onPress={() =>
      params?.index
       ? updateTransaction(selected, categoryId)
       : addTransaction(selected, categoryId)
     }
    />
   ),
  });
  getExpenseType();
 }, [navigation, selected, categoryId]);

 async function getExpenseType() {
  const selectedType = selected.index === 0 ? "Expense" : "Income";
  const filteredList = items.filter((item) => {
   return item.type === selectedType;
  });
  setCategories(filteredList);
 }

 return (
  <View style={{ flex: 1, padding: 15 }}>
   <TextInput
    value={amount}
    placeholder="$Amount"
    style={{ fontSize: 32, marginBottom: 15, fontWeight: "bold" }}
    keyboardType="numeric"
    onChangeText={(text) => {
     setAmount(numericValue(text));
    }}
   />
   <TextInput
    value={description}
    placeholder="Description"
    style={{ marginBottom: 15 }}
    onChangeText={setDescription}
   />
   <Text style={{ marginBottom: 6 }}>Select a entry type</Text>
   <SegmentedControl
    values={["Expense", "Income"]}
    style={{ marginBottom: 15 }}
    selectedIndex={selected.index}
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
    // onValueChange={(event) => {
    //   const filteredList = items.filter((item) => {
    //     return item.type === event;
    //   });
    //   setCategories(filteredList);
    //   console.log(filteredList);
    //   console.log(event);
    // }}
   />

   {categories.map((cat) => (
    <CategoryButton
     key={cat.name}
     id={cat.id}
     title={cat.name}
     isSelected={typeSelected === cat.name}
     setTypeSelected={setTypeSelected}
     setCategoryId={setCategoryId}
    />
   ))}
  </View>
 );
}
