import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './app/screens/Login';
import Details from './app/screens/Details';
import List from './app/screens/ChatRoom';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { FIREBASE_AUTH } from './FireBase.config';
import Signup from './app/screens/Signup';

const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();
function Inside() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen 
      name="ChatRoom" 
      component={List} 
      options={{ headerShown: false, title: 'Chat Room' }} 
      />
      {/* <InsideStack.Screen name="Details" component={Details} /> */}
    </InsideStack.Navigator>
  );
}


export default function App() {
  const  [user , setUser] = useState<User | null >(null);

useEffect(() => {
 onAuthStateChanged(FIREBASE_AUTH ,(user) =>{
  console.log("🚀 ~ onAuthStateChanged ~ user:", user);
  setUser(user)

  });

}, []);

  return (

<NavigationContainer>
  <Stack.Navigator initialRouteName="Login">
    {user ? (
      <Stack.Screen
        name="Inside"
        component={Inside}
        options={{ headerShown: false }}
      />
    ) : (
      <>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ headerShown: false }}
        />
      </>
    )}
  </Stack.Navigator>
</NavigationContainer>



)}

