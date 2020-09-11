import React from 'react';
import { Dropdown } from 'react-native-material-dropdown';
import { StyleSheet, Text, View, Alert } from 'react-native';
import AutoTags from 'react-native-tag-autocomplete';
import { TextInput, Button } from 'react-native-paper'
var suggestionhelp = [];
import { LOGIN_USER_ID } from '../../Constants'
export default class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tagsSelected: [],
      selectedvalue: '',
      suggestions: [],
      //If you don't provide renderTags && filterData props,
      //suggestions must have a 'name' attribute to be displayed && searched for.
    }
  }

  handleDelete = index => {
    //tag deleted, remove from our tags array
    let tagsSelected = this.state.tagsSelected;
    tagsSelected.splice(index, 1);
    this.setState({ tagsSelected });
  }

  handleAddition = contact => {
    //suggestion clicked, push it to our tags array
    if (this.state.tagsSelected.length < 1) {
      this.setState({ tagsSelected: this.state.tagsSelected.concat([contact]) });
    }
    else {
      Alert.alert("You can Enter Only One Family")
      console.log("Enter Only One family to proceed")
    }
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
  // submitData = () => {

  // }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.autocompleteContainer}>
          <Text style={styles.label}>
            Search Your Family
          </Text>
          <View style={styles.Autoselect}>
            <AutoTags style={styles.autotags}
              suggestions={this.state.suggestions}
              tagsSelected={this.state.tagsSelected}
              placeholder="Search Your Family"
              handleAddition={this.handleAddition}
              handleDelete={this.handleDelete}
            />
          </View>
          <View style={{ marginTop: 10, }}>
            <Button
              style={styles.submitButtonr}
              mode="contained"
              onPress={() => this.props.navigation.navigate('AddFam', {
                suggestions: this.state.suggestions,
              })}
              title="Submit">
              Submit
            </Button>
          </View>
        </View>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  autotags:
  {
    // marginLeft: 10,
    // marginRight: 10,
    width: "100%",
    borderRadius: 10,
    borderWidth: 2,
    padding: 10,
    borderColor: '#b9bdba'

  },
  header: {
    backgroundColor: '#9d30a5',
    height: 80,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
    marginBottom: 10,
  },
  // autocompleteContainer: {
  //   flex: 1,
  //   left: 20,
  //   position: 'absolute',
  //   right: 20,
  //   top: 100,
  //   zIndex: 1,
  // },
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
  label: {
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 30,
    fontFamily: "Cochin"
    , fontWeight: "bold",
    // textShadowColor: '#00ff00',
    textShadowRadius: 8,
  },
  messageContainer: {
    marginTop: 160,
    height: 200,
    alignSelf: 'stretch',
    marginLeft: 20,
    marginRight: 20
  },
  message: {
    backgroundColor: '#efeaea',
    height: 200,
    textAlignVertical: 'top',
  },
  submitButtonr:
  {
    // justifyContent: 'flex-end',
    padding: 2,
    marginTop: 20,
    marginLeft: 8,
    marginRight: 8,
    borderRadius: 10,
    // marginTop: 10,
    width: "92%"
  },
});