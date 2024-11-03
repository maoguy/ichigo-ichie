import {View,Text,Button,TextInput,StyleSheet} from 'react-native';
import { useState,useRef, useEffect } from "react";
import {
  useChatInteract,
  useChatMessages,
  IStep
} from "@chainlit/react-client";

const Playground = () => {
  const [inputValue, setInputValue] = useState<string>("");

  const { sendMessage } = useChatInteract();
  const { messages } = useChatMessages();

  const handleSendMessage = () => {
    const content = inputValue.trim();
    if(content){
      const message = {
        name: "user",
        type: "user_message" as const,
        output: content,
      };
      sendMessage(message,[]);
      setInputValue("");
    }
  };

  const renderMessage = (message:IStep) => {
    return (
      <View
        key={message.id}
        style={styles.messageCard}
      >
        {JSON.stringify(message)}
      </View>
    );
  }

  return (
    <View>
      <Text>
        Playground
        {JSON.stringify(messages)}
      </Text>
      {
        messages.map((message)=>renderMessage(message))
      }
      <hr/>
      <TextInput
        style={styles.input}
        onChangeText={setInputValue}
        value={inputValue}
      />
      <Button
        onPress={handleSendMessage}
        title={"Send Message"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  messageCard: {
    margin: 12,
    borderWidth: 1,
    padding: 10,
  }
});

export {Playground};