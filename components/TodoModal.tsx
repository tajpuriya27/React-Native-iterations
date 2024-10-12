import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  FlatList,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { userDefCol } from "../constants/Colors";

const RenderTodos = ({ item }) => {
  return (
    <View style={styles.todoContainer}>
      <TouchableOpacity>
        <Ionicons
          name={item.completed ? "checkbox" : "square-outline"}
          size={24}
          color={userDefCol.gray}
          style={{ width: 32 }}
        />
      </TouchableOpacity>
      <Text
        style={[
          styles.todo,
          {
            color: userDefCol.black,
            textDecorationLine: item.completed ? "line-through" : "none",
          },
        ]}
      >
        {item.title}
      </Text>
    </View>
  );
};

export default function TodoModal({
  list,
  closeModel,
}: {
  list: any;
  closeModel: any;
}) {
  const { name, color, todos } = list;
  const countTask = todos.length;
  const countCompleted = todos.filter((todo: any) => todo.completed).length;
  const countRemaining = countTask - countCompleted;

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={{ position: "absolute", top: 64, right: 32, zIndex: 10 }}
        onPress={closeModel}
      >
        <AntDesign name="close" size={24} color={userDefCol.black} />
      </TouchableOpacity>

      <View
        style={[styles.section, styles.header, { borderBottomColor: color }]}
      >
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.taskCount}>
          {countCompleted} of {countTask} tasks
        </Text>
      </View>

      <View style={[styles.section, { flex: 3 }]}>
        <FlatList
          data={todos}
          renderItem={({ item }) => <RenderTodos item={item} />}
          keyExtractor={(item) => item.title}
          contentContainerStyle={{ paddingHorizontal: 32, paddingVertical: 64 }}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <KeyboardAvoidingView
        style={[styles.section, styles.footer]}
        behavior="padding"
      >
        <TextInput
          style={[styles.input, { borderColor: color }]}
          placeholder="Add Task"
        />
        <TouchableOpacity style={[styles.addTodo, { backgroundColor: color }]}>
          <AntDesign name="plus" size={16} color={userDefCol.white} />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    flex: 1,
    alignSelf: "stretch",
  },
  header: {
    justifyContent: "flex-end",
    marginLeft: 64,
    borderBottomWidth: 3,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: userDefCol.black,
  },
  taskCount: {
    marginTop: 4,
    marginBottom: 16,
    color: userDefCol.gray,
    fontWeight: "600",
  },
  footer: {
    paddingHorizontal: 32,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 6,
    marginRight: 8,
    paddingHorizontal: 8,
  },
  addTodo: {
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  todoContainer: {
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  todo: {
    fontWeight: "700",
    fontSize: 16,
  },
});
