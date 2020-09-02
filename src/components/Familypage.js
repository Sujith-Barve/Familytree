﻿﻿import React, { Component, useState, useEffect, createRef } from 'react';
import { Alert, View, Text, StyleSheet, TouchableOpacity, value, BackHandler, ScrollView } from 'react-native';
import { TextInput, Button, RadioButton } from 'react-native-paper';
// import RadioForm,{RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import Icon from 'react-native-vector-icons/Feather';
import DropDownPicker from 'react-native-dropdown-picker';
import { Dropdown } from 'react-native-material-dropdown';

import withUnmounted from '@ishawnwang/withunmounted'
import { sub } from 'react-native-reanimated';
var originalFather = [];
var originalMother = [];
var i;
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
                  enabletextInput:'TextInputv',
                  enabletextInp : 'TextInputv',
            };
      }
      //  isEnabled = fatherlength > 0
      //       && motherlength > 0 && username.length > 0;
      // const [motherVisible, setMotherVisiblity] = useState(true);

    
      fatherArray = [];
      motherArray = [];
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
                              fatherval: [{value:'None',label:'None'},...fatherArray]
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
                        <View style={styles.radio}>
                              <RadioButton.Group
                                    onValueChange={enabletextInp => this.setState({ enabletextInp })}
                                    value={this.state.enabletextInp}
                              >
                                    <RadioButton value="TextInputv" />
                                    <Text style={styles.radiotext}>TextInput</Text>
                                    <RadioButton value="Dropdownv" />
                                    <Text style={styles.radiotext}>Dropdown</Text>

                              </RadioButton.Group>
                              </View>
                        <TextInput style={styles.inputda}
                                    label="FatherName"
                                    mode="outlined"
                                    value={this.state.FatherName}
                                    onChangeText={FatherName => this.setState({ FatherName })}
                                    onEndEditing={this.ShowHideTextComponentViewFather}
                              // fatherlength={FatherName.length>0}

                              /> 
                            
                               <Dropdown  style={styles.drop}
                                    label='Select Your Father'
                                    data={this.state.fatherval}
                                    selectedItemColor="coral"
                                    ref='pickers'
                                    animationDuration='350'
                                    dropdownMargins={'10'}
                                    onChangeText={text => {
                                          this.ShowHideTextComponentFather()
                                    }
                                    }
                                    defaultValue={this.state.fatherdropvalue}
                                    />
                               <View style={styles.radio}>
                              <RadioButton.Group
                                    onValueChange={enabletextInput => this.setState({ enabletextInput })}
                                    value={this.state.enabletextInput}
                              >
                                    <RadioButton value="TextInputv" />
                                    <Text style={styles.radiotext}>TextInput</Text>
                                    <RadioButton value="Dropdownv" />
                                    <Text style={styles.radiotext}>Dropdown</Text>

                              </RadioButton.Group>
                              </View>
                                    <TextInput style={styles.inputda}
                                          label="MotherName"
                                          mode="outlined"
                                          value={this.state.MotherName}
                                          //      motherlength={value.length>0}
                                          onChangeText={MotherName => this.setState({ MotherName })}
                                          onEndEditing={this.ShowHideTextComponentViewMother}
                                    />
                                    <Dropdown
                                          label='Select Your Mother'
                                          pickerStyle={styles.dropstyle}
                                          data={this.state.motherval}
                                          ref='picker'
                                          onChangeText={text => {
                                                this.ShowHideTextComponentViewMother()
                                          }
                                          }
                                          defaultValue={this.state.motherdropvalue}
                                    />

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
