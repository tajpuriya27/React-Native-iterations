import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { userDefCol } from "../../constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import TodoList from "../../components/TodoList";
import AddListModal from "@/components/AddListModal";
import Fire from "@/firebase.config";

interface todosObj {
  id: string;
  title: string;
  completed: boolean;
}
interface listsObj {
  id: string;
  name: string;
  color: string;
  todos: todosObj[];
}

export default function HomeScreen() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [lists, setLists] = useState<listsObj[]>([]);
  const [user, setUser] = useState<any>({});
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const toggleModel = () => {
    setModalVisible(!isModalVisible);
  };

  let firebase: any;

  // start: Supporting functions //
  const initFirebase = () => {
    try {
      setIsLoading(true);
      firebase = new Fire((error, user) => {
        if (error) {
          return alert("Uh oh, something went wrong");
        }

        firebase.getLists((lists: any) => {
          console.log("lists", lists);
          setLists(lists);
        });
        setUser(user);
      });
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };
  // End: Supporting functions //

  // UseEffects: run on mounting only //
  React.useEffect(() => {
    initFirebase();

    return () => {
      // cleanup
      firebase.detach();
    };
  }, []);

  // Start: Functions //
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
  // End: Functions //

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={userDefCol.blue} />
      </View>
    );
  }
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

      <View>
        <Text>User: {user.uid}</Text>
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
          keyExtractor={(item) => item.id.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TodoList list={item} updateList={updateList} />
          )}
          keyboardShouldPersistTaps="always"
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
