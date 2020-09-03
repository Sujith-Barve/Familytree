﻿﻿import React, { Component, useState, useEffect, createRef } from 'react';
import { Alert, View, Text, StyleSheet, TouchableOpacity, value, BackHandler, ScrollView } from 'react-native';
import { TextInput, Button, RadioButton } from 'react-native-paper';
import SwitchSelector from "react-native-switch-selector";
// import RadioForm,{RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import Icon from 'react-native-vector-icons/Feather';
import DropDownPicker from 'react-native-dropdown-picker';
import { Dropdown } from 'react-native-material-dropdown';
import withUnmounted from '@ishawnwang/withunmounted'
import { sub } from 'react-native-reanimated';
import { Colors } from 'react-native/Libraries/NewAppScreen';
var originalFather = [];
var originalMother = [];
var i,manualentry,Fat_name,fat_ID;

// var submitpercentage = 1;
export default class Aboutscreen extends React.Component {
      constructor(props) {
            super(props);
            this.inputField = React.createRef();
            this.state = {
                  username: '',
                  FatherName: '',
                  MotherName: '',
                  WifeName: '',
                  ChildrenName: '',
                  isLoading: false,
                  fatherval: [],
                  motherval: [],
                  ChildernNo: 0,
                  childnametext: [],
                  Gendervalue: 'Male',
                  martialvalue: 'Bachelor',
                  Havingchildren: 'Yes',
                  status: true,
                  hideshowstatus: true,
                  fatherdropvalue: 'None',
                  motherdropvalue: 'None',
                  switchValue: 0,
                  switchValuemother: 0,
                  fathermanualentry :true,
                  Mothermanualentry :true,
                  // enabletextInput:'TextInputv',
                  // enabletextInp : 'TextInputv',

            };
      }
      //  isEnabled = fatherlength > 0
      //       && motherlength > 0 && username.length > 0;
      // const [motherVisible, setMotherVisiblity] = useState(true);


      fatherArray = [];
      motherArray = [];
      toggleSwitch = (value) => {
            this.setState({ switchValue: value })

      }
      toggleSwitches = (value) => {
            this.setState({ switchValuemother: value })
      }
      getfatherdata = () => {
            // this.setState.IsLoading(true);
            return fetch('http://192.168.43.131:3000/getfatherdata')
                  .then(response => response.json())
                  .then(fathernames => {
                        originalFather = fathernames;
                        console.log("fathername is" + JSON.stringify(originalFather))
                        const fatherArray = originalFather.map(element => {
                              return {
                                    label: element.Name,
                                    value: element._id,
                              };
                        });
                        console.log(JSON.stringify(fatherArray))
                        this.setState({
                              fatherval: [...fatherArray]
                        }, () => {
                              console.log("fatherval setstate failed" + JSON.stringify(this.state.fatherval));
                        });

                        // else {
                        //       this.setState.fatherval(fatherArray)
                        // }

                        // this.setState.IsLoading(false);

                  })
                  .catch(err => {
                        Alert.alert("Error" + err);
                        console.log(err)
                        // this.setState.IsLoading(false);
                  })
      }

      getMotherdata = () => {
            console.log("I entered Motherdata")
            // this.setState.IsLoading(true);
            return fetch('http://192.168.43.131:3000/getMotherdata')
                  .then(response => response.json())
                  .then(mothernames => {
                        originalMother = mothernames;
                        console.log("Resp data is" + originalMother);
                        const motherArray = originalMother.map(element => {
                              return {
                                    label: element.Name,
                                    value: element._id,
                              };
                        });
                        console.log("Updation Done")

                        this.setState({
                              motherval: [...motherArray]
                        }, () => {
                              console.log("fatherval setstate failed")
                        });

                        console.log("motherval is" + JSON.stringify(this.state.motherval))
                        // else this.setState.motherval(motherArray)
                        console.log("MotherName is" + JSON.stringify(originalMother))
                        // this.setState.IsLoading(false);

                  })
                  .catch(err => {
                        Alert.alert("Error" + err);
                        console.log(err)
                        // this.setState.IsLoading(false);
                  })
      }

