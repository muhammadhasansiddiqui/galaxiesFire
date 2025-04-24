import { View, Text, Button } from 'react-native'
import React from 'react'
import { NavigationProp } from '@react-navigation/native'
import { FIREBASE_AUTH } from '../../FireBase.config'


interface RouterProps{
    navigation : NavigationProp<any, any>
}

const List = ({navigation}:any) => {
  return (
    <View style={{flex : 1, justifyContent:"center" ,alignItems:'center'}}>
        <Button title="Go to Details" onPress={() => navigation.navigate('Details')} />
        <View style={{ height: 10 }} /> {/* Spacer instead of <br /> */}
        <Button title="Logout" onPress={() => FIREBASE_AUTH.signOut()} />   
    </View>
  )
}

export default List