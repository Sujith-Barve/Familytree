import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import AutoTags from 'react-native-tag-autocomplete';
var suggestionhelp =[];
import {LOGIN_USER_ID} from '../../Constants'
export default class Example extends React.Component {
  constructor(props) {
    super(props);
  this.state = {
    tagsSelected: [],
    selectedvalue : '',
    suggestions: []
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
    // this.setState({ tagsSelected: this.state.tagsSelected.concat([contact]) });
    this.setState({ selectedvalue })
  }

  familysuggestion = () => {
    console.log("I entered Familysuggestion" + LOGIN_USER_ID)

    let params = {
      App_userID : LOGIN_USER_ID,
    };
    
    let query = Object.keys(params)
                 .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
                 .join('&');
    
    let url = 'http://192.168.43.131:3000/familysuggestion' + query;
    console.log("url is" + url)
                fetch(url,{
                  method: "GET",
                  headers: {
                        'Content-Type': 'application/json',
                  }, 
                })
               .then(response => response.json())
               .then(familyname => {
                // originalFamily = familyname;
                // console.log("Resp data is" + originalMother);
                const suggestionhelp = familyname.map(element => {
                      return {
                            name: element.Name,
                            value: element._id,
                      };
                });
                // console.log("Updation Done")

                this.setState({
                  suggestions : [...suggestionhelp]
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

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.autocompleteContainer}>
          <Text style={styles.label}>
           Search Your Family
          </Text>
          <View  style={styles.Autoselect}>
          <AutoTags 
            suggestions={this.state.suggestions}
            tagsSelected={this.state.tagsSelected}
            placeholder="Search Your Family"
            handleAddition={this.handleAddition}
            handleDelete={this.handleDelete}
          />
          </View>
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
  },
  Autoselect :
  {
    marginLeft : 10,
    marginRight:10,
    marginTop:10,

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
  autocompleteContainer: {
    flex: 1,
    left: 20,
    position: 'absolute',
    right: 20,
    top: 100,
    zIndex: 1
  },
  label: {
    color: "#614b63",
     fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
      fontSize:30,
      fontFamily: "Cochin"
      ,fontWeight: "bold",
      textShadowColor : '#00ff00',
      textShadowRadius : 8,
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
  }
});
