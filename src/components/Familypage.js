﻿import React, { Component, useState } from 'react';
import {Alert, View, Text, StyleSheet, TouchableOpacity,ScrollView} from 'react-native';
import {TextInput,Button} from 'react-native-paper';
export default function Aboutscreen() 
{
// var usernameval = navigation.getParam('username');
const [username, setusername] = useState('');
const [FatherName, setFatherName] = useState('');
const [MotherName, setMotherName] = useState('');
const submitData = ()=>{
      fetch("http://32cd3e2070d0.ngrok.io/",{
      method:"post",
      headers:{
      'Content-Type': 'application/json',
      },
      body:JSON.stringify({
      Name :username,
      FatherName:FatherName,
      MotherName:MotherName,
      })
      })
      .then(res=>res.json())
      .then(data=>{
      console.log(data);
      Alert.alert(`Data is saved successfuly`)
      })
      .catch(err=>{
      Alert.alert("someting went wrong")
      })
      }
      
return(
      <View style={styles.root}>
      <TextInput style={styles.inputda}
label="Name"
mode ="outlined"
value={username}
onChangeText={text => setusername(text)}
/>
<TextInput style={styles.inputda}
label="FatherName"
mode ="outlined"
value={FatherName}
onChangeText={text => setFatherName(text)}
/>
<TextInput style={styles.inputda}
label="MotherName"
mode ="outlined"
value={MotherName}
onChangeText={text => setMotherName(text)}
/>
<View style={{flex: 1,justifyContent: 'flex-end'}}>
<Button 
style={styles.submitButtonr}
mode="contained" 
onPress={() => submitData()}title="Submit">
Submit
</Button>
</View>
</View>
);
}
const styles = StyleSheet.create({
      root :
      {
            flex:1,
      },
      inputda :
      {     
            margin :5,
            borderColor: 'blue'
      },
      submitButtonr :
      {
    justifyContent: 'center',
    padding:2,
    margin:10,
    borderRadius:10,


      }
});
