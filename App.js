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
import postList from "./components/postList";
import add_edit_post from "./components/add_edit_post";
import postDetails from "./components/postDetails";
import userDetails from "./components/userDetails";
import HomeScreen from "./components/homeScreen";


export default function App() {
  const Stack = createStackNavigator()
  const Tab = createBottomTabNavigator()

// Import the functions you need from the SDKs you need



// Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyA20PDALXFMyIcVjWWmwdC3zhzMebOg9Ys",
        authDomain: "godkendelsesopgave2-6ea69.firebaseapp.com",
        projectId: "godkendelsesopgave2-6ea69",
        storageBucket: "godkendelsesopgave2-6ea69.appspot.com",
        messagingSenderId: "461200022464",
        appId: "1:461200022464:web:b091bdecf68c615167c625",
        databaseURL: "https://godkendelsesopgave2-6ea69-default-rtdb.europe-west1.firebasedatabase.app/"
    };


  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }


// stacks til flere views
  const StackNavigation = () => {
    return(
        <Stack.Navigator>
          <Stack.Screen name={'User List'} component={UserList}/>
          <Stack.Screen name={'User Details'} component={userDetails}/>
          <Stack.Screen name={'Edit user'} component={Add_edit_user}/>
            <Stack.Screen name={'Post List'} component={postList}/>
            <Stack.Screen name={'Post Details'} component={postDetails}/>
            <Stack.Screen name={'Edit post'} component={add_edit_post}/>
        </Stack.Navigator>
    )
  }

  return (
      <NavigationContainer>
        <Tab.Navigator>
          {/* tabs der kan ses i bunden af appen*/}
            <Tab.Screen name={'Start'} component={HomeScreen} options={{tabBarIcon: () => ( <Ionicons name="home" size={20} />)}}/>
          <Tab.Screen name={'Beboere'} component={StackNavigation} options={{tabBarIcon: () => ( <Ionicons name="people-outline" size={20} />),headerShown:null}}/>
          <Tab.Screen name={'Tilføj beboer'} component={add_edit_user} options={{tabBarIcon: () => ( <Ionicons name="person-add-outline" size={20} />)}}/>
            <Tab.Screen name={'Oplagstavle'} component={postList} options={{tabBarIcon: () => ( <Ionicons name="clipboard-outline" size={20} />),headerShown:null}}/>
            <Tab.Screen name={'Tilføj opslag'} component={add_edit_post} options={{tabBarIcon: () => ( <Ionicons name="md-create" size={20} />)}}/>
        </Tab.Navigator>
      </NavigationContainer>
  );
}


