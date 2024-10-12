import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { userDefCol } from "../constants/Colors";
import tempData from "../assets/data/tempData";

export default function AddListModal(props: any) {
  const bgColors = [
    "#8022D9",
    "#24A6D9",
    "#D15922",
    "#D92222",
    "#22D94F",
    "#22D9D9",
    "#D922D9",
  ];
  const [compState, setCompState] = React.useState({
    name: "",
    bgColor: bgColors[0],
  });

  const createToDoList = () => {
    const { name, bgColor } = compState;
    const list = { name, color: bgColor };
    props.addList(list);
    setCompState({ name: "", bgColor: bgColors[0] });
    props.closeModel();
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <TouchableOpacity
        style={{ position: "absolute", top: 64, right: 32 }}
        onPress={props.closeModel}
      >
        <AntDesign name="close" size={24} color={userDefCol.black} />
      </TouchableOpacity>
      <View style={{ alignSelf: "stretch", marginHorizontal: 32 }}>
        <Text style={styles.title}>Create Todo List</Text>
        <TextInput
          style={styles.input}
          placeholder="List Name?"
          onChangeText={(text) => setCompState({ ...compState, name: text })}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 12,
          }}
        >
          {bgColors.map((color) => (
            <TouchableOpacity
              key={color}
              style={[styles.colorSelect, { backgroundColor: color }]}
              onPress={() => setCompState({ ...compState, bgColor: color })}
            />
          ))}
        </View>
        <TouchableOpacity
          style={[styles.create, { backgroundColor: compState.bgColor }]}
          onPress={createToDoList}
        >
          <Text style={{ color: userDefCol.white, fontWeight: "600" }}>
            Create!
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: userDefCol.black,
    alignSelf: "center",
    marginBottom: 16,
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: userDefCol.blue,
    borderRadius: 6,
    height: 50,
    marginTop: 8,
    paddingHorizontal: 16,
    fontSize: 18,
  },
  create: {
    marginTop: 24,
    height: 50,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  colorSelect: {
    width: 30,
    height: 30,
    borderRadius: 4,
  },
});