      backAction = () => {

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
      componentDidMount() {
            this.getfatherdata();
            this.getMotherdata();
            this.backHandler = BackHandler.addEventListener(
                  "hardwareBackPress",
                  this.backAction
            );
      }

      componentWillUnmount() {
            this.backHandler.remove();
      }

      submitData = () => {
            // let obj = originalFather[parseInt(myRef.current.selectedIndex())]
            // let selectedFatherId = obj._id.toString()
            // console.log(selectedFatherId) 
            if(this.state.switchValue==0)
            {
                  this.setState({fathermanualentry:true});
                  Fat_name=this.state.FatherName;
                 
            }
            else
            {
                  this.setState({fathermanualentry:false});
                  fat_ID=this.this.refs['pickers'].value()

            }
            console.log("Not entered the None")
            console.log("=============== " + this.refs['picker'].value(), "Fatgerva; is " + this.refs['pickers'].value())
            fetch("http://192.168.43.131:3000/create-person", {
                  method: "post",
                  headers: {
                        'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                        Name: this.state.username,
                        // FatherName: FatherName,
                        // MotherName: MotherName,
                        Gender: this.state.Gendervalue,
                        FatherName: this.state.FatherName,
                        MotherName: this.state.MotherName,
                  })
            }).then(res => res.json())
                  .then(data => {
                        console.log(data);
                        Alert.alert(`Data is saved successfuly`)
                        // navigation.navigate('Home');
                        this.setState.FatherName('')
                        this.setState.MotherName('');
                        this.setState.username('');

                  })
                  .catch(err => {
                        Alert.alert("someting went wrong either user exists or unable to connect to server");
                  })
      }


      dynamictextline = () => {

            var textdata = [];
            for (i = 0; i < this.state.ChildernNo; i++) {
                  console.log("Number ============== " + i)
                  textdata.push(
                        <View>
                              <TextInput
                                    style={styles.inputda}
                                    label="Name"
                                    mode="outlined"
                                    value={this.state.childnametext}
                                    onChangeText={text => this.setState.childnametext(text)}
                              />
                        </View>
                  )
            }
      }
      render() {
            return (
                  <ScrollView style={styles.root}>
                        <TextInput style={styles.inputda}
                              label="Name"
                              mode="outlined"
                              value={this.state.username}
                              onChangeText={username => this.setState({ username })}
                        // userlength={value.length>0}
                        />

                        <View style={styles.radio}>
                              <RadioButton.Group
                                    onValueChange={Gendervalue => this.setState({ Gendervalue })}
                                    value={this.state.Gendervalue}
                              >
                                    <RadioButton value="Male" />
                                    <Text style={styles.radiotext}>Male</Text>
                                    <RadioButton value="Female" />
                                    <Text style={styles.radiotext}>Female</Text>
                                    <RadioButton value="Others" />
                                    <Text style={styles.radiotext}>Others</Text>

                              </RadioButton.Group>
                        </View>
                        <View style={styles.fathers}>
                              <Text style={{ fontSize: 15, padding: 10, fontFamily: 'sans-serif-light' }}>Father Name :</Text>
                              <SwitchSelector style={styles.Switc}
                                    options={[
                                          { label: "Manual Entry", value: "0" },
                                          { label: "Select", value: "1" },
                                    ]}
                                    activeColor={"Black"}
                                    textColor={"Black"}
                                    selectedColor={"white"}
                                    buttonColor={"#607D8B"}
                                    borderColor={"#263238"}
                                    initial={0}
                                    value={this.state.switchValue}
                                    onPress={value => this.toggleSwitch(value)}
                              />
                              {
                                    (this.state.switchValue == "0") ?
                                          <TextInput style={{marginLeft:15,marginRight:10}}
                                                label="FatherName"
                                                mode="outlined"
                                                value={this.state.FatherName}
                                                onChangeText={FatherName => this.setState({ FatherName })}
                                                onEndEditing={this.ShowHideTextComponentViewFather} />
                                          :
                                          <Dropdown style={styles.drop}
                                                label='Select Your Father'
                                                data={this.state.fatherval}
                                                selectedItemColor="#78909C"
                                                ref='pickers'
                                                defaultValue={this.state.fatherdropvalue}
                                          />
                              }
                        </View>

                        <View style={styles.Mothers}>
                              <Text style={{ fontSize: 15, padding: 10, fontFamily: 'sans-serif-light' }}>Mother Name :</Text>
                              <SwitchSelector style={styles.Switc}
                                    options={[
                                          { label: "Manual Entry", value: "0" },
                                          { label: "Select", value: "1" },
                                    ]}
                                    textColor={"Black"}
                                    selectedColor={"white"}
                                    buttonColor={"#607D8B"}
                                    borderColor={"#263238"}
                                    initial={0}
                                    value={this.state.switchValuemother}
                                    onPress={value => this.toggleSwitches(value)}
                              />
                              {
                                    (this.state.switchValuemother == "0") ?
                                          <TextInput style={{marginLeft:15,marginRight:10}}
                                                label="MotherName"
                                                mode="outlined"
                                                value={this.state.MotherName}
                                                //      motherlength={value.length>0}
                                                onChangeText={MotherName => this.setState({ MotherName })}
                                                onEndEditing={this.ShowHideTextComponentViewMother}
                                          /> 
                                          :
                                          <Dropdown
                                                pickerStyle={styles.dropdowns}
                                                dropdownMargins={styles.dropdowns}
                                                label='Select Your Mother'
                                                data={this.state.motherval}
                                                ref='picker'
                                                onChangeText={text => {
                                                      this.ShowHideTextComponentViewMother()
                                                }
                                                }
                                                defaultValue={this.state.motherdropvalue}
                                          />
                              }
                        </View>

                        <View style={styles.radio}>
                              <RadioButton.Group
                                    onValueChange={martialvalue => this.setState({ martialvalue })}
                                    value={this.state.martialvalue}
                              >
                                    <RadioButton value="Bachelor" />
                                    <Text style={styles.radiotext}>Bachelor</Text>
                                    <RadioButton value="Married" />
                                    <Text style={styles.radiotext}>Married</Text>
                              </RadioButton.Group>
                        </View>
                        {this.state.martialvalue == "Married" ?
                              <View>
                                    <TextInput style={styles.inputda}
                                          label="Wife Name"
                                          mode="outlined"
                                          value={this.state.WifeName}
                                          onChangeText={WifeName => this.setState({ WifeName })}
                                    />
                                    <Text style={{ margin: 10, fontSize: 15 }}>Having Children</Text>
                                    <View style={styles.radio}>
                                          <RadioButton.Group
                                                onValueChange={Havingchildren => this.setState({ Havingchildren })}
                                                value={this.state.Havingchildren}
                                          >
                                                <RadioButton value="Yes" />
                                                <Text style={styles.radiotext}>Yes</Text>
                                                <RadioButton value="No" />
                                                <Text style={styles.radiotext}>No</Text>
                                          </RadioButton.Group>
                                    </View>

                                    {this.state.Havingchildren == "Yes" ?
                                          <TextInput
                                                style={styles.inputda}
                                                label="Number Of Children"
                                                mode="outlined"
                                                value={this.state.ChildernNo}
                                                onChangeText={ChildernNo => this.setState({ ChildernNo })}
                                                keyboardType={'numeric'} onFocus={this.dynamictextline()}
                                          /> : null}
                              </View>
                              : null}
                        <View
                              style={{ flex: 1, justifyContent: 'flex-end' }}>
                              <Button
                                    style={styles.submitButtonr}
                                    mode="contained"
                                    onPress={() => this.submitData()}
                                    title="Submit">
                                    Submit
                              </Button>
                        </View>
                  </ScrollView>
            );
      }
}


