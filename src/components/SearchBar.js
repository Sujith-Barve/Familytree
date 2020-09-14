import React from 'react';
import { Dropdown } from 'react-native-material-dropdown';
import { StyleSheet, Text, View, Alert, ScrollView, Button, TextInput } from 'react-native';
// import AutoTags from 'react-native-tag-autocomplete';
// import { Button, RadioButton, TextInput } from 'react-native-paper'; 
var suggestionhelp = [];
import Select from 'react-native-select-plus';
import { LOGIN_USER_ID } from '../../Constants'
export default class Searchbar extends React.Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     tagsSelected: [],
  //     selectedvalue: '',
  //     suggestions: [],
  //     username: 'Hello'
  //     //If you don't provide renderTags && filterData props,
  //     //suggestions must have a 'name' attribute to be displayed && searched for.
  //   }
  // }
  constructor(props) {
    //constructor to set default state  
    super(props);
    this.state = {
      username: '',
      value: null,
      items: [
        { key: 1, section: true, label: "Fruits" },
        { key: 2, label: "Red Apples" },
        { key: 3, label: "Cherries" },
        { key: 4, label: "Cranberries" },
        { key: 5, label: "Pink Grapefruit" },
        { key: 6, label: "Raspberries" },
        { key: 7, section: true, label: "Vegetables" },
        { key: 8, label: "Beets" },
        { key: 9, label: "Red Peppers" },
        { key: 10, label: "Radishes" },
        { key: 11, label: "Radicchio" },
        { key: 12, label: "Red Onions" },
        { key: 13, label: "Red Potatoes" },
        { key: 14, label: "Rhubarb" },
        { key: 15, label: "Tomatoes" }
      ]
    };
  }

  onSelectedItemsChange = (key, value) => {
    this.setState({ value: value });
  };


  familysuggestion = () => {
    console.log("I entered Familysuggestion" + LOGIN_USER_ID)
    fetch('http://192.168.43.131:3000/familysuggestion?' + new URLSearchParams({
      App_userID: LOGIN_USER_ID
    }))
      .then(response => response.json())
      .then(familyname => {
        const suggestionhelp = familyname.map(element => {
          return {
            name: element.Name,
            value: element._id,
          };
        });

        this.setState({
          suggestions: [...suggestionhelp]
        }, () => {
          // console.log("Motherval setstate failed")
        });

      })
      .catch(err => {
        console.log("Error" + err);
        // console.log(err)
        // this.setState.IsLoading(false);
      })
  }
  componentDidMount() {
    this.familysuggestion();
  }
  // Buttonpressed() {
  //   // console.log("username isddadbasjkb " + this.state.username)
  //   this.props.navigation.navigate(
  //     'DisplayFamily',
  //     {
  //       // ...this.state.suggestions,
  //       username: this.state.username
  //     }
  //   )
  //   console.log("username is " + this.state.username)
  // }
  // submitData = () => {

  // }
  render() {
    const { navigate } = this.props.navigation;
    const { value, items } = this.state;
    return (
      // <View style={styles.container}>
      //   <Text style={styles.label}>
      //     Search Your Family
      //     </Text>
      //   {/* <View style={styles.Autoselect}> */}
      //   {/* <AutoTags style={styles.autotags}
      //       suggestions={this.state.suggestions}
      //       tagsSelected={this.state.tagsSelected}
      //       placeholder="Search Your Family"
      //       handleAddition={this.handleAddition}
      //       handleDelete={this.handleDelete}
      //     /> */}
      //   <TextInput style={styles.textInput}
      //     label="Name"
      //     borderColor="#00000"
      //     selectionColor="#455A64"
      //     mode="outlined"
      //     value={this.state.username}
      //     onChangeText={username => this.setState({ username })}
      //   // userlength={value.length>0}
      //   />
      //   {/* </View> */}
      //   <Button
      //     style={styles.submitButtonr}
      //     mode="contained"
      //     onPress={() => {
      //       this.props.navigation.navigate('DisplayFamily',
      //         { username: this.state.username }
      //       )
      //       console.log("Username is", this.state.username)
      //     }
      //     }
      //     title="Submit">
      //     Submit
      //       </Button>
      // </View >



      <View style={styles.container}>
        {/*Input to get the value from the user*/}
        {/* <TextInput
          value={this.state.username}
          onChangeText={username => this.setState({ username })}
          placeholder={'Enter Any value'}
          style={styles.textInput}
        /> */}
        <Select
          data={items}
          width={250}
          placeholder="Select a value ..."
          onSelect={this.onSelectedItemsChange.bind(this)}
          search={true}
        />
        {/* <View>
          <Text>{value}</Text>
        </View> */}
        <View style={styles.buttonStyle}>
          <Button
            title="Submit"
            // color="#00B0FF"  
            onPress={() =>
              this.props.navigation.navigate('Display', {
                userName: this.state.username,
                otherParam: '101',
              })
            }
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 16,
  },
  textInput: {
    height: 45, width: "95%", borderColor: "gray", borderWidth: 1, fontSize: 20,
  },
  buttonStyle: {
    width: "93%",
    marginTop: 50,
    backgroundColor: "red",
  }
});
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//   },
//   autotags:
//   {
//     // marginLeft: 10,
//     // marginRight: 10,
//     width: "100%",
//     borderRadius: 10,
//     borderWidth: 2,
//     padding: 10,
//     borderColor: '#b9bdba'

//   },
//   textInput:
//   {
//     width: '96%',
//     borderRadius: 10,
//     height: 50,

//   },
//   header: {
//     backgroundColor: '#9d30a5',
//     height: 80,
//     alignSelf: 'stretch',
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingTop: 15,
//     marginBottom: 10,
//   },
//   // autocompleteContainer: {
//   //   flex: 1,
//   //   left: 20,
//   //   position: 'absolute',
//   //   right: 20,
//   //   top: 100,
//   //   zIndex: 1,
//   // },
//   usersback:
//   {
//     marginLeft: 10,
//     marginTop: 10,
//     marginRight: 20,
//     width: "95%",
//     height: 215,
//     borderRadius: 5,
//     backgroundColor: "#CFD8DC"
//   },
//   label: {
//     fontWeight: 'bold',
//     marginBottom: 10,
//     textAlign: 'center',
//     fontSize: 30,
//     fontFamily: "Cochin"
//     , fontWeight: "bold",
//     // textShadowColor: '#00ff00',
//     textShadowRadius: 8,
//     // flex: 2,

//   },
//   messageContainer: {
//     marginTop: 160,
//     // height: 200,
//     alignSelf: 'stretch',
//     marginLeft: 20,
//     marginRight: 20
//   },
//   message: {
//     backgroundColor: '#efeaea',
//     height: 200,
//     textAlignVertical: 'top',
//   },
//   submitButtonr:
//   {
//     padding: 2,
//     marginTop: 20,
//     marginLeft: 8,
//     marginRight: 8,
//     borderRadius: 10,
//     // marginTop: 10,
//     width: "92%",
//     // flex: 1,
//   },
// });