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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  Auth,
  createUserWithEmailAndPassword as firebaseCreateUserWithEmailAndPassword,
} from 'firebase/auth';
import { FIREBASE_AUTH } from '../../FireBase.config';
import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
// import { auth, googleProvider, facebookProvider } from '../../utils/firebase'; // Ensure these are exported

function createUserWithEmailAndPassword(auth: Auth, email: string, password: string) {
  return firebaseCreateUserWithEmailAndPassword(auth, email, password);
}

const Signup = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const signup = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log('✅ Signed Up:', response.user.email);
      Alert.alert('Account Created 🎉', 'You can now log in!');
      navigation.navigate('Login'); // Go to login screen after signup
    } catch (error: any) {
      Alert.alert('Signup Failed', error.message || 'Something went wrong');
      console.error('Signup Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    Alert.alert('Google Login', 'Coming soon...');
 
  };

  const handleFacebookLogin = async () => {
       Alert.alert('Fb Login', 'Coming soon...');
   
  };

  const handlePhoneLogin = () => {
    // Placeholder for SMS login logic (can be customized later)
    Alert.alert('SMS Login', 'SMS login coming soon...');
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1, justifyContent: 'center' }}
      >
        <Text style={styles.title}>Create an account ✨</Text>

        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          autoCapitalize="none"
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          placeholder="Password"
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
            <TouchableOpacity style={styles.socialBtn} onPress={handleGoogleLogin}>
              <Text style={styles.socialBtnText}>Sign up with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialBtn} onPress={handleFacebookLogin}>
              <Text style={styles.socialBtnText}>Sign up with Facebook</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialBtn} onPress={handlePhoneLogin}>
              <Text style={styles.socialBtnText}>Sign up with SMS</Text>
            </TouchableOpacity>

            <Text style={styles.switchText}>
              Already have an account?{' '}
              <Text style={styles.linkText} onPress={() => navigation.navigate('Login')}>
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
  signupBtn: {
    backgroundColor: '#ff416c',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  signupText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  socialBtn: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  socialBtnText: {
    color: '#fff',
    fontWeight: 'bold',
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
