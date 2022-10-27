import React, {useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import firebase from "firebase/compat";
import Add_edit_user from "./components/add_edit_user";
import {createStackNavigator} from "@react-navigation/stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import add_edit_user from "./components/add_edit_user";
import {NavigationContainer} from "@react-navigation/native";
import UserList from "./components/userList";
import Ionicons from "react-native-vector-icons/Ionicons";
import UserDetails from "./components/userDetails";


export default function App() {
  const Stack = createStackNavigator()
  const Tab = createBottomTabNavigator()

// Import the functions you need from the SDKs you need



// Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCtRBk1CNFOD9aZUC5mArHdDc0b68uaJ3o",
    authDomain: "godkendelsesopgave1-a1c57.firebaseapp.com",
    databaseURL:"https://godkendelsesopgave1-a1c57-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "godkendelsesopgave1-a1c57",
    storageBucket: "godkendelsesopgave1-a1c57.appspot.com",
    messagingSenderId: "118450841898",
    appId: "1:118450841898:web:1ecddbcd3b21477e48d653"
  };



  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }


// stacks til flere views
  const StackNavigation = () => {
    return(
        <Stack.Navigator>
          <Stack.Screen name={'User List'} component={UserList}/>
          <Stack.Screen name={'User Details'} component={UserDetails}/>
          <Stack.Screen name={'Edit user'} component={Add_edit_user}/>
        </Stack.Navigator>
    )
  }

  return (
      <NavigationContainer>
        <Tab.Navigator>
          {/* tabs der kan ses i bunden af appen*/}
          <Tab.Screen name={'Hjem'} component={StackNavigation} options={{tabBarIcon: () => ( <Ionicons name="home" size={20} />),headerShown:null}}/>
          <Tab.Screen name={'Tilføj bruger'} component={add_edit_user} options={{tabBarIcon: () => ( <Ionicons name="add" size={20} />)}}/>
        </Tab.Navigator>
      </NavigationContainer>
  );
}


