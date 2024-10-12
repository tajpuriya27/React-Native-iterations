import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import TodoModal from "./TodoModal";

export default function TodoList({ list, updateList }: { list: any }) {
  const countCompleted = list.todos.filter(
    (todo: any) => todo.completed
  ).length;
  const countRemaining = list.todos.length - countCompleted;
  const [isListVisible, setIsListVisible] = React.useState(false);

  const toggleListVisible = () => {
    setIsListVisible(!isListVisible);
  };

  return (
    <View>
      <Modal
        animationType="slide"
        visible={isListVisible}
        onRequestClose={() => toggleListVisible()}
        presentationStyle="formSheet"
      >
        <TodoModal
          list={list}
          closeModel={() => toggleListVisible()}
          updateList={updateList}
        />
      </Modal>

      <TouchableOpacity
        style={[styles.listContainer, { backgroundColor: list.color }]}
        onPress={toggleListVisible}
      >
        <Text style={styles.listTitle} numberOfLines={1}>
          {list.name}
        </Text>
        <View style={{ alignItems: "center" }}>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.count}>{countRemaining}</Text>
            <Text style={styles.subTitle}>Remaining</Text>
          </View>

          <View style={{ alignItems: "center" }}>
            <Text style={styles.count}>{countCompleted}</Text>
            <Text style={styles.subTitle}>Completed</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginHorizontal: 12,
    alignItems: "center",
    width: 200,
  },
  listTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "white",
    marginBottom: 18,
  },
  count: {
    fontSize: 48,
    fontWeight: "200",
    color: "white",
  },
  subTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "white",
  },
});
