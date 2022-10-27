import * as React from 'react';
import { View, Text, Platform, StyleSheet, FlatList, Button, Alert } from 'react-native';
import firebase from 'firebase/compat';
import {useEffect, useState} from "react";


// component til at vise detaljer om et opslag
const PostDetails = ({route, navigation}) => {

    // bruger usestate til at definere objektets initial state
    const [post, setPost] = useState({});

    useEffect(() => {
        setPost(route.params.post[1]);
        /*Henter opslaget og sætter values ind i return*/
        return () => {
            //når jeg går væk fra skærmen, skal den tømme objektet
            setPost({})
        }
    });

    // funktion til at håndterer edit
    const handleEdit = () => {
        /*Går til edit opslag routen */
        const post = route.params.post
        //navigerer til edit opslag og sender opslaget med videre
        navigation.navigate('Edit post', {post})
    };

    //funktion til at håndtere delete opslag
    const deletePost = () => {
        //Sikre mig lige hvilken platform det er på
        if(Platform.OS === 'android' || Platform.OS === 'ios') {
            Alert.alert('Er du sikker?', 'Vil du slette dette opslag', [
                {text:'Cancel', style:'cancel'},
                //bruger handle delete til at slette brugeren i onpress
                {text:'Delete', style:'destructive', onPress:() => handleDelete() }
            ])
        }
    }

    //funktion til at håndtere delete af en user
    const handleDelete = () => {
        const id = route.params.post[0]
        try {
            //bruger opslags id til at navigere til opslaget, og fjerner alt der ligger til dette objekt
            firebase.database().ref(`/Posts/${id}`).remove();
            // til sidst går jeg tilbage til den i navigation stacken
            navigation.goBack();
        }
            // fanger en fejl hvis der er en
        catch (error) {
            Alert.alert(error.message)
        }
    };

    // if statement til hvis der ingen data er på opslag
    if (!post) {
        return <Text>Ingen data</Text>;
    }


    // returnerer hvad der skal vises på skærmen
    return (

        <View style={styles.container}>
            {/* 2 knapper til edit og delete, som har hver deres funktion*/}
            <Button title='Edit' onPress={ () => handleEdit()}>
            </Button>
            <Button title='Delete' onPress={() => deletePost()}>
            </Button>

            {
                Object.entries(post).map((item,index) => {
                    return (
                        <View style={styles.row} key={index}>
                            <Text style={styles.label}>
                                {item[0]}
                                {/* users key navn */}
                            </Text>
                            <Text style={styles.value}>
                                {item[1]}
                                {/* users values navne */}
                            </Text>

                        </View>
                    )

                })
            }

        </View>
    )
}

export default PostDetails;

//styles til siderne og de forskellige dele af skærmen
const styles = StyleSheet.create({
    container: { flex: 10, justifyContent: 'center' , padding: 20, },
    row: {
        margin: 20,
        padding: 20,
        flexDirection: 'row',
    },
    label: { width: 70, fontWeight: 'bold', justifyContent: 'center' },
    value: { flex: 1 },
});