const styles = StyleSheet.create({
      root:
      {
            flex: 1,
            flexDirection: "column",
            backgroundColor:"#CFD8DC"
      },
      fathers:
      {
            marginLeft: 10,
            marginRight: 10,
            width: "95%",
            height: 160,
            borderRadius: 5,
            backgroundColor: "#B0BEC5"


      },
      dropdowns:
      {
            marginVertical:10,
            marginHorizontal:10,
            paddingHorizontal: 8,
      },
      Switc:
      {
            marginLeft:10,
            marginRight:10,
            marginBottom:10,
      },
      Mothers:
      {     
            marginTop:10,
          marginLeft: 10,
            marginRight: 10,
            width: "95%",
            height: 160,
            borderRadius: 5,
            backgroundColor: "#B0BEC5"  
      },
      switchdrop:
      {
            flex: 1,
            flexDirection: "row",


      },
      swichstyle:
      {
            marginLeft: "53%",
      },

      inputda:
      {
            margin: 5,
            borderColor: 'blue'
      },
      submitButtonr:
      {

            justifyContent: 'flex-end',
            padding: 2,
            marginLeft: 8,
            marginRight: 8,
            borderRadius: 10,
            marginTop: 10,
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
      dropstyle:
      {


      },
      drop:
      {
            // borderTopLeftRadius: 10,
            // borderTopRightRadius: 10,
            // borderBottomLeftRadius: 10,
            // borderBottomRightRadius: 10,
            // padding: 50,


      },
      numericdata: {
            textAlign: 'center',
            height: 40,
            borderRadius: 10,
            borderWidth: 2,
            marginBottom: 10
      }


});
