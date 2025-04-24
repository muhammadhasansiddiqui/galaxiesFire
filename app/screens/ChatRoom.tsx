import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  StatusBar
} from "react-native";
import { SafeAreaView } from 'react-native';


import { FIREBASE_AUTH, FIREBASE_DB } from "../../FireBase.config";
import useMessages from "../../utils/useMessages";
import sendMessage from "../../utils/sendMessage";
import Icon from "react-native-vector-icons/MaterialIcons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import IonIcon from "react-native-vector-icons/Ionicons";
import { onAuthStateChanged } from "firebase/auth";

const STATUS_BAR_HEIGHT = Platform.OS === 'android' ? StatusBar.currentHeight : 44;

const GroupChatComponent = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState<any>(null);
  const [isScrolledUp, setIsScrolledUp] = useState(false);
  const messages = useMessages();
  const scrollViewRef = useRef<ScrollView>(null);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (authUser) => {
      setUser(authUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const handleSend = async () => {
    if (message.trim() && user) {
      const currentMessage = message;
      setMessage("");
      await sendMessage(currentMessage, user);
    }
  };

  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  const handleLogout = async () => {
    try {
      await FIREBASE_AUTH.signOut();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <View style={styles.container}>
      {user ? (
        <View style={styles.chatContainer}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Group Chat</Text>
            <View style={styles.headerIcons}>
              <Icon name="call" size={20} color="white" />
              <Icon name="videocam" size={24} color="white" />
              {/* <FontAwesomeIcon name="smile-o" size={20} color="white" /> */}
              <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
                <IonIcon name="ellipsis-vertical" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
          {menuVisible && (
  <View style={styles.menuContainer}>
    <TouchableOpacity onPress={handleLogout} style={styles.menuItem}>
      <Text style={styles.menuText}>Logout</Text>
    </TouchableOpacity>
  </View>
)}


          <ScrollView
            ref={scrollViewRef}
            onScroll={(event) => {
              const offsetY = event.nativeEvent.contentOffset.y;
              const contentHeight = event.nativeEvent.contentSize.height;
              const layoutHeight = event.nativeEvent.layoutMeasurement.height;
              setIsScrolledUp(contentHeight - (offsetY + layoutHeight) > 100);
            }}
            style={styles.messages}
          >
            {messages.map(
              ({
                id,
                text,
                senderId,
                sender,
                senderEmail,
                senderPhoto,
                timestamp,
              }) => {
                const isCurrentUser = senderId === user?.uid;
                const userImage = isCurrentUser
                  ? user?.photoURL
                  : senderPhoto && senderPhoto !== "undefined"
                  ? senderPhoto
                  : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      sender || senderEmail?.split("@")[0] || "User"
                    )}&background=random&color=fff`;

                return (
                  <View
                    key={id}
                    style={[
                      styles.messageContainer,
                      isCurrentUser ? styles.alignRight : styles.alignLeft,
                    ]}
                  >
                    {!isCurrentUser && (
                      <Image
                        source={{ uri: userImage }}
                        style={styles.avatar}
                      />
                    )}
                    <View
                      style={[
                        styles.messageBubble,
                        isCurrentUser
                          ? styles.userMessage
                          : styles.otherMessage,
                      ]}
                    >
                      <Text style={styles.senderName}>
                        {isCurrentUser
                          ? "You"
                          : sender || senderEmail?.split("@")[0]}
                      </Text>
                      <Text style={styles.messageText}>{text}</Text>
                      {timestamp?.seconds && (
                        <Text style={styles.timestamp}>
                          {new Date(
                            timestamp.seconds * 1000
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </Text>
                      )}
                    </View>
                  </View>
                );
              }
            )}
          </ScrollView>

          {isScrolledUp && (
            <TouchableOpacity
              onPress={scrollToBottom}
              style={styles.scrollDownButton}
            >
              <IonIcon name="arrow-down" size={24} color="white" />
            </TouchableOpacity>
          )}

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            keyboardVerticalOffset={80}
          >
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Type your message..."
                placeholderTextColor="#999"
                value={message}
                onChangeText={setMessage}
                onSubmitEditing={handleSend}
                style={styles.input}
              />
              <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
                <Icon name="send" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      ) : (
        <View style={styles.loginPrompt}>
          <Text style={{ color: "white" }}>
            Please login or signup to join the chat.
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black"  , paddingTop: STATUS_BAR_HEIGHT },
  chatContainer: { flex: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#111",
    borderBottomWidth: 1,
    borderColor: "#333",
  },
  headerTitle: { fontSize: 18, color: "white", fontWeight: "bold" },
  headerIcons: { flexDirection: "row", gap: 12 },
  messages: { flex: 1, padding: 12 },
  messageContainer: { flexDirection: "row", marginVertical: 6 },
  alignRight: { justifyContent: "flex-end" },
  alignLeft: { justifyContent: "flex-start" },
  avatar: { width: 32, height: 32, borderRadius: 16, marginRight: 8 },
  messageBubble: { padding: 10, borderRadius: 8, maxWidth: "80%" },
  userMessage: { backgroundColor: "#2e7d32", alignSelf: "flex-end" },
  otherMessage: { backgroundColor: "#333", alignSelf: "flex-start" },
  senderName: { fontSize: 12, color: "#bbb" },
  messageText: { color: "white" },
  timestamp: { fontSize: 10, color: "#888", alignSelf: "flex-end" },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#333",
  },
  input: {
    flex: 1,
    backgroundColor: "#222",
    color: "white",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: "#ff416c",
    padding: 10,
    borderRadius: 8,
  },
  scrollDownButton: {
    position: "absolute",
    bottom: 80,
    right: 20,
    backgroundColor: "#444",
    padding: 10,
    borderRadius: 30,
  },
  loginPrompt: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  menuContainer: {
    position: "absolute",
    top: 60,
    right: 16,
    backgroundColor: "#222",
    borderRadius: 8,
    padding: 10,
    zIndex: 999,
    elevation: 5,
  },
  menuItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  menuText: {
    color: "white",
  },
});

export default GroupChatComponent;
