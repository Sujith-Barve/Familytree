// import React, {Component} from 'react';
// import {Platform, StyleSheet, Text, View,FlatList} from 'react-native';
// export default class App extends Component<Props>{

//   state ={
//     data:[]
//   }

//   fetchData= async()=>{
//     const response = await fetch('http://851231972275.ngrok.io/users');
//     const users = await response.json();
//     console.log(response);
//     this.setState({data: users});
//   }
// componentDidMount(){
//   this.fetchData();
// }
//   render() {
//     return (
// <View >
// <Text>Welcome</Text>

// <FlatList
// data={this.state.data}
// keyExtractor={(item,index) => index.toString()}
// renderItem={({item}) =>



// <View style={{backgroundColor:'#abc123',padding:10,margin:10}}>
//           <Text style={{color:'#fff', fontWeight:'bold'}}>{item.Name}</Text>
//           <Text style={{color:'#fff'}}>{item.FatherName}</Text>
//           <Text>City: {item.MotherName}</Text>
//          </View>



// }

// />
// </View>



//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
// });