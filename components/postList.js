import * as React from 'react';
import { Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import firebase from 'firebase/compat';
import {useEffect, useState} from "react";

// component til at vise liste af users
const PostList = ({navigation}) => {

    // bruger usestate til at definere objektets initial state
    const [posts, setPosts] = useState()


    useEffect(() => {
        if(!posts) {
            firebase.database().ref('/Posts').on("value", snapshot => {
                setPosts(snapshot.val())
            })
        }
    }, []);



    //hvis der ikke er nogle brugere endnus
    if(!posts) {
        return <Text>Vent... De kommer</Text>
    }

    const handleSelectPost = id => {
        /* søger i vores array af users og finde den der matcher id´et */
        const post = Object.entries(posts).find(post => post[0] === id)
        navigation.navigate('Post Details', {post});
    };

    //Metoden flatlist forventer et array. Derfor bruges alle values fra vores users objekter og bruger til array
    const postArray = Object.values(posts)
    const postKeys = Object.keys(posts)

    // returnerer hvordan det skal vises
    return (
        <FlatList data={postArray}
            // bruger key til at identificere id på user, og bruger dette id til at håndtere den valgte user
                  keyExtractor={(item, index) => postKeys[index]}
                  renderItem={({item, index}) =>{
                      return(
                          <TouchableOpacity style={styles.container} onPress={() => handleSelectPost(postKeys[index])}>
                              <Text>
                                  {item.navn} {item.post}
                              </Text>
                          </TouchableOpacity>
                      )
                  }}
        />
    )
}

export default PostList;

// styles til listen af users
const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 5,
        borderRadius:10,
        margin: 10,
        marginTop: 20,
        padding: 10,
        height: 50,
        justifyContent:'center',
        backgroundColor: "lightblue",

    },
    label: { fontWeight: 'bold' },
});
