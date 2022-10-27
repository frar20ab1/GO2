import * as React from 'react'
import {View, Text, StyleSheet, TextInput, Button, Alert, ScrollView, SafeAreaView} from 'react-native';
import firebase from 'firebase/compat';
import {useEffect, useState} from "react";

// begynder her hele funktionen til at tilføje og redigerer opslag til platformen
const Add_edit_Post = ({navigation,route}) => {

    //først definerer jeg initialState til at være tomt
    const initialState = { navn: '', post: ''}

    //bruger useState metoden til at håndtere states
    const [newPost, setNewPost] = useState(initialState)

    // sætter routen til Edit Opslag
    const isPostEdit = route.name === "Edit Post"

    //her en funktion til at håndtere effekten af en ny bruger
    useEffect(() => {
        if (isPostEdit) {
            const Post = route.params.post[1]
            setNewPost(Post)
        }
        //returnerer med initialState
        return () => {
            setNewPost(initialState)
        }
    }, [])

    const changeTextInput = (name, event) => {
        setNewPost({...newPost, [name]: event})
    }

    // nu laver jeg en funktion til at håndtere at man gemmer brugeren
    const handleSave = () => {
        const {navn, post} = newPost

        //først hvis der ikke står noget er det ikke muligt
        if (navn.length === 0 || post.length === 0 ) {
            return Alert.alert('feltet er ikke udfyldt')
        }

        if (isPostEdit) {
            const id = route.params.post[0]

            //den skal først prøve at update brugeren
            try {
                firebase.database()
                    .ref(`/Posts/${id}`)
                    // Jeg angiver i update hvilke felter der skal opdateres
                    .update({navn, post});
                Alert.alert("Dit opslag er nu opdateret")
                const post = (id, newPost)
                navigation.navigate("Opslag Details", {post});
            }
                //kaster en fejl hvis der er en
            catch (error) {
                console.log(`Error: ${error.message}`)
            }

        }else{
            //meddele at brugeren er gemt
            try {
                firebase.database().ref('/Posts')
                    .push({navn, post})
                Alert.alert("Post Gemt")
                setNewPost(initialState);

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
                                <TextInput value={newPost[key]}
                                           onChangeText={(event) => changeTextInput(key,event)}
                                           style={styles.input}>

                                </TextInput>
                            </View>
                        )
                    })
                }
                {/*Hvis man går i edit bruger, skal der stå gæm ændringer og ikke tilføj bruger*/}
                <Button title={ isPostEdit ? "Gem" : "Gem"} onPress={() => handleSave()}>
                </Button>
            </ScrollView>

        </SafeAreaView>

    )
}

export default Add_edit_Post;


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

