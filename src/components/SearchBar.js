import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight
} from "react-native";
import AutoTags from "react-native-tag-autocomplete";

const contacts = [
  {
    email: "mrjoeroddy@gmail.com",
    fullName: "Joe Roddy"
  },
  {
    email: "janedoe@aol.com",
    fullName: "Jane Doe"
  },
  {
    email: "john@doe.gov",
    fullName: "John Doe"
  },
  {
    email: "hungrybox@teamliquid.com",
    fullName: "Juan Debiedma"
  }
];

export default class CustomExample extends React.Component {
  state = {
    tagsSelected: [],
    suggestions: contacts
  };

  customFilterData = query => {
    //override suggestion filter, we can search by specific attributes
    query = query.toUpperCase();
    let searchResults = this.state.suggestions.filter(s => {
      return (
        s.fullName.toUpperCase().includes(query) ||
        s.email.toUpperCase().includes(query)
      );
    });
    return searchResults;
  };

  customRenderTags = tags => {
    //override the tags render
    return (
      <View style={styles.customTagsContainer}>
        {this.state.tagsSelected.map((t, i) => {
          return (
            <TouchableHighlight
              key={i}
              style={styles.customTag}
              onPress={() => this.handleDelete(i)}
            >
              <Text style={{ color: "white" }}>
                {i}) {t.fullName || t.email}
              </Text>
            </TouchableHighlight>
          );
        })}
      </View>
    );
  };

  customRenderSuggestion = suggestion => {
    //override suggestion render the drop down
    const name = suggestion.fullName;
    return (
      <Text>
        {name.substr(0, name.indexOf(" "))} - {suggestion.email}
      </Text>
    );
  };

  handleDelete = index => {
    //tag deleted, remove from our tags array
    let tagsSelected = this.state.tagsSelected;
    tagsSelected.splice(index, 1);
    this.setState({ tagsSelected });
  };

  handleAddition = contact => {
    //suggestion clicked, push it to our tags array
    this.setState({ tagsSelected: this.state.tagsSelected.concat([contact]) });
  };

  onCustomTagCreated = userInput => {
    //user pressed enter, create a new tag from their input
    const contact = {
      email: userInput,
      fullName: null
    };
    this.handleAddition(contact);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.autocompleteContainer}>
          <Text style={styles.textstyle}>Search Your Family</Text>
          <View style={styles.Autocontainer}> 
           <AutoTags
            //required
            suggestions={this.state.suggestions}
            tagsSelected={this.state.tagsSelected}
            handleAddition={this.handleAddition}
            handleDelete={this.handleDelete}
            //optional
            placeholder="eg..Sujith Family.."
            filterData={this.customFilterData}
            renderSuggestion={this.customRenderSuggestion}
            renderTags={this.customRenderTags}
            onCustomTagCreated={this.onCustomTagCreated}
            createTagOnSpace
          />
          </View>
        </View>
        {/* <View style={styles.messageContainer}>
          <Text style={styles.label}>Message</Text>
          <TextInput
            style={styles.message}
            underlineColorAndroid="rgba(0,0,0,0)"
          />
        </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textstyle: {
    textAlign: 'center',
fontSize:30,
fontFamily: "Cochin"
,fontWeight: "bold",
textShadowColor : '#00ff00',
textShadowRadius : 8,
marginTop :10,
marginBottom:10,
},
Autocontainer :
{
  marginLeft:10,
},
  customTagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    backgroundColor: "#efeaea",
    width: 300
  },
  customTag: {
    backgroundColor: "#9d30a5",
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    marginLeft: 5,
    marginTop: 5,
    borderRadius: 30,
    padding: 8
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center"
  },
  header: {
    backgroundColor: "#9d30a5",
    height: 80,
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 15,
    marginBottom: 10
  },
  autocompleteContainer: {
    flex: 1,
    left: 20,
    position: "absolute",
    right: 20,
    top: 80,
    zIndex: 1
  },
  label: {
    color: "#614b63",
    fontWeight: "bold",
    marginBottom:10,

  },
  messageContainer: {
    marginTop: 160,
    height: 200,
    alignSelf: "stretch",
    marginLeft: 20,
    marginRight: 20
  },
  message: {
    backgroundColor: "#efeaea",
    height: 200,
    textAlignVertical: "top"
  }
});

// import React, { Component,useState,useEffect } from 'react';
// import { Button, View, Text,TextInput,StyleSheet,TouchableOpacity,FlatList} from 'react-native';
// import {createAppContainer } from 'react-navigation';
// import { createStackNavigator} from 'react-navigation-stack';


// export default function SearchFamily({navigation}) {
//     const [username, setusername] = useState('');
//     return (
//       <View  style={styles.container}>
//         <Text style={styles.textstyle}>Family Tree Name</Text>
//         <TextInput style = {styles.input}
//                underlineColorAndroid = "transparent"
//                placeholder = "e.g Shreeram"
//                placeholderTextColor = "#777"
//                onChangeText={(val)=>setusername(val)}
//                autoCapitalize = "none"/>
//                {/* <Text>Name : {username}</Text> */}
//                <TouchableOpacity onPress={()=> console.log("Hello")}
//                 style = {styles.saveButton}>
//                 <Text style = {styles.submitButtonText}> Search</Text>
//              </TouchableOpacity>     
//       </View>
//     )
//   }
// const styles = StyleSheet.create({
//     container :
//     {
//         flex :1,
//         backgroundColor: "#CFD8DC"

//     },
//     textstyle: {
//         textAlign: 'center',
//     fontSize:30,
//     fontFamily: "Cochin"
//     ,fontWeight: "bold",
//     textShadowColor : '#00ff00',
//     textShadowRadius : 8,
//     marginTop : 150,
//     },
//     input: {
//         marginTop : 5,
//         marginLeft:30,
//         marginRight:30,
//         height: 40,
//         borderColor: '#7a42f4',
//         borderWidth: 1
//      },
//      saveButton: {
//         backgroundColor: '#7a42f4',
//         height: 40,
//         width:150,
//         borderRadius : 10,
//         marginTop : 10,
//         marginLeft : 80,
//      },
//      submitButtonText:{
//         color: 'white'
//         ,textAlign :"center",
//         padding :10,
//      },
//      alternativeLayoutButtonContainer: {
//         marginLeft: 100,
//         marginTop :20,
//         marginRight :100,
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//       }
//     });