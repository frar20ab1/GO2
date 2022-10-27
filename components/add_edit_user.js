import * as React from 'react';
import {View, Text, StyleSheet, TextInput, Button, Alert, ScrollView, SafeAreaView} from 'react-native';
import firebase from 'firebase/compat';
import {useEffect, useState} from "react";

// begynder her hele funktionen til at tilføje og redigerer brugere til platformen
const Add_edit_user = ({navigation,route}) => {

    //først definerer jeg initialState til at være tomt
    const initialState = { navn: '', alder: '', adresse: ''}

    //bruger useState metoden til at håndtere states
    const [newUser, setNewUser] = useState(initialState)

    // sætter routen til Edit user
    const isUserEdit = route.name === "Edit User"

    //her en funktion til at håndtere effekten af en ny bruger
    useEffect(() => {
        if (isUserEdit) {
            const user = route.params.user[1]
            setNewUser(user)
        }
        //returnerer med initialState
        return () => {
            setNewUser(initialState)
        }
    }, [])

    const changeTextInput = (name, event) => {
        setNewUser({...newUser, [name]: event})
    }

    // nu laver jeg en funktion til at håndtere at man gemmer brugeren
    const handleSave = () => {
        const {navn, alder, adresse} = newUser

        //først hvis der ikke står noget er det ikke muligt
        if (navn.length === 0 || alder.length === 0 || adresse.length === 0) {
            return Alert.alert('Et af felterne er ikke udfyldt')
        }

        if (isUserEdit) {
            const id = route.params.user[0]

            //den skal først prøve at update brugeren
            try {
                firebase.database()
                    .ref(`/Users/${id}`)
                    // Jeg angiver i update hvilke felter der skal opdateres
                    .update({navn, alder, adresse});
                Alert.alert("Dine informationer er nu opdateret")
                const user = (id, newUser)
                navigation.navigate("User Details", {user});
            }
            //kaster en fejl hvis der er en
            catch (error) {
                console.log(`Error: ${error.message}`)
            }

            }else{
            //meddele at brugeren er gemt
                    try {
                        firebase.database().ref('/Users')
                            .push({navn,alder,adresse})
                        Alert.alert("Bruger Gemt")
                        setNewUser(initialState);

                } catch (error) {
                        //ellers kast en fejl
                        console.log(`Error: ${error.message}`)

            }
        }
    }


    return (
        <SafeAreaView style={styles.container}>

            <ScrollView>
                {
                    Object.keys(initialState).map((key,index) => {
                        return(
                            <View style={styles.row} key={index}>
                                <Text style={styles.label} > {key} </Text>
                                <TextInput value={newUser[key]}
                                           onChangeText={(event) => changeTextInput(key,event)}
                                           style={styles.input}>

                                </TextInput>
                            </View>
                        )
                    })
                }
                {/*Hvis man går i edit bruger, skal der stå gæm ændringer og ikke tilføj bruger*/}
                <Button title={ isUserEdit ? "Gem" : "Gem"} onPress={() => handleSave()}>
                </Button>
            </ScrollView>

        </SafeAreaView>

    )
}

export default Add_edit_user;


//styles til styling af hele appen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    row: {
        flexDirection: 'row',
        height: 40,
        margin: 15,
    },
    label: {
        fontWeight: 'bold',
        width: 70
    },
    input: {
        borderWidth: 5,
        padding:5,
        flex: 1
    },
})

