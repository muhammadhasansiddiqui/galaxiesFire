import {
    View,
    Text,
    TextInput,
    ActivityIndicator,
    Button,
    Alert,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
  } from 'react-native';
  import React, { useState } from 'react';
  import { FIREBASE_AUTH } from '../../FireBase.config';
  import { useNavigation } from '@react-navigation/native';

  
  import {
    Auth,
    signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
    createUserWithEmailAndPassword as firebaseCreateUserWithEmailAndPassword,
  } from 'firebase/auth';
  
  // Alias functions
  function signInWithEmailAndPassword(auth: Auth, email: string, password: string) {
    return firebaseSignInWithEmailAndPassword(auth, email, password);
  }
  
  function createUserWithEmailAndPassword(auth: Auth, email: string, password: string) {
    return firebaseCreateUserWithEmailAndPassword(auth, email, password);
  }
  
  const Signup = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;
        const router = useNavigation();
    
  
    const signup = async () => {
      setLoading(true);
      try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        console.log('✅ Signed Up:', response.user.email);
        Alert.alert('Account Created 🎉', 'You can now log in!');
        navigation.navigate('signin');
      } catch (error: any) {
        Alert.alert('Signup Failed', error.message || 'Something went wrong');
        console.error('Signup Error:', error);
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
          <Text style={{ fontSize: 22, textAlign: 'center', marginBottom: 20 }}>Sign Up</Text>
  
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
              <Button title="Sign up" onPress={signup} />
              <View style={{ height: 10 }} />
              <Text style={{ textAlign: 'center', marginVertical: 10 }}>
                Already have an account?{' '}
                <Text style={{ color: 'blue' }} onPress={() => router.navigate('Login')}>
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
  