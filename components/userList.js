import * as React from 'react';
import { Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import firebase from 'firebase/compat';
import {useEffect, useState} from "react";

// component til at vise liste af users
const UserList = ({navigation}) => {

    // bruger usestate til at definere objektets initial state
    const [users, setUsers] = useState()


    useEffect(() => {
        if(!users) {
            firebase.database().ref('/Users').on("value", snapshot => {
                setUsers(snapshot.val())
            })
        }
    }, []);



    //hvis der ikke er nogle brugere endnu
    if(!users) {
        return <Text>Vent... De kommer</Text>
    }

    const handleSelectUser = id => {
        /* søger i vores array af users og finde den der matcher id´et */
        const user = Object.entries(users).find(user => user[0] === id)
        navigation.navigate('User Details', {user});
    };

    //Metoden flatlist forventer et array. Derfor bruges alle values fra vores users objekter og bruger til array
    const userArray = Object.values(users)
    const userKeys = Object.keys(users)

    // returnerer hvordan det skal vises
    return (
        <FlatList data={userArray}
                    // bruger key til at identificere id på user, og bruger dette id til at håndtere den valgte user
                  keyExtractor={(item, index) => userKeys[index]}
                  renderItem={({item, index}) =>{
                      return(
                          <TouchableOpacity style={styles.container} onPress={() => handleSelectUser(userKeys[index])}>
                              <Text>
                                  {item.navn} {item.adresse}
                              </Text>
                          </TouchableOpacity>
                      )
                  }}
                  />
    )
}

export default UserList;

// styles til listen af users
const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 5,
        borderRadius:10,
        margin: 10,
        padding: 10,
        height: 50,
        justifyContent:'center',
        backgroundColor: "green",

    },
    label: { fontWeight: 'bold' },
});
