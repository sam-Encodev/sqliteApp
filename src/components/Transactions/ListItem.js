import dayjs from "dayjs";
import {
  typeColor,
  iconType,
  categoryForCurrentItem,
} from "../../utils/constants";
import { AntDesign } from "@expo/vector-icons";
import relativeTime from "dayjs/plugin/relativeTime";
import { StyleSheet, Text, View } from "react-native";
import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";

export default function ListItem({ transaction }) {
  dayjs.extend(relativeTime);
  return (
    <View style={styles.row}>
      <View style={{ width: "40%", gap: 3 }}>
        <Amount
          amount={transaction.amount}
          color={typeColor(transaction.type)}
          iconName={iconType(transaction.type)}
        />
        <CategoryItem
          categoryColor={categoryForCurrentItem(transaction).color}
          name={categoryForCurrentItem(transaction).name}
          emoji={categoryForCurrentItem(transaction).emoji}
        />
      </View>
      <TransactionInfo
        date={transaction.date}
        description={transaction.description}
        id={transaction.id}
      />
    </View>
  );
}

function TransactionInfo({ id, date, description }) {
  return (
    <View style={{ flexGrow: 1, gap: 3, flexShrink: 1 }}>
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>{description}</Text>
      <Text>Transaction number {id}</Text>
      <Text style={{ fontSize: 12, color: "gray" }}>
        {/* {new Date(date * 1000).toLocaleDateString(options)} */}
        {dayjs(date).fromNow()}
      </Text>
    </View>
  );
}

function CategoryItem({ categoryColor, name, emoji }) {
  return (
    <View
      style={[
        styles.categoryContainer,
        { backgroundColor: categoryColor + "40" },
      ]}
    >
      <Text style={styles.categoryText}>
        {emoji} {name}
      </Text>
    </View>
  );
}

function Amount({ iconName, color, amount }) {
  return (
    <View style={styles.row_amount}>
      <AntDesign name={iconName} size={12} color={color} />
      <AutoSizeText
        fontSize={30}
        mode={ResizeTextMode.max_lines}
        numberOfLines={1}
        style={[styles.amount, { maxWidth: "80%" }]}
      >
        ${amount}
      </AutoSizeText>
    </View>
  );
}

const styles = StyleSheet.create({
  amount: {
    fontSize: 30,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    padding: 15,
    borderRadius: 15,
    backgroundColor: "white",
    elevation: 8,
    shadowColor: "#000",
    shadowRadius: 8,
    shadowOffset: { height: 6, width: 0 },
    shadowOpacity: 0.15,
  },
  row_amount: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  categoryContainer: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 3,
    alignSelf: "flex-start",
  },
  categoryText: {
    fontSize: 12,
  },
});
