// import React from 'react';
// import { StyleSheet, Button, View, SafeAreaView,TouchableOpacity, Text, Alert,Image } from 'react-native';
// import { createAppContainer } from 'react-navigation';
// import { createStackNavigator} from 'react-navigation-stack';
// // const Separator = () => (
// //   <View style={styles.separator} />
// // );

// export default function Home({navigation})
// {

//   const clickHandler = () => {
//     navigation.navigate('AddFam')
//     };

//     return (
//       <SafeAreaView style={styles.container}>
//     <View>
//       <Text style={styles.title}>
//         Add Family
//       </Text>
//     </View>
//     <TouchableOpacity
//           activeOpacity={0.7}
//           onPress={clickHandler}
//           style={styles.TouchableOpacityStyle}>
//           <Image
//             //We are making FAB using TouchableOpacity with an image
//             //We are using online image here
//              source={{
// uri:'https://raw.githubusercontent.com/AboutReact/sampleresource/master/plus_icon.png',
//             }}
//             //You can use you project image Example below
//             //source={require('./images/float-add-icon.png')}
//             style={styles.FloatingButtonStyle}
//           />
//         </TouchableOpacity>
//   </SafeAreaView>
//     )
//   }


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // justifyContent: 'center',
// //     borderColor :"black",
// //     borderStyle : "dashed",
// //     borderWidth : 5,
// //     borderTopLeftRadius:  60,
// // borderBottomRightRadius:  60,
// margin :10,
//   },
//   title: {
//     textAlign: 'center',
//     fontSize:30,
//     fontFamily: "Cochin"
//     ,fontWeight: "bold",
//     textShadowColor : '#00ff00',
//     textShadowRadius : 8,
//     marginTop : 100,
//   },
//   fixToText: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   separator: {
//     marginVertical: 8,
//     borderBottomColor: '#737373',
//     borderBottomWidth: StyleSheet.hairlineWidth,
//   },
//   TouchableOpacityStyle: {
//     position: 'absolute',
//     width: 50,
//     height: 50,
//     alignItems: 'center',
//     justifyContent: 'center',
//     right: 140,
//     top: 180,
//   },

//   FloatingButtonStyle: {
//     resizeMode: 'contain',
//     width: 80,
//     height: 70,
//     //backgroundColor:'black'
//   },
// });


import React, { Component } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';


class MyClass extends Component {

  constructor(props) {
    super(props);
    this.state = {
      textInput: [],
      inputData: []
    }
  }

  //function to add TextInput dynamically
  addTextInput = (index) => {
    let textInput = this.state.textInput;
    textInput.push(<TextInput style={styles.textInput}
      onChangeText={(text) => this.addValues(text, index)} />);
    this.setState({ textInput });
  }

  //function to remove TextInput dynamically
  removeTextInput = () => {
    let textInput = this.state.textInput;
    let inputData = this.state.inputData;
    textInput.pop();
    inputData.pop();
    this.setState({ textInput, inputData });
  }

  //function to add text from TextInputs into single array
  addValues = (text, index) => {
    let dataArray = this.state.inputData;
    let checkBool = false;
    if (dataArray.length !== 0) {
      dataArray.forEach(element => {
        if (element.index === index) {
          element.text = text;
          checkBool = true;
        }
      });
    }
    if (checkBool) {
      this.setState({
        inputData: dataArray
      });
    }
    else {
      dataArray.push({ 'text': text, 'index': index });
      this.setState({
        inputData: dataArray
      });
    }
  }

  //function to console the output
  getValues = () => {
    console.log('Data', this.state.inputData);
  }


  render() {
    return (
      <View>
        <View style={styles.row}>
          <View style={{ margin: 10 }}>
            <Button title='Add' onPress={() => this.addTextInput(this.state.textInput.length)} />
          </View>
          <View style={{ margin: 10 }}>
            <Button title='Remove' onPress={() => this.removeTextInput()} />
          </View>
        </View>
        {this.state.textInput.map((value) => {
          return value
        })}
        <Button title='Get Values' onPress={() => this.getValues()} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  buttonView: {
    flexDirection: 'row'
  },
  textInput: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    margin: 20
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
});

export default MyClass;
