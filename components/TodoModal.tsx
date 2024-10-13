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
  Keyboard,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { userDefCol } from "../constants/Colors";

const RenderTodos = ({ item, toggleCompleted }: any) => {
  return (
    <View style={styles.todoContainer}>
      <TouchableOpacity onPress={toggleCompleted}>
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

export default function TodoModal({ list, closeModel, updateList }: any) {
  const { name, color, todos } = list;
  const countTask = todos.length;
  const countCompleted = todos.filter((todo: any) => todo.completed).length;

  const [newTodo, setNewTodo] = React.useState("");

  const toggleCompleted = (index: number) => {
    todos[index].completed = !todos[index].completed;
    updateList(list);
  };

  const addTodo = () => {
    if (!newTodo) return;
    const newTask = { title: newTodo, completed: false };
    todos.push(newTask);
    updateList(list);
    setNewTodo("");
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
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
            renderItem={({ item, index }) => (
              <RenderTodos
                item={item}
                toggleCompleted={() => toggleCompleted(index)}
              />
            )}
            keyExtractor={(item) => item.title}
            contentContainerStyle={{
              paddingHorizontal: 32,
              paddingVertical: 64,
            }}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <View style={[styles.section, styles.footer]}>
          <TextInput
            style={[styles.input, { borderColor: color }]}
            placeholder="Add Task"
            value={newTodo}
            onChangeText={(text) => setNewTodo(text)}
          />
          <TouchableOpacity
            style={[styles.addTodo, { backgroundColor: color }]}
            onPress={addTodo}
          >
            <AntDesign name="plus" size={16} color={userDefCol.white} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
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
