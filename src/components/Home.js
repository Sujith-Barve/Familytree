import React from 'react';
import { StyleSheet, Button, View, SafeAreaView,TouchableOpacity, Text, Alert,Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';
// const Separator = () => (
//   <View style={styles.separator} />
// );

export default function Home({navigation})
{

  const clickHandler = () => {
    navigation.navigate('AddFam')
    };

    return (
      <SafeAreaView style={styles.container}>
    <View>
      <Text style={styles.title}>
        Add Family
      </Text>
    </View>
    <TouchableOpacity
          activeOpacity={0.7}
          onPress={clickHandler}
          style={styles.TouchableOpacityStyle}>
          <Image
            //We are making FAB using TouchableOpacity with an image
            //We are using online image here
             source={{
uri:'https://raw.githubusercontent.com/AboutReact/sampleresource/master/plus_icon.png',
            }}
            //You can use you project image Example below
            //source={require('./images/float-add-icon.png')}
            style={styles.FloatingButtonStyle}
          />
        </TouchableOpacity>
  </SafeAreaView>
    )
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
//     borderColor :"black",
//     borderStyle : "dashed",
//     borderWidth : 5,
//     borderTopLeftRadius:  60,
// borderBottomRightRadius:  60,
margin :10,
  },
  title: {
    textAlign: 'center',
    fontSize:30,
    fontFamily: "Cochin"
    ,fontWeight: "bold",
    textShadowColor : '#00ff00',
    textShadowRadius : 8,
    marginTop : 100,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  TouchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 140,
    top: 180,
  },

  FloatingButtonStyle: {
    resizeMode: 'contain',
    width: 80,
    height: 70,
    //backgroundColor:'black'
  },
});

 19 