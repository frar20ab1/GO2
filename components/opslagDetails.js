import * as React from 'react';
import { View, Text, Platform, StyleSheet, FlatList, Button, Alert } from 'react-native';
import firebase from 'firebase/compat';
import {useEffect, useState} from "react";


// component til at vise detaljer om en bruger
const OpslagDetails = ({route, navigation}) => {

    // bruger usestate til at definere objektets initial state
    const [opslag, setOpslag] = useState({});

    useEffect(() => {
        setOpslag(route.params.opslag[1]);
        /*Henter opslaget og sætter values ind i return*/
        return () => {
            //når jeg går væk fra skærmen, skal den tømme objektet
            setOpslag({})
        }
    });

    // funktion til at håndterer edit
    const handleEdit = () => {
        /*Går til edit user routen */
        const opslag = route.params.opslag
        //navigerer til edit user og sender bilen med videre
        navigation.navigate('Edit opslag', {opslag})
    };

    //funktion til at håndtere delete user
    const deleteOpslag = () => {
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
        const id = route.params.opslag[0]
        try {
            //bruger users id til at navigere til bilen, og fjerner alt der ligger til dette objekt
            firebase.database().ref(`/Opslag/${id}`).remove();
            // til sidst går jeg tilbage til den i navigation stacken
            navigation.goBack();
        }
            // fanger en fejl hvis der er en
        catch (error) {
            Alert.alert(error.message)
        }
    };

    // if statement til hvis der ingen data er på opslag
    if (!opslag) {
        return <Text>Ingen data</Text>;
    }


    // returnerer hvad der skal vises på skærmen
    return (

        <View style={styles.container}>
            {/* 2 knapper til edit og delete, som har hver deres funktion*/}
            <Button title='Edit' onPress={ () => handleEdit()}>
            </Button>
            <Button title='Delete' onPress={() => deleteOpslag()}>
            </Button>

            {
                Object.entries(opslag).map((item,index) => {
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

export default OpslagDetails;

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
