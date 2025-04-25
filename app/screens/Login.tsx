import React, { useState } from 'react';
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
} from 'react-native';
import { Link } from 'expo-router';

import { useNavigation } from '@react-navigation/native';
import {
  Auth,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
} from 'firebase/auth';
import { FIREBASE_AUTH } from '../../FireBase.config';

function signInWithEmailAndPassword(auth: Auth, email: string, password: string) {
  return firebaseSignInWithEmailAndPassword(auth, email, password);
}

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;
  const navigation = useNavigation();

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      // console.log('✅ Signed In:', response.user.email);
      Alert.alert('Welcome Back 👋', 'You are now logged in!');
      // You can navigate to your home/chat screen here
    } catch (error: any) {
      Alert.alert('Login Failed', error.message || 'Something went wrong');
      // console.error('Login Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    Alert.alert('Google Login', 'Coming soon...');
  };

  const handleFbLogin = () => {
    Alert.alert('Facebook Login', 'Coming soon...');
  };

  const handleSMSLogin = () => {
    Alert.alert('Sms Login', 'Coming soon...');
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1, justifyContent: 'center' }}
      >
        <Text style={styles.title}>Log in to your account ✨</Text>

{/* lable */}
        <Text  style={{ color: '#fff', marginBottom: 8, marginLeft: 8 }}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          placeholder="Enter Your Email"
          placeholderTextColor="#aaa"
          autoCapitalize="none"
        />

        <Text  style={{ color: '#fff', marginBottom: 8, marginLeft: 8 }}>Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          placeholder="Enter Your Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          autoCapitalize="none"
        />

        {loading ? (
          <ActivityIndicator size="large" color="#ff416c" />
        ) : (
          <>
            <TouchableOpacity style={styles.loginBtn} onPress={signIn}>
              <Text style={styles.loginText}>Log In</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialBtn} onPress={handleGoogleLogin}>
              <Image source={require('../../assets/googlelogo.png')} style={styles.icon} />
              <Text style={styles.socialText}>Sign in with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialBtn} onPress={handleFbLogin}>
              <Image source={require('../../assets/facebook-icon.png')} style={styles.icon} />
              <Text style={styles.socialText}>Sign in with Facebook</Text>
            </TouchableOpacity>

            <Text style={styles.switchText}>
              Don't have an account?{' '}
              <TouchableOpacity onPress={() => navigation.navigate('Signup' as never)}>
  <Text style={styles.linkText}>Sign Up</Text>
</TouchableOpacity>

            </Text>
          </>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 24,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#1e1e1e',
    color: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderColor: '#333',
    borderWidth: 1,
  },
  loginBtn: {
    backgroundColor: '#ff416c',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  loginText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  socialBtn: {
    backgroundColor: '#111',
    borderWidth: 1,
    borderColor: '#333',
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  socialText: {
    color: "#fff",
    fontWeight: "bold",
  },
  switchText: {
    color: '#aaa',
    textAlign: 'center',
    marginTop: 20,
  },
  linkText: {
    color: '#ff416c',
    textDecorationLine: 'underline',
  },
});
