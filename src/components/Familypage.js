﻿import React, { Component, useState, useEffect } from 'react';
import { Alert, View, Text, StyleSheet, TouchableOpacity, ScrollView, value, BackHandler } from 'react-native';
import { TextInput, Button, RadioButton } from 'react-native-paper';
// import {Picker} from '@react-native-community/picker';
// import { Dropdown } from 'react-native-material-dropdown';
import Icon from 'react-native-vector-icons/Feather';
import DropDownPicker from 'react-native-dropdown-picker';
// import { response } from 'express';
myRef = React.createRef();
var originalFather = [];
// var isfetchingnow = true;

export default function Aboutscreen({ navigation }) {
      // var usernameval = navigation.getParam('username');
      const [username, setusername] = useState('');
      const [FatherName, setFatherName] = useState('');
      const [MotherName, setMotherName] = useState('');
      const [value, setValue] = useState();
      const [isLoading, setIsLoading] = useState(false);
      const [fatherval, setfatherval] = useState([])
      const [motherval, setmotherval] = useState([])
      const [dropval, setdropval] = useState(
            {
                  country: 'uk'
            }
      );
      var fatherArray = [];
      var motherArray = [];
      useEffect(() => {
            // setTimeout(() => getfatherdata(), 1500)
            setTimeout(() => getMotherdata(), 1500)
            const backAction = () => {
                  Alert.alert("Are you sure you want to go back?", [
                        {
                              text: "Cancel",
                              onPress: () => null,
                              style: "cancel"
                        },
                        { text: "YES", onPress: () => BackHandler.exitApp() }
                  ]);
                  return true;
            };

            const backHandler = BackHandler.addEventListener(
                  "hardwareBackPress",
                  backAction
            );

            return () => backHandler.remove();
      }, []);


      function getfatherdata() {
            setIsLoading(true);
            return fetch('http://192.168.43.131:3000/getfatherdata')
                  .then(response => response.json())
                  .then(fathernames => {
                        originalFather = fathernames;
      const motherArray= originalMother.map(element => {
            return {
                ...element,
                label: element.Name ,value:element._id,

            };
        });
                        setfatherval(...fatherval, fatherArray)
                        console.log("fathername is" + JSON.stringify(originalFather))
                        setIsLoading(false);

                  })
                  .catch(err => {
                        Alert.alert("Error" + err);
                        console.log(err)
                        setIsLoading(false);
                  })
      }

      function getMotherdata() {
            setIsLoading(true);
            return fetch('http://192.168.43.131:3000/getMotherdata')
                  .then(response => response.json())
                  .then(mothernames => {
                        originalMother= mothernames;
                        console.log("Resp data is" + originalMother);                        const motherArray= originalMother.map(element => {
                              return {
                                  ...element,
                                  label: element.Name ,value:element._id,

                              };
                          });
                          
                        setmotherval(...motherval, motherArray)
                        console.log("MotherName is" + JSON.stringify(originalMother))
                        setIsLoading(false);

                  })
                  .catch(err => {
                        Alert.alert("Error" + err);
                        console.log(err)
                        setIsLoading(false);
                  })
      }

      const submitData = () => {
            let obj = originalFather[parseInt(myRef.current.selectedIndex())]
            let selectedFatherId = obj._id.toString()
            console.log(selectedFatherId)
            fetch("http://192.168.43.131:3000/create-person", {
                  method: "post",
                  headers: {
                        'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                        Name: username,
                        FatherName: FatherName,
                        MotherName: MotherName,
                        Gender: value,

                  })
            }).then(res => res.json())
                  .then(data => {
                        console.log(data);
                        Alert.alert(`Data is saved successfuly`)
                        // navigation.navigate('Home');
                        setFatherName('')
                        setMotherName('');
                        setusername('');
                        setChecked('')
                  })
                  .catch(err => {
                        Alert.alert("someting went wrong either user exists or unable to connect to server");
                  })
      }

      // if (isfetchingnow) {

      //       return (<View style={styles.root}>
      //             <Text> loading.....</Text>
      //       </View>
      //       )
      // }
      // else {
      return (
            <View style={styles.root}>
                  <TextInput style={styles.inputda}
                        label="Name"
                        mode="outlined"
                        value={username}
                        onChangeText={text => setusername(text)}

                  />
                  {/* <View style={styles.drop}>
                  <Dropdown
                        label='select father from the list'
                        baseColor="green"
                        ref={myRef}
                        itemColor="red"
                        selectedItemColor="blue"
                        data={fatherval}
                        animationDuration={0}

                  />
                  </View> */}

                  {/* <DropDownPicker
                        items={fatherval}
                        placeholder="Select Father From the list"
                        containerStyle={{ height: 40 }}
                        selectedLabelStyle={{ color: 'green' }}
                        activeItemStyle={{ backgroundColor: "green" }}
                        style={styles.drop}
                        itemStyle={{
                              justifyContent: 'flex-start'
                        }}
                        selectedtLabelStyle={{
                              color: 'blue'
                        }}
                        dropDownStyle={{ backgroundColor: '#fafafa' }}
                  /> */}



                  <TextInput style={styles.inputda}
                        label="FatherName"
                        mode="outlined"
                        value={FatherName}
                        onChangeText={text => setFatherName(text)}
                  />
                  {/* <View >
                        <RadioButton.Group onValueChange={value => setValue(value)} value={value}>
                              <View style={styles.radio} >
                                    <Text style={styles.radiotext}>Male</Text>
                                    <RadioButton value="Bachelor" />
                                    <Text style={styles.radiotext}>Female</Text>
                                    <RadioButton value="Married" />           
                              </View>
                        </RadioButton.Group>
                  </View> */}
                  {/* <View style={styles.drop}>
                  <Dropdown style={StyleSheet.drop}
                        label='select Mother from the list'
                        baseColor="green"
                        ref={myRef}
                        itemColor="red"
                        selectedItemColor="blue"
                        data={motherval}
                        animationDuration={0}

                  />
                  </View> */}
                  <DropDownPicker
                        items={motherval}
                        placeholder="Select Mother From the list"
                        selectedLabelStyle={{ color: 'green' }}
                        activeItemStyle={{ backgroundColor: "green" }}
                        containerStyle={{ height: 40 }}
                        style={styles.drop}
                        itemStyle={{
                              justifyContent: 'flex-start'
                        }}
                        showArrow={true}
                        dropDownStyle={{ backgroundColor: '#fafafa' }}
                  />

                  <TextInput style={styles.inputda}
                        label="MotherName"
                        mode="outlined"
                        value={MotherName}
                        onChangeText={text => setMotherName(text)}
                  />

                  <View >
                        <RadioButton.Group onValueChange={value => setValue(value)} value={value}>
                              <View style={styles.radio} >
                                    <Text style={styles.radiotext}>Male</Text>
                                    <RadioButton value="Male" />
                                    <Text style={styles.radiotext}>Female</Text>
                                    <RadioButton value="Female" />
                                    <Text style={styles.radiotext}>Others</Text>
                                    <RadioButton value="Others" />
                              </View>
                        </RadioButton.Group>
                  </View>

                  <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                        {/* <Button
                              style={styles.submitButtonr}
                              mode="contained"
                              onPress={() => getfatherdata()}
                              title="Submit">
                              fetch
                        </Button> */}

                        <Button
                              style={styles.submitButtonr}
                              mode="contained"
                              onPress={() => submitData()}
                              title="Submit">
                              Submit
                        </Button>
                  </View>
            </View>
      );
}

const styles = StyleSheet.create({
      root:
      {
            flex: 1,
      },
      inputda:
      {
            margin: 5,
            borderColor: 'blue'
      },
      submitButtonr:
      {
            justifyContent: 'center',
            padding: 2,
            margin: 10,
            borderRadius: 10,
      },
      radio:
      {
            flexDirection: "row",
            margin: 10,
      },
      radiotext:
      {
            fontSize: 14,
            padding: 5,
      },
      drop:
      {
            backgroundColor: '#fafafa',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            marginLeft: 8,
            marginRight: 8,
            marginTop: 5,
            padding: 50,



      }

});
