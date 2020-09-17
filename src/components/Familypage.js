﻿﻿import React, { Component, useState, useEffect, createRef } from 'react';
import { Alert, View, Text, StyleSheet, TouchableOpacity, value, BackHandler, ScrollView } from 'react-native';
import { TextInput, Button, RadioButton } from 'react-native-paper';
import SwitchSelector from "react-native-switch-selector";
import DateTimePicker from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/Feather';
// import DropDownPicker from 'react-native-dropdown-picker';
import { Dropdown } from 'react-native-material-dropdown';
import withUnmounted from '@ishawnwang/withunmounted'
import { sub } from 'react-native-reanimated';
import { LOGIN_USER_ID } from '../../Constants'
var originalFather = [];
var originalMother = [];
var i, manualentry, Fat_name, fat_ID, Mot_ID;

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
                  switchValue: '0',
                  switchValuemother: '0',
                  fathermanualentry: true,
                  mothermanualentry: true,
                  ChildName: '',
                  ChildGendervalue: 'Male',
                  Age: null,
                  isDateTimePickerVisible: false,
                  selecteddate: ''
                  // enabletextInput:'TextInputv',
                  // enabletextInp : 'TextInputv',
            };
      }
      //  isEnabled = fatherlength > 0
      //       && motherlength > 0 && username.length > 0;
      // const [motherVisible, setMotherVisiblity] = useState(true);


      fatherArray = [];
      motherArray = [];

      getfatherdata = () => {
            // this.setState.IsLoading(true);
            return fetch('http://192.168.43.131:3000/getfatherdata?' + new URLSearchParams({
                  Age: this.state.Age
            }))
                  .then(response => response.json())
                  .then(fathernames => {
                        originalFather = fathernames;
                        // console.log("fathername is" + JSON.stringify(originalFather))
                        const fatherArray = originalFather.map(element => {
                              return {
                                    label: element.Name,
                                    value: element._id,
                              };
                        });
                        // console.log(JSON.stringify(fatherArray))
                        this.setState({
                              fatherval: [...fatherArray]
                        }, () => {
                              // console.log("fatherval setstate failed" + JSON.stringify(this.state.fatherval));
                        });

                        // else {
                        //       this.setState.fatherval(fatherArray)
                        // }

                        // this.setState.IsLoading(false);

                  })
                  .catch(err => {
                        console.log("Error" + err);
                        // console.log(err)
                        // this.setState.IsLoading(false);
                  })
      }

      getMotherdata = () => {
            // console.log("I entered Motherdata")
            // this.setState.IsLoading(true);
            return fetch('http://192.168.43.131:3000/getMotherdata?' + new URLSearchParams({
                  Age: this.state.Age
            }))
                  .then(response => response.json())
                  .then(mothernames => {
                        originalMother = mothernames;
                        // console.log("Resp data is" + originalMother);
                        const motherArray = originalMother.map(element => {
                              return {
                                    label: element.Name,
                                    value: element._id,
                              };
                        });
                        // console.log("Updation Done")

                        this.setState({
                              motherval: [...motherArray]
                        }, () => {
                              // console.log("Motherval setstate failed")
                        });

                        // console.log("motherval is" + JSON.stringify(this.state.motherval))
                        // else this.setState.motherval(motherArray)
                        // console.log("MotherName is" + JSON.stringify(originalMother))
                        // this.setState.IsLoading(false);

                  })
                  .catch(err => {
                        console.log("Error" + err);
                        // console.log(err)
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
            this.getMotherdata();
            this.getfatherdata();
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
            if (this.state.switchValue == "0") {
                  this.setState({ fathermanualentry: true });
                  // console.log("Switch value is zero" + this.state.fathermanualentry)

            }
            else {
                  this.setState({ fathermanualentry: false });
                  // console.log("Switch value is 1" + this.state.fathermanualentry)
                  fat_ID = this.refs['pickers'].value();
                  // console.log("fat_ID is " + fat_ID)
            }

            if (this.state.switchValuemother == "0") {
                  this.setState({ mothermanualentry: true })
            }
            else {
                  this.setState({ mothermanualentry: false })
                  Mot_ID = this.refs['picker'].value();
            }
            console.log("Login User Id is " + LOGIN_USER_ID)
            // console.log("Entered data is ",this.state.username,
            // "Manual ENtry Father"+this.state.fathermanualentry,
            // "Father Name is "+this.state.FatherName,
            // "++++++=====MotherName is "+this.state.MotherName,
            // "Father Id is" +fat_ID,
            // "Mother ID is" +Mot_ID)
            // console.log("=============== " + this.refs['picker'].value(), "Fatgerva; is " + this.refs['pickers'].value())
            fetch("http://192.168.43.131:3000/create-person", {
                  method: "post",
                  headers: {
                        'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                        App_userID: LOGIN_USER_ID,
                        Name: this.state.username,
                        ManualEntryFather: this.state.fathermanualentry,
                        ManualEntryMother: this.state.mothermanualentry,
                        FatherName: this.state.FatherName,
                        MotherName: this.state.MotherName,
                        Gender: this.state.Gendervalue,
                        Father_ID: fat_ID,
                        Mother_ID: Mot_ID,
                        MarriageStatus: this.state.martialvalue,
                        WifeName: this.state.WifeName,
                        ChildName: this.state.ChildName,
                        ChildGender: this.state.ChildGendervalue,
                        Age: this.state.Age,
                        ChildGender: this.state.Gendervalue
                  })
            }).then(res => res.json())
                  .then(data => {
                        console.log(data);
                        Alert.alert(`Data is saved successfuly`)
                        // navigation.navigate('Home');
                        this.setState({ FatherName: '' });
                        this.setState({ MotherName: '' });
                        this.setState({ username: '' })
                        this.setState({ Gender: 'Male' })
                        this.setState({ martialvalue: 'Bachelor' })
                        this.setState({ Age: null })
                        this.setState({ WifeName: '' })
                        this.setState({ Havingchildren: 'No' })
                        this.getMotherdata();
                        this.getfatherdata();

                  })
                  .catch(err => {
                        Alert.alert("someting went wrong either user exists or unable to connect to server");
                  })
      }

      getDropdownDataServer = () => {
            console.log("Entered The getdata ][[[[[[[[[[[[[[[[[[[]]]]]]")
            this.getMotherdata();
            this.getfatherdata();
      }

      _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

      _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

      _handleDatePicked = (pickeddate) => {
            day = pickeddate.getDate();
            month = pickeddate.getMonth();
            year = pickeddate.getFullYear();
            console.log('A date has been picked: ' + day + '-' + month + '-' + year);
            exdate = day + '-' + month + '-' + year
            this._hideDateTimePicker();
            this.setState({ selecteddate: day + '-' + month + '-' + year })
            Alert.alert("Your Date of Birth is " + this.state.selecteddate)
      };

      onFocus = () => {
            this._handleDatePicked();
      }






      dynamictextline = () => {
            console.log("Entered Dynamic Text line")

            // var textdata = [];
            // for (i = 0; i < this.state.ChildernNo; i++) {
            //       console.log("Number ============== " + i)
            //       textdata.push(
            //             <View>
            //                   <TextInput
            //                         style={styles.inputda}
            //                         label="Name"
            //                         mode="outlined"
            //                         value={this.state.childnametext}
            //                         onChangeText={text => this.setState.childnametext(text)}
            //                   />
            //             </View>
            //       )
            // }
      }
      // showDatePicker = () => {
      //       this.setState({ DatePickerVisibility: true });
      // };

      // hideDatePicker = () => {
      //       this.setState({ DatePickerVisibility: false });
      // };

      // handleConfirm = (date) => {
      //       console.warn("A date has been picked: ", date);
      //       this.hideDatePicker();
      // };
      render() {
            return (
                  <ScrollView style={styles.root}>
                        <View style={styles.usersback}>
                              <TextInput style={styles.inputda}
                                    label="Name"
                                    borderColor="#455A64"

                                    selectionColor="#455A64"
                                    mode="outlined"
                                    value={this.state.username}
                                    onChangeText={username => this.setState({ username })}
                              // userlength={value.length>0}
                              />
                              <Text style={{
                                    fontSize: 15, paddingTop: 10,
                                    paddingLeft: 10,
                                    paddingRight: 10, fontFamily: 'sans-serif-light'
                              }}>Select Your Gender :</Text>
                              <View style={styles.radio}>
                                    <RadioButton.Group
                                          onValueChange={Gendervalue => this.setState({ Gendervalue })}
                                          value={this.state.Gendervalue}
                                    >
                                          <RadioButton color="#263238" value="Male" />
                                          <Text style={styles.radiotext}>Male</Text>
                                          <RadioButton color="#263238" value="Female" />
                                          <Text style={styles.radiotext}>Female</Text>
                                          <RadioButton color="#263238" value="Others" />
                                          <Text style={styles.radiotext}>Others</Text>

                                    </RadioButton.Group>
                              </View>
                              <View>
                                    {/* <TextInput style={styles.inputda}
                              label="Age"
                              borderColor="#455A64"
                              
                              selectionColor="#455A64"
                              mode="outlined"
                              value={this.state.Age}
                              onChangeText={Age => this.setState({ Age })}
                              keyboardType = 'number-pad'
                              onEndEditing={this.getDropdownDataServer}
                        // userlength={value.length>0}
                        /> */}
                                    <TextInput
                                          mode={"outlined"}
                                          style={{ marginLeft: 15, marginRight: 10 }}
                                          placeholder="Date of Birth"
                                          onFocus={() => this._showDateTimePicker()}
                                          value={this.state.selecteddate}

                                    />
                                    {/* //--------------------------------------DateTimePicker */}
                                    <DateTimePicker
                                          isVisible={this.state.isDateTimePickerVisible}
                                          onConfirm={this._handleDatePicked}
                                          onCancel={this._hideDateTimePicker}
                                          mode={'date'}
                                          datePickerModeAndroid={'spinner'}

                                    />
                                    {/* <DatePicker
                                          style={styles.date}
                                          date={this.state.date} //initial date from state
                                          mode="date" //The enum of date, datetime and time
                                          placeholder="select date"
                                          format="DD-MM-YYYY"
                                          minDate="01-01-2016"
                                          maxDate="01-01-2019"
                                          confirmBtnText="Confirm"
                                          cancelBtnText="Cancel"
                                          customStyles={{
                                                dateIcon: {
                                                      position: 'absolute',
                                                      left: 0,
                                                      top: 4,
                                                      marginLeft: 0
                                                },
                                                dateInput: {
                                                      marginLeft: 36
                                                }
                                          }}
                                          onDateChange={(date) => { this.setState({ date: date }) }}
                                    /> */}
                              </View>
                        </View>
                        <View style={styles.fathers}>
                              <Text style={{ fontSize: 15, padding: 10, fontFamily: 'sans-serif-light' }}>Father Name :</Text>
                              <SwitchSelector style={styles.Switc}
                                    options={[
                                          { label: "Manual Entry", value: "0" },
                                          { label: "Select", value: "1" },
                                    ]}
                                    activeColor={"#000000"}
                                    textColor={"#000000"}
                                    selectedColor={"#FFFFFF"}
                                    buttonColor={"#607D8B"}
                                    borderColor={"#263238"}
                                    initial={0}
                                    value={this.state.switchValue}
                                    onPress={value => this.setState({ switchValue: value })}
                              />
                              {
                                    (this.state.switchValue == "0") ?
                                          <TextInput style={{ marginLeft: 15, marginRight: 10 }}
                                                label="FatherName"
                                                mode="outlined"
                                                value={this.state.FatherName}
                                                onChangeText={FatherName => this.setState({ FatherName })}
                                          // onEndEditing={this.ShowHideTextComponentViewFather}
                                          />
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
                                    textColor={"#000000"}
                                    selectedColor={"#FFFFFF"}
                                    buttonColor={"#607D8B"}
                                    borderColor={"#263238"}
                                    initial={0}
                                    value={this.state.switchValuemother}
                                    onPress={value => this.setState({ switchValuemother: value })}
                              />
                              {
                                    (this.state.switchValuemother == "0") ?
                                          <TextInput style={{ marginLeft: 15, marginRight: 10 }}
                                                label="MotherName"
                                                mode="outlined"
                                                value={this.state.MotherName}
                                                //      motherlength={value.length>0}
                                                onChangeText={MotherName => this.setState({ MotherName })}

                                          />
                                          :
                                          <Dropdown
                                                label='Select Your Mother'
                                                data={this.state.motherval}
                                                ref='picker'
                                                // onChangeText={text => {
                                                //       this.ShowHideTextComponentViewMother()
                                                // }
                                                // }
                                                defaultValue={this.state.motherdropvalue}
                                          />
                              }
                        </View>

                        <View style={styles.radio}>
                              <RadioButton.Group
                                    onValueChange={martialvalue => this.setState({ martialvalue })}
                                    value={this.state.martialvalue}
                              >
                                    <RadioButton color="#263238" value="Bachelor" />
                                    <Text style={styles.radiotext}>Bachelor</Text>
                                    <RadioButton color="#263238" value="Married" />
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
                                                <RadioButton color="#263238" value="Yes" />
                                                <Text style={styles.radiotext}>Yes</Text>
                                                <RadioButton color="#263238" value="No" />
                                                <Text style={styles.radiotext}>No</Text>
                                          </RadioButton.Group>
                                    </View>

                                    {this.state.Havingchildren == "Yes" ?
                                          <View style={styles.fathers}>
                                                <TextInput style={styles.inputda}
                                                      label="Child Name"
                                                      mode="outlined"
                                                      value={this.state.ChildName}
                                                      onChangeText={ChildName => this.setState({ ChildName })}
                                                />
                                                <Text style={{
                                                      fontSize: 15, padding: 10,
                                                      fontFamily: 'sans-serif-light'
                                                }}>Select Child Gender :</Text>

                                                <View style={styles.radio}>
                                                      <RadioButton.Group
                                                            onValueChange={ChildGendervalue => this.setState({ ChildGendervalue })}
                                                            value={this.state.ChildGendervalue}
                                                      >
                                                            <RadioButton color="#263238" value="Male" />
                                                            <Text style={styles.radiotext}>Male</Text>
                                                            <RadioButton color="#263238" value="Female" />
                                                            <Text style={styles.radiotext}>Female</Text>
                                                            <RadioButton color="#263238" value="Others" />
                                                            <Text style={styles.radiotext}>Others</Text>
                                                      </RadioButton.Group>
                                                </View>

                                          </View>
                                          : null}
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
      usersback:
      {
            marginLeft: 10,
            marginTop: 10,
            marginRight: 20,
            width: "95%",
            height: 215,
            borderRadius: 5,
            backgroundColor: "#CFD8DC"


      },
      fathers:
      {
            marginLeft: 10,
            marginTop: 10,
            marginRight: 20,
            width: "95%",
            height: 160,
            borderRadius: 5,
            backgroundColor: "#CFD8DC"


      },
      dropdowns:
      {
            marginVertical: 10,
            marginHorizontal: 10,
            paddingHorizontal: 8,
      },
      Switc:
      {
            marginLeft: 10,
            marginRight: 10,
            marginBottom: 10,
      },
      Mothers:
      {
            marginTop: 10,
            marginLeft: 10,
            marginRight: 10,
            width: "95%",
            height: 160,
            borderRadius: 5,
            backgroundColor: "#CFD8DC"
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
      date:
      {
            marginLeft: 10,
            marginRight: 10,
            width: '95%',
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
            marginTop: 5,
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
