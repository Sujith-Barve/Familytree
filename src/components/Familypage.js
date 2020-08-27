﻿import React, { Component, useState, useEffect , createRef }  from 'react';
import { Alert, View, Text, StyleSheet, TouchableOpacity, value, BackHandler, ScrollView } from 'react-native';
import { TextInput, Button, RadioButton } from 'react-native-paper';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import Icon from 'react-native-vector-icons/Feather';
import DropDownPicker from 'react-native-dropdown-picker';
import { sub } from 'react-native-reanimated';
// myRef = React.createRef();
var originalFather = [];
var originalMother = [];
var i;
// var submitpercentage = 1;
 export default class Aboutscreen extends React.Component{
      constructor(props)
       {
             super(props);
             this.state = {
                  username : '',
                  FatherName :'',
                  MotherName : '',
                  WifeName   : '',
                  ChildrenName : '',
                  isLoading : false,
                  fatherval :[],
                  motherval :[],
                  martialvalue : 'Bachelor',
                  Havingchildren : 'Yes',
                  ChildernNo : 0,
                  childnametext : [],
                };

       }
      //  isEnabled = fatherlength > 0
      //       && motherlength > 0 && username.length > 0;
      // const [motherVisible, setMotherVisiblity] = useState(true);
       fatherArray = [];
       motherArray = [];
       getfatherdata=()=> {
            // this.setState.IsLoading(true);
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
                        if (this.state.fatherval.length == 0) {
                              this.setState({
                                    fatherval: [...this.state.motherval,...fatherArray]
                              }, () => {
                                    console.log("fatherval setstate failed")
                              });
                        }
                        // else {
                        //       this.setState.fatherval(fatherArray)
                        // }
                        console.log("fathername is" + JSON.stringify(originalFather))
                        // this.setState.IsLoading(false);

                  })    
                  .catch(err => { 
                        Alert.alert("Error" + err);
                        console.log(err)
                        // this.setState.IsLoading(false);
                  })
      }

            getMotherdata=()=>{
                  console.log("I entered Motherdata")
            // this.setState.IsLoading(true);
            return fetch('http://192.168.43.131:3000/getMotherdata')
                  .then(response => response.json())
                  .then(mothernames => {
                        originalMother = mothernames;
                        console.log("Resp data is" + originalMother); 
                        const motherArray = originalMother.map(element => {
                              return {
                                    ...element,
                                    label: element.Name, value: element._id,

                              };
                        });
                        console.log("Updation Done")
                        if (this.state.motherval.length == 0) {
            
                              this.setState({
                                    motherval: [...this.state.motherval,...motherArray]
                              }, () => {
                                    console.log("fatherval setstate failed")
                              });
                        }
                        console.log("motherval is" + motherArray)
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
                        this.setState.FatherName('')
                        this.setState.MotherName('');
                        this.setState.username('');
                        
                  })
                  .catch(err => {
                        Alert.alert("someting went wrong either user exists or unable to connect to server");
                  })
      }

             
       dynamictextline=()=>
             {  
      textdata = [];
      for (i = 0; i < ChildernNo; i++) {
            console.log("Number ============== " + i)
            textdata.push(
                  <View>
                        <TextInput
                              style={styles.inputda}
                              label="Name"
                              mode="outlined"
                              value={this.state.childnametext}
                              onChangeText={text => setchildnametext(text)}
                        />
                  </View>
            )
      }
}
      // const funchidedrop = () => 
      // {
      //       if(FatherName.length>0)
      //       {     

      //       }
      // }
      render()
      {
            const { PROP } = this.props;
		const { martialvalue } = this.state;
      return (
            <ScrollView style={styles.root}>
                  <TextInput style={styles.inputda}
                        label="Name"
                        mode="outlined"
                        value={this.state.username}
                        onChangeText={text => this.setState.username(text)}
                        // userlength={value.length>0}

                  />

                  <View >
                        <RadioButton.Group onValueChange={Gendervalue => this.setState.Gendervalue(Gendervalue)} value={this.state.Gendervalue}>
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
                        value={this.state.FatherName}
                        onChangeText={text => this.setState.FatherName(text)}
                        // fatherlength={FatherName.length>0}
                       
                  />
                  <DropDownPicker
                       id="dpd"
                        items={this.state.fatherval}
                        placeholder="Select Father From the list"
                        containerStyle={{ height: 40 }}
                        activeItemStyle={{ backgroundColor: "#38ACEC" }}
                        style={styles.drop}
                        itemStyle={{
                              justifyContent: 'flex-start'
                        }}
                        selectedtLabelStyle={{
                              color: 'blue'
                        }}
                        dropDownStyle={{ backgroundColor: '#fafafa' }}
                        onChangeItem={item => ({
                              language: item.value
                          })}
                  />
                  <TextInput style={styles.inputda}
                        label="MotherName"
                        mode="outlined"
                        value={this.state.MotherName}
                  //      motherlength={value.length>0}
                        onChangeText={text => this.setState.MotherName(text)}
                  />
                  <DropDownPicker
                        items={this.state.motherval}
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
                        <RadioButton.Group value={this.state.martialvalue} onValueChange={value => this.setState.martialvalue(value)} >
                              <View style={styles.radio} >
                                    <RadioButton value="Bachelor" />
                                    <Text style={styles.radiotext}>Bachelor</Text>
                                    <RadioButton value="Married" />
                                    <Text style={styles.radiotext}>Married</Text>

                              </View>

                        </RadioButton.Group>
                        {this.state.martialvalue == "Married" ? <View>
                              <TextInput style={styles.inputda}
                                    label="Wife Name"
                                    mode="outlined"
                                    value={WifeName}
                                    onChangeText={WifeName => this.setState.WifeName(WifeName)}
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
                                          onChangeText={ChildernNo => this.setState.ChildernNo(ChildernNo)}
                                          keyboardType={'numeric'} onFocus={dynamictextline()}
                                    />

                                    : null}
                              {textdata}
                        </View>
                              : null}
                  </View>
                  
                  <View
                        style={{ flex: 1, justifyContent: 'flex-end' }}>
                        <Button 
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
