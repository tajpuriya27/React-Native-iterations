import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { userDefCol } from "../../constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import tempData from "../../assets/data/tempData";
import TodoList from "../../components/TodoList";
import AddListModal from "@/components/AddListModal";

export default function HomeScreen() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [lists, setLists] = useState(tempData);
  const toggleModel = () => {
    setModalVisible(!isModalVisible);
  };

  const addList = (list: any) => {
    setLists([...lists, { ...list, id: lists.length + 1, todos: [] }]);
  };

  const updateList = (list: any) => {
    setLists(
      lists.map((item) => {
        return item.id === list.id ? list : item;
      })
    );
  };
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={() => {
          setModalVisible(!isModalVisible);
        }}
      >
        <AddListModal
          closeModel={() => {
            toggleModel();
          }}
          addList={addList}
        />
      </Modal>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.divider} />
        <Text style={styles.title}>
          Todo
          <Text style={{ color: userDefCol.blue, fontWeight: 300 }}>Lists</Text>
        </Text>
        <View style={styles.divider} />
      </View>
      <View style={{ marginVertical: 48 }}>
        <TouchableOpacity
          style={styles.addList}
          onPress={() => {
            setModalVisible(!isModalVisible);
          }}
        >
          <AntDesign name="plus" size={16} color={userDefCol.blue} />
        </TouchableOpacity>

        <Text style={styles.add}>Add List</Text>
      </View>
      <View style={{ height: 275, paddingLeft: 32 }}>
        <FlatList
          data={lists}
          keyExtractor={(item) => item.name}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TodoList list={item} updateList={updateList} />
          )}
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
