import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { userDefCol } from "../../constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import tempData from "../../assets/data/tempData";
import TodoList from "../../components/TodoList";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.divider} />
        <Text style={styles.title}>
          Todo
          <Text style={{ color: userDefCol.blue, fontWeight: 300 }}>Lists</Text>
        </Text>
        <View style={styles.divider} />
      </View>
      <View style={{ marginVertical: 48 }}>
        <TouchableOpacity style={styles.addList}>
          <AntDesign name="plus" size={16} color={userDefCol.blue} />
        </TouchableOpacity>

        <Text style={styles.add}>Add List</Text>
      </View>
      <View style={{ height: 275, paddingLeft: 32 }}>
        <FlatList
          data={tempData}
          keyExtractor={(item) => item.name}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <TodoList list={item} />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    height: 1,
    flex: 1,
    alignSelf: "center",
    backgroundColor: userDefCol.lightBlue,
  },
  title: {
    fontSize: 38,
    fontWeight: "800",
    color: userDefCol.black,
    paddingHorizontal: 64,
  },
  addList: {
    borderWidth: 2,
    borderColor: userDefCol.lightBlue,
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  add: {
    color: userDefCol.blue,
    fontWeight: "600",
    fontSize: 14,
    marginTop: 8,
  },
});
