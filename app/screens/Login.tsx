import { 
    View, 
    Text, 
    TextInput, 
    ActivityIndicator, 
    Button, 
    Alert, 
    KeyboardAvoidingView, 
    Platform, 
    StyleSheet 
  } from 'react-native';
  import React, { useState } from 'react';
  import { FIREBASE_AUTH } from '../../FireBase.config';
  import {
    Auth,
    signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
    createUserWithEmailAndPassword as firebaseCreateUserWithEmailAndPassword
  } from 'firebase/auth';
  import {  useNavigation } from '@react-navigation/native';

  
  // Alias functions for clarity
  function signInWithEmailAndPassword(auth: Auth, email: string, password: string) {
    return firebaseSignInWithEmailAndPassword(auth, email, password);
  }
  
  function createUserWithEmailAndPassword(auth: Auth, email: string, password: string) {
    return firebaseCreateUserWithEmailAndPassword(auth, email, password);
  }
  
  const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;
    const router = useNavigation();

    const signIn = async () => {
      setLoading(true);
      try {
        const response = await signInWithEmailAndPassword(auth, email, password);
        console.log('✅ Signed In:', response.user.email);
        Alert.alert('Welcome Back 👋', 'You are now logged in!');
      } catch (error: any) {
        Alert.alert('Login Failed', error.message || 'Something went wrong');
        console.error('Login Error:', error);
      } finally {
        setLoading(false);
      }
    };
  
   
  
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{ flex: 1, justifyContent: 'center' }}
        >

            <Text>
                Login
            </Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            placeholder="Email"
            autoCapitalize="none"
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            placeholder="Password"
            autoCapitalize="none"
            secureTextEntry
          />
  
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <>
              <Button title="Log In" onPress={signIn} />
              <View style={{ height: 10 }} />
              <Text style={{ textAlign: 'center', marginVertical: 10 }}>
  Don't have an account?{' '}
  <Text
    style={{ color: 'blue' }}
    onPress={() => router.navigate('Signup')
    }  // Navigate to the 'Signup' route
  >
    Sign Up
  </Text>
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
      marginHorizontal: 20,
      flex: 1,
      justifyContent: 'center',
    },
    input: {
      marginVertical: 8,
      height: 50,
      borderWidth: 1,
      borderRadius: 4,
      padding: 10,
      backgroundColor: '#fff',
    },
  });
  