import * as React from 'react'
import {View, Text, StyleSheet, TextInput, Button, Alert, ScrollView, SafeAreaView} from 'react-native';
import firebase from 'firebase/compat';
import {useEffect, useState} from "react";

// begynder her hele funktionen til at tilføje og redigerer opslag til platformen
const Add_edit_opslag = ({navigation,route}) => {

    //først definerer jeg initialState til at være tomt
    const initialState = { opslag:''}

    //bruger useState metoden til at håndtere states
    const [newOpslag, setNewOpslag] = useState(initialState)

    // sætter routen til Edit Opslag
    const isOpslagEdit = route.name === "Edit Opslag"

    //her en funktion til at håndtere effekten af en ny bruger
    useEffect(() => {
        if (isOpslagEdit) {
            const Opslag = route.params.user[1]
            setNewOpslag(Opslag)
        }
        //returnerer med initialState
        return () => {
            setNewOpslag(initialState)
        }
    }, [])

    const changeTextInput = (name, event) => {
        setNewOpslag({...newOpslag, [name]: event})
    }

    // nu laver jeg en funktion til at håndtere at man gemmer brugeren
    const handleSave = () => {
        const opslag = newOpslag

        //først hvis der ikke står noget er det ikke muligt
        if (opslag.length === 0 ) {
            return Alert.alert('feltet er ikke udfyldt')
        }

        if (isOpslagEdit) {
            const id = route.params.opslag[0]

            //den skal først prøve at update brugeren
            try {
                firebase.database()
                    .ref(`/Opslag/${id}`)
                    // Jeg angiver i update hvilke felter der skal opdateres
                    .update({opslag});
                Alert.alert("Dit opslag er nu opdateret")
                const opslag = (id, newOpslag)
                navigation.navigate("Opslag Details", {opslag});
            }
                //kaster en fejl hvis der er en
            catch (error) {
                console.log(`Error: ${error.message}`)
            }

        }else{
            //meddele at brugeren er gemt
            try {
                firebase.database().ref('/Users')
                    .push({opslag})
                Alert.alert("Bruger Gemt")
                setNewOpslag(initialState);

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
                                <TextInput value={newOpslag[key]}
                                           onChangeText={(event) => changeTextInput(key,event)}
                                           style={styles.input}>

                                </TextInput>
                            </View>
                        )
                    })
                }
                {/*Hvis man går i edit bruger, skal der stå gæm ændringer og ikke tilføj bruger*/}
                <Button title={ isOpslagEdit ? "Gem" : "Gem"} onPress={() => handleSave()}>
                </Button>
            </ScrollView>

        </SafeAreaView>

    )
}

export default Add_edit_opslag;


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

