import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
  Linking,
} from "react-native";
import { Link, useNavigation } from "@react-navigation/native";
import {
  Auth,
  createUserWithEmailAndPassword as firebaseCreateUserWithEmailAndPassword,
} from "firebase/auth";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../FireBase.config";
import { doc, setDoc } from "firebase/firestore";

import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
// import { auth, googleProvider, facebookProvider } from '../../utils/firebase'; // Ensure these are exported

function createUserWithEmailAndPassword(
  auth: Auth,
  email: string,
  password: string
) {
  return firebaseCreateUserWithEmailAndPassword(auth, email, password);
}

export const Signup = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const signup = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // console.log("✅ Signed Up:", response.user.email);

      const userDocRef = doc(FIREBASE_DB, "users", response.user.uid);
      // console.log("🧾 Document Ref:", userDocRef.path);

      await setDoc(userDocRef, {
        uid: response.user.uid,
        name: email.split("@")[0],
        email: response.user.email,
        createdAt: new Date(),
      });

      // console.log("✅ Firestore Save Success");
      Linking.openURL("Login");
      // navigation.navigate('Login');
    } catch (error: any) {
      console.error("❌ Firestore Error:", error.message);
      Alert.alert("Signup Failed", error.message || "Something went wrong");
    }
  };

  const handleGoogleLogin = async () => {
    Alert.alert("Google Login", "Coming soon...");
  };

  const handleFacebookLogin = async () => {
    Alert.alert("Fb Login", "Coming soon...");
  };

  const handlePhoneLogin = () => {
    // Placeholder for SMS login logic (can be customized later)
    Alert.alert("SMS Login", "SMS login coming soon...");
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1, justifyContent: "center" }}
      >
        <Text style={styles.title}>Create an account ✨</Text>
        {/* lable */}
        <Text style={{ color: "#fff", marginBottom: 8, marginLeft: 8 }}>
          Email
        </Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          placeholder="Enter Your Email"
          placeholderTextColor="#aaa"
          autoCapitalize="none"
        />
        <Text style={{ color: "#fff", marginBottom: 8, marginLeft: 8 }}>
          Password
        </Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          placeholder="Enter Your Password"
          placeholderTextColor="#aaa"
          autoCapitalize="none"
          secureTextEntry
        />

        {loading ? (
          <ActivityIndicator size="large" color="#ff416c" />
        ) : (
          <>
            <TouchableOpacity style={styles.signupBtn} onPress={signup}>
              <Text style={styles.signupText}>Sign Up</Text>
            </TouchableOpacity>

            {/* Social Login Buttons */}
            <TouchableOpacity
              style={styles.socialBtn}
              onPress={handleGoogleLogin}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={require("../../assets/google-logo.png")}
                  style={styles.icon}
                />
                <Text style={styles.socialBtnText}>Sign up with Google</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialBtn}
              onPress={handleFacebookLogin}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={require("../../assets/facebook-icon.png")}
                  style={styles.icon}
                />
                <Text style={styles.socialBtnText}>Sign up with Facebook</Text>
              </View>
            </TouchableOpacity>

            <Text style={styles.switchText}>
              Already have an account?{" "}
              <Text
                style={styles.linkText}
                onPress={() => navigation.navigate('Login' as never)}
              >
                Log in
              </Text>
            </Text>
          </>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 24,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
    backgroundColor: "#1e1e1e",
    color: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderColor: "#333",
    borderWidth: 1,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  signupBtn: {
    backgroundColor: "#ff416c",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  signupText: {
    color: "#fff",
    fontWeight: "bold",
  },
  socialBtn: {
    // backgroundColor: "#333",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  socialBtnText: {
    color: "#fff",
    fontWeight: "bold",
  },
  switchText: {
    color: "#aaa",
    textAlign: "center",
    marginTop: 20,
  },
  linkText: {
    color: "#ff416c",
    textDecorationLine: "underline",
  },
});
