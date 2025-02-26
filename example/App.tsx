import ExpoTutorialNative from "expo-tutorial-native";
import { useState } from "react";
import { Button, SafeAreaView, ScrollView, Text, View } from "react-native";

export default function App() {
  const [dialogResponse, setDialogResponse] = useState<boolean | undefined>(
    undefined,
  );
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Expo Modules Tutorial</Text>
        <Group name="Async dialog">
          <View style={{ gap: 15 }}>
            {dialogResponse !== undefined && (
              <Text>{dialogResponse ? "Yes" : "No"}</Text>
            )}
            <Button
              title="Dialog"
              onPress={() => {
                ExpoTutorialNative.dialog({
                  title: "Confirm",
                  message: "Are you sure?",
                })
                  .then((value) => {
                    setDialogResponse(value);
                  })
                  .catch((err) => {
                    console.error(err);
                  });
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
