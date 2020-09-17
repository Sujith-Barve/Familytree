import React from 'react';
import { Dropdown } from 'react-native-material-dropdown';
import { StyleSheet, Text, View, Alert, ScrollView, Button, TextInput } from 'react-native';
// import AutoTags from 'react-native-tag-autocomplete';
// import { Button, RadioButton, TextInput } from 'react-native-paper'; 
var suggestionhelp = [];
import Select from 'react-native-select-plus';
import { LOGIN_USER_ID } from '../../Constants';
import { Surface, Shape } from '@react-native-community/art';
import * as Progress from 'react-native-progress';

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
      items: [],
      key: null,
      progress: 0,
      indeterminate: true,
      isloading: true,

    };
  }


  onSelectedItemsChange = (key, value) => {
    this.setState({ value: value });
    this.setState({ key: key })
    console.log("key" + key, "value" + value);

  };
  animate() {
    let progress = 0;
    this.setState({ progress });
    setTimeout(() => {
      this.setState({ indeterminate: false });
      setInterval(() => {
        progress += Math.random() / 5;
        if (progress > 1) {
          progress = 1;
        }
        this.setState({ progress });
      }, 500);
    }, 1500);
  }

  familysuggestion = () => {
    console.log("I entered Familysuggestion" + LOGIN_USER_ID)
    fetch('http://192.168.43.131:3000/familysuggestion?' + new URLSearchParams({
      App_userID: LOGIN_USER_ID
    }))
      .then(response => response.json())
      .then(familyname => {
        const suggestionhelp = familyname.map(element => {
          return {
            label: element.Name,
            key: element._id,
          };
        });

        this.setState({
          items: [...suggestionhelp]
        }, () => {
          // console.log("Motherval setstate failed")
        });
        console.log("Hello isloading is false now" + JSON.stringify(this.state.items));
        this.setState({ isloading: false })
      })
      .catch(err => {
        console.log("Error" + err);
      })

  }
  componentDidMount() {
    this.animate();
    this.familysuggestion();
  }

  render() {
    const { navigate } = this.props.navigation;
    const { value, items } = this.state;
    return (
      <View style={styles.container}>
        {this.state.isloading == true ?
          <View>
            <Text style={{
              marginTop: 100,
            }}>Loading Please wait</Text>
            <View style={styles.circles}>
              {/* <Progress.Circle
                style={styles.progress}
                progress={this.state.progress}
                indeterminate={this.state.indeterminate}
              /> */}
              <Progress.Pie
                style={styles.progress}
                progress={this.state.progress}
                indeterminate={this.state.indeterminate}
              />
            </View>
          </View>
          :
          <View>
            <Select
              data={items}
              width={250}
              placeholder="Select a value ..."
              onSelect={this.onSelectedItemsChange.bind(this)}
              search={true}
            />
            {/* <Text>{this.state.key}</Text> */}
            <View style={{ marginTop: 20 }}>
              <Button style={styles.buttonStyle}
                title="Submit"
                // color="#00B0FF" 
                onPress={() =>
                  this.props.navigation.navigate('Display', {
                    key: this.state.key
                  })
                }
              />
            </View>
          </View>
        }
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
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  circles: {
    flex: 1,
    // flexDirection: 'row',
    alignItems: 'center',

  },
  progress: {
    margin: 10,
  },
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