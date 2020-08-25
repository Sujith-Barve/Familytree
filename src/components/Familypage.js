﻿import React, { Component, useState, useEffect } from 'react';
import { Alert, View, Text, StyleSheet, TouchableOpacity, value, BackHandler, ScrollView } from 'react-native';
import { TextInput, Button, RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import DropDownPicker from 'react-native-dropdown-picker';
import { sub } from 'react-native-reanimated';
myRef = React.createRef();
var originalFather = [];
var originalMother = [];
// var submitpercentage = 1;

export default function Aboutscreen({ navigation }) {
      // var usernameval = navigation.getParam('username');
      const [username, setusername] = useState('');
      const [FatherName, setFatherName] = useState('');
      const [MotherName, setMotherName] = useState('');
      const [WifeName, setWifeName] = useState('');
      const [ChildrenName, setChildrenName] = useState('');
      const [Gendervalue, setGendervalue] = useState();
      const [isLoading, setIsLoading] = useState(false);
      const [fatherval, setfatherval] = useState([]);
      const [motherval, setmotherval] = useState([]);
      const [martialvalue, setmartialvalue] = useState('Bachelor');
      const [Havingchildren, setHavingchildren] = useState("Yes");
      const [ChildernNo, setChildernNo] = useState(0);
      const[childnametext,setchildnametext]=useState([])
      const isEnabled = FatherName.length > 0
            && MotherName.length > 0 && username.length > 0;
      const [motherVisible, setMotherVisiblity] = useState(true);
      var fatherArray = [];
      var motherArray = [];
      useEffect(() => {
            setTimeout(() => getfatherdata(), 1500)
            setTimeout(() => getMotherdata(), 1500)
            const backAction = () => {
                  Alert.alert("Hold on!", "Are you sure you want to go back?", [
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
                        const fatherArray = originalFather.map(element => {
                              return {
                                    ...element,
                                          label: element.Name, value: element._id,

                              };
                        });
                        if (fatherval.length != 0)
                              setfatherval(...fatherval, fatherArray)
                        else setfatherval(fatherArray)
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
                        originalMother = mothernames;
                        console.log("Resp data is" + originalMother); const motherArray = originalMother.map(element => {
                              return {
                                    ...element,
                                    label: element.Name, value: element._id,

                              };
                        });
                        if (motherval.length != 0)
                              setmotherval(...motherval, motherArray)
                        else setmotherval(motherArray)
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
                        navigation.navigate('Home');
                        setFatherName('')
                        setMotherName('');
                        setusername('');
                        setChecked('')
                  })
                  .catch(err => {
                        Alert.alert("someting went wrong either user exists or unable to connect to server");
                  })
      }

      var textdata = [];

      for (let i = 0; i < ChildernNo; i++) {
            console.log("Number ============== " + i)
            textdata.push(
                  <View>
                        <TextInput
                              style={styles.inputda}
                              label="Name"
                              mode="outlined"
                              value={childnametext}
                              onChangeText={text => setchildnametext(text)}
                        />
                  </View>
            )
      }
      return (
            <ScrollView style={styles.root}>
                  <TextInput style={styles.inputda}
                        label="Name"
                        mode="outlined"
                        value={username}
                        onChangeText={text => setusername(text)}

                  />

                  <View >
                        <RadioButton.Group onValueChange={Gendervalue => setGendervalue(Gendervalue)} value={Gendervalue}>
                              <View style={styles.radio} >
                                    <RadioButton value="Male" />
                                    <Text style={styles.radiotext}>Male</Text>
                                    <RadioButton value="Female" />
                                    <Text style={styles.radiotext}>Female</Text>
                                    <RadioButton value="Others" />
                                    <Text style={styles.radiotext}>Others</Text>

                              </View>
                        </RadioButton.Group>
                  </View>

                  <TextInput style={styles.inputda}
                        label="FatherName"
                        mode="outlined"
                        value={FatherName}
                        onChangeText={text => setFatherName(text)}
                  />

                  <DropDownPicker
                        id="dpd"
                        items={fatherval}
                        placeholder="Select Father From the list"
                        containerStyle={{ height: 40 }}
                        selectedLabelStyle={{ color: '#000000' }}
                        activeItemStyle={{ backgroundColor: "#38ACEC" }}
                        style={styles.drop}
                        itemStyle={{
                              justifyContent: 'flex-start'
                        }}
                        selectedtLabelStyle={{
                              color: 'blue'
                        }}
                        dropDownStyle={{ backgroundColor: '#fafafa' }}

                  />
                  <TextInput style={styles.inputda}
                        label="MotherName"
                        mode="outlined"
                        value={MotherName}
                        onChangeText={text => setMotherName(text)}
                  />
                  <DropDownPicker
                        items={motherval}
                        placeholder="Select Mother From the list"
                        selectedLabelStyle={{ color: '#000000' }}
                        activeItemStyle={{ backgroundColor: "#38ACEC" }}
                        containerStyle={{ height: 40 }}
                        style={styles.drop}
                        itemStyle={{
                              justifyContent: 'flex-start'
                        }}
                        showArrow={true}
                        dropDownStyle={{ backgroundColor: '#fafafa' }}
                  />


                  <View >
                        <RadioButton.Group onValueChange={martialvalue => setmartialvalue(martialvalue)} value={martialvalue}>
                              <View style={styles.radio} >
                                    <RadioButton value="Bachelor" />
                                    <Text style={styles.radiotext}>Bachelor</Text>
                                    <RadioButton value="Married" />
                                    <Text style={styles.radiotext}>Married</Text>

                              </View>

                        </RadioButton.Group>
                        {martialvalue == "Married" ? <View>
                              <TextInput style={styles.inputda}
                                    label="Wife Name"
                                    mode="outlined"
                                    value={WifeName}
                                    onChangeText={WifeName => setWifeName(WifeName)}
                              />
                              <Text>Having Children</Text>
                              <RadioButton.Group onValueChange={Havingchildren => setHavingchildren(Havingchildren)} value={Havingchildren}>
                                    <View style={styles.radio} >
                                          <RadioButton value="Yes" />
                                          <Text style={styles.radiotext}>Yes</Text>
                                          <RadioButton value="No" />
                                          <Text style={styles.radiotext}>No</Text>
                                    </View>
                              </RadioButton.Group>
                              {Havingchildren == "Yes" ?

                                    <TextInput
                                          style={styles.inputda}
                                          label="Number Of Children"
                                          mode="outlined"
                                          value={ChildernNo}
                                          onChangeText={ChildernNo => setChildernNo(ChildernNo)}
                                          keyboardType={'numeric'}
                                    />

                                    : null}
                              {textdata}
                        </View>
                              : null}
                  </View>

                  <View
                        style={{ flex: 1, justifyContent: 'flex-end' }}>
                        <Button disabled={!isEnabled}
                              style={styles.submitButtonr}
                              mode="contained"
                              onPress={() => submitData()}
                              title="Submit">
                              Submit
                              </Button>
                  </View>
            </ScrollView>
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



      },
      numericdata: {
            textAlign: 'center',
            height: 40,
            borderRadius: 10,
            borderWidth: 2,
            marginBottom: 10
      }

});
