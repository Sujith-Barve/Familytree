import React, { Component } from 'react';
//import react in our code.
import { View, Image, TouchableOpacity } from 'react-native';
// import all basic components

//Import React Navigation
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';

//Import external files
import home from '../components/Home';
import Search from '../components/SearchBar'
import familyadd from '../components/familyadd';
import fampage from '../components/Familypage';


class NavigationDrawerStructure extends Component {
  //Structure for the navigatin Drawer
  toggleDrawer = () => {
    this.props.navigationProps.toggleDrawer();
  };
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          {/*Donute Button Image */}
          <Image
            source={require('../Img/drawer.png')}
            style={{ width: 25, height: 25, marginLeft: 5 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const FirstActivity_StackNavigator = createStackNavigator({
  //All the screen from the Screen1 will be indexed here
  AddFam: {
    screen: familyadd,
    navigationOptions: ({ navigation }) => ({
      title: null,
      headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#FF9800',
      },
      headerTintColor: '#fff',
    }),
  },
});

const Screen2_StackNavigator = createStackNavigator({
  //All the screen from the Screen2 will be indexed here
  FamPage: {
    screen: fampage,
    navigationOptions: ({ navigation }) => ({
      title: null,
      headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#FF9800',
      },
      headerTintColor: '#fff',
    }),
  },
});

const Screen3_StackNavigator = createStackNavigator({
  //All the screen from the Screen3 will be indexed here
  SearchBar: {
    screen: Search,
    navigationOptions: ({ navigation }) => ({
      title: null,
      headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#FF9800',
      },
      headerTintColor: '#fff',
    }),
  },
});

const Homestack = createDrawerNavigator({
  //Drawer Optons and indexing
  AddFam: {
    //Title
    screen: FirstActivity_StackNavigator,
    navigationOptions: {
      title: null,
      drawerLabel: 'Welcome To Family Tree',
    },
  },
  FamPage: {
    //Title
    screen: Screen2_StackNavigator,
    navigationOptions: {
      drawerLabel: 'Create Family',
      title: null,
    },
  },

  SearchBar:
  {
    screen: Screen3_StackNavigator,
    navigationOptions: {
      title: 'Search',
      headerShown: false,
      drawerLabel: 'Search Your Family',
    },
  },
});

export default createAppContainer(Homestack);

// const valstack= {

//     // databasecheck :
//     // {
//     //     screen:datcheck,
//     // },
//     AddFam :
//     {
//         screen : familyadd,
//         navigationOptions: {
//             title : null, 
//             }
//     },
//     FamPage :
//     {
//         screen : fampage,
//         navigationOptions: {
//             title : null, 
//             }
//     },
//     Home :
//     {
//         screen : home,
//         navigationOptions: {
//             title: 'Home',
//             headerShown: false,
//             },

//     },

//     // CreateEmp : 
//     // {
//     //     screen : createemp,
//     //     navigationOptions: {
//     //         title : null, 
//     //         }
//     // },


// };

// const Homestack = createStackNavigator(valstack);
// export default createAppContainer(Homestack); 