import {StatusBar} from "expo-status-bar";
import * as React from 'react';
import {View, Text, StyleSheet, Image, ImageBackground} from 'react-native';

import DefaultImage from '../assets/nabologo.jpeg';

const backgroundImage = DefaultImage

const HomeScreen = () => (
    <View style={styles.container}>
        <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.image}>

        </ImageBackground>
        <View style={styles.bottomView}>
            <Text style={styles.text}>Denne app er tilsigtet beboere i ejendomsforeninger.
                Her kan du se dine med beboere og deres opslag på opslagstavlen,
                istedet for at se det nede i opgangen eller på facebook :D</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    bottomView: {
        width: '100%',
        height: 100,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute', //Here is the trick
        bottom: 0, //Here is the trick
    },
    image: {
        flex: 1,
        justifyContent: "center"
    },
    text: {
        color: "black",
        fontSize: 10,
        lineHeight: 20,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "#c0c0c0",
        justifyContent: 'flex-end'
    }
});

export default HomeScreen;