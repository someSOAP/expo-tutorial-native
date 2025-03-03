import { EventSubscription } from "expo-modules-core";
import ExpoTutorialNative from "expo-tutorial-native";
import { useRef, useState } from "react";
import {
  Button,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

export default function App() {
  const [connected, setConnected] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const eventRef = useRef<EventSubscription | null>(null);

  const handleConnect = () => {
    ExpoTutorialNative.connect("ws://192.168.1.3:8082")
      .then(() => {
        setConnected(true);
        eventRef.current = ExpoTutorialNative.addListener(
          "onMessage",
          (params) => {
            setMessages((v) => [params.message, ...v]);
          },
        );
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleDisconnect = () => {
    ExpoTutorialNative.disconnect();
    eventRef.current?.remove();
    eventRef.current = null;
    setConnected(false);
  };

  const handleSend = () => {
    ExpoTutorialNative.send(input)
      .then(() => {
        console.log("Sent");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Expo Modules Tutorial</Text>
        <Group name="Events">
          <View style={{ gap: 15 }}>
            {!connected && <Button title="Connect" onPress={handleConnect} />}
            {connected && (
              <TextInput placeholder="Message" onChangeText={setInput} />
            )}
            {connected && <Button title="Send" onPress={handleSend} />}
            {connected && (
              <Button title="Disconnect" onPress={handleDisconnect} />
            )}
          </View>
        </Group>
        <Group name="Messages">
          {messages.map((message, i) => (
            <Text key={i}>{message}</Text>
          ))}
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
