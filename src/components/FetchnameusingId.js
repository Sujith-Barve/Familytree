// import React from 'react';
// import { View, TextInput, Alert } from 'react-native';


// export const fetchnameusingId = (id) => {
//     console.log("I am inside the Fetch Name USing Id");
//     // const [Personname, setPersonname] = useState([]);
//     var returnName;
//     fetch('http://192.168.43.131:3000/getname?' + new URLSearchParams({
//         Personid: id
//     }))
//         .then(response => response.json())
//         .then(name => {
//             returnName = name.Name
//         })
//         .catch(err => {
//             Alert.alert("Cant find the Name " + err);
//             // console.log(err)
//             // this.setState.IsLoading(false);
//         })
//     return returnName;
// }
