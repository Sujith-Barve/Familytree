import React from 'react';
import { View, TextInput } from 'react-native';
// var Person = [];
// export const plusSlides = (n) => {
//     showSlides(slideIndex += n);
// }

export const fetchnameusingId = (id) => {
    console.log("I am inside the Fetch Name USing Id");
    // const [Personname, setPersonname] = useState([]);
    return fetch('http://192.168.43.131:3000/getname?' + new URLSearchParams({
        Personid: id
    }))
        .then(response => response.json())
        .then(name => {
            console.log("Response is " + JSON.stringify(name))
            const Personname = name.filter(
                func = (element) => {
                    return {
                        Name: element.Name
                    };
                }
            )

            // const Person = name.map(element => {
            //     return {
            //         Name: element.Name
            //     };
            // });

            // this.setState({
            //     Personname: [...Person]
            // }, () => {
            //     // console.log("Motherval setstate failed")
            // });
            console.log("Personname array is " + JSON.stringify(Person))
        })
        .catch(err => {
            Alert.alert("Error" + err);
            // console.log(err)
            // this.setState.IsLoading(false);
        })
}


// const suggestionhelp = familyname.map(element => {
//     return {
//         label: element.Name,
//         key: element._id,
//     };
// });

// this.setState({
//     items: [...suggestionhelp]
// }, () => {
//     // console.log("Motherval setstate failed")
// });