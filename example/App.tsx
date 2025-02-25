import ExpoTutorialNative from "expo-tutorial-native";
import { SafeAreaView, ScrollView, Text, View } from "react-native";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Expo Modules Tutorial</Text>
        <Group name="Sync Function Add">
          <Text>Add: {ExpoTutorialNative.add(1, 2)}</Text>
          <Text>Sum: {ExpoTutorialNative.sum([1, 2, 3, 4, 5, 6, 7])}</Text>
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
