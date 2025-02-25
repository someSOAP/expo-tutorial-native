import ExpoTutorialNative from "expo-tutorial-native";
import { useState } from "react";
import {
  Button,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

export default function App() {
  const [input, setInput] = useState("");
  const [note, setNote] = useState(ExpoTutorialNative.getValue("note"));

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Expo Modules Tutorial</Text>
        <Group name="Sync Function Add">
          <View style={{ gap: 15 }}>
            <Text>{note}</Text>
            <TextInput
              placeholder="Input note..."
              value={input}
              onChangeText={setInput}
            />
            <Button
              title="Save note"
              onPress={() => {
                ExpoTutorialNative.setValue("note", input);
                setInput("");
              }}
            />
            <Button
              title="Refresh note"
              onPress={() => {
                setNote(ExpoTutorialNative.getValue("note"));
              }}
            />
          </View>
        </Group>
      </ScrollView>
    </SafeAreaView>
  );
}

function Group(props: { name: string; children: React.ReactNode }) {
  return (
    <View style={styles.group}>
      <Text style={styles.groupHeader}>{props.name}</Text>
      {props.children}
    </View>
  );
}

const styles = {
  header: {
    fontSize: 30,
    margin: 20,
  },
  groupHeader: {
    fontSize: 20,
    marginBottom: 20,
  },
  group: {
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#eee",
  },
  view: {
    flex: 1,
    height: 200,
  },
};
