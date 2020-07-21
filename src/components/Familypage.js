import React, { Component, useState } from 'react';
// import {createConnection, Entity, BaseEntity, PrimaryGeneratedColumn,
// 	Column, UpdateDateColumn, CreateDateColumn,
// 	PrimaryColumn, BeforeInsert } from 'typeorm'
import { Button, View, Text, StyleSheet, TouchableNativeFeedback, TextInput, TouchableOpacity,ScrollView } from 'react-native';
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import RadioButton from '../components/RadioButton';
import { color } from 'react-native-reanimated';
// import { ScrollView } from 'react-native-gesture-handler';
export default function Aboutscreen({ navigation }) 
{
 var usernameval = navigation.getParam('username');
  const [username, setusername] = useState(usernameval);
  const [fathername, setfathername] = useState('');
  const [mothername, setmothername] = useState('');
  const [wifename, setwifename] = useState('');
  const [exwifename, setexwifename] = useState('');
  const [sonname, setsonname] = useState('');
  const [gender, setGender] = useState('male');
  const [femaleCheck, setFemaleCheck] = useState(false);
  const [maleCheck, setMaleCheck] = useState(true);

  const maleRadioHandler = () => {
    if (femaleCheck) {
      setFemaleCheck(false);
      setMaleCheck(true);
      setGender('male');
    } else {
      setMaleCheck(true);
      setGender('male');
    }
  }


  const femaleRadioHandler = () => {
    if (maleCheck) {
      setMaleCheck(false);
      setFemaleCheck(true);
      setGender('female');
    } else {
      setFemaleCheck(true);
      setGender('female');
    }
  }

  return (
    <View style={styles.container}>
        <ScrollView>
      <Text style={styles.textstyle}>Name</Text>
      <TextInput style={styles.input}
        underlineColorAndroid="transparent"
        placeholder="e.g Shreeram"
        placeholderTextColor="#777"
        value={navigation.getParam('username')}
        onChangeText={(val) => setusername(val)}
        autoCapitalize="none" />
      <Text style={styles.textstyle}>Father Name</Text>
      <TextInput style={styles.input}
        underlineColorAndroid="transparent"
        placeholder="e.g Shreeram"
        placeholderTextColor="#777"
        autoCapitalize="none"
        onChangeText={(val) => setfathername(val)} />
      <Text style={styles.textstyle}>Mother Name</Text>
      <TextInput style={styles.input}
        underlineColorAndroid="transparent"
        placeholder="e.g Shreeram"
        placeholderTextColor="#777"
        autoCapitalize="none"
        onChangeText={(val) => setmothername(val)} />

      <View style={{ ...styles.blockContainer, alignItems: 'center', flexDirection: 'row', marginHorizontal: 15, paddingHorizontal: 10 }}>
        <View style={styles.headingContainer}><Text style={styles.headingText}>Having Wife</Text></View>
        <RadioButton onPress={maleRadioHandler} checked={maleCheck} />
        <Text style={styles.radioText}>Yes, </Text>
        <RadioButton checked={femaleCheck} onPress={femaleRadioHandler} />
        <Text style={styles.radioText}>No.</Text>
      </View>
      
      <Text style={styles.textstyle}>Wife Name</Text>
      <TextInput style={styles.input}
        underlineColorAndroid="transparent"
        placeholder="e.g Shreeram"
        placeholderTextColor="#777"
        autoCapitalize="none"
        onChangeText={(val) => setwifename(val)} />
      <Text style={styles.textstyle}>Ex-Wife Name</Text>
      <TextInput style={styles.input}
        underlineColorAndroid="transparent"
        placeholder="e.g Shreeram"
        placeholderTextColor="#777"
        autoCapitalize="none"
        onChangeText={(val) => setexwifename(val)} />
      <Text style={styles.textstyle}>Son Name</Text>
      <TextInput style={styles.input}
        underlineColorAndroid="transparent"
        placeholder="e.g Shreeram"
        placeholderTextColor="#777"
        autoCapitalize="none"
        onChangeText={(val) => setsonname(val)} />
      <Text style={styles.textstyle}>daughter Name</Text>
      <TextInput style={styles.input}
        underlineColorAndroid="transparent"
        placeholder="e.g Shreeram"
        placeholderTextColor="#777"
        autoCapitalize="none"
        onChangeText={(val) => setdaughtername(val)} />

      <TouchableOpacity
        style={styles.submitButton}
        onPress={
          () => this.login(this.state.email, this.state.password)
        }>
        <Text style={styles.submitButtonText}> Submit </Text>
      </TouchableOpacity>
      </ScrollView>
    </View>

  )
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 23
  },
  input: {
    marginLeft: 10,
    marginRight: 50,
    marginTop: 5,
    marginBottom: 5,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1
  },
  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 15,
    height: 40,
  },
  radioText: {
    marginHorizontal:5,
    fontSize: 15,
    color : 'blue'
  },
  submitButtonText: {
    color: 'white'
  },
  textstyle:
  {
    fontSize: 20,
    color: 'blue',
    marginLeft: 10,
  },
  headingText: {
    fontSize: 19,
    fontWeight: '400',
    color : 'blue',
    marginBottom : 10,
  },
});