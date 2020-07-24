import React, { Component,useState,useEffect } from 'react';
import { Button, View, Text,TextInput,StyleSheet,TouchableOpacity,FlatList} from 'react-native';
import {createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';


export default function addfamily({navigation}) {
    const [username, setusername] = useState('');
    return (
      <View >
        <Text style={styles.textstyle}>Family Tree Name</Text>
        <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "e.g Shreeram"
               placeholderTextColor = "#777"
               onChangeText={(val)=>setusername(val)}
               autoCapitalize = "none"/>
               {/* <Text>Name : {username}</Text> */}
               <TouchableOpacity onPress={()=>navigation.navigate('FamPage',{username})}
                style = {styles.saveButton}>
                <Text style = {styles.submitButtonText}> Save & Proceed </Text>
             </TouchableOpacity>     
      </View>
    )
  }
const styles = StyleSheet.create({
    textstyle: {
        textAlign: 'center',
    fontSize:30,
    fontFamily: "Cochin"
    ,fontWeight: "bold",
    textShadowColor : '#00ff00',
    textShadowRadius : 8,
    marginTop : 150,
    },
    input: {
        marginTop : 5,
        marginLeft:30,
        marginRight:30,
        height: 40,
        borderColor: '#7a42f4',
        borderWidth: 1
     },
     saveButton: {
        backgroundColor: '#7a42f4',
        height: 40,
        width:150,
        borderRadius : 10,
        marginTop : 10,
        marginLeft : 80,
     },
     submitButtonText:{
        color: 'white'
        ,textAlign :"center",
        padding :10,
     },
     alternativeLayoutButtonContainer: {
        marginLeft: 100,
        marginTop :20,
        marginRight :100,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }
    });