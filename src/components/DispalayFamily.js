import React, { Component } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { TextInput } from 'react-native-paper';
import { fetchnameusingId } from '../components/FetchnameusingId'
var usernameval, key;
// var familyitem = [];
export default class familydisplay extends React.Component {
    constructor(props) {
        //constructor to set default state  
        super(props);
        this.state = {
            // familydata: [],
            items: []
        };
    }
    familysuggestion = () => {
        console.log("I entered Display FAmily Method" + key)
        fetch('http://192.168.43.131:3000/familysuggestionfetching?' + new URLSearchParams({
            familysearchid: key
        }))
            .then(response => response.json())
            .then(familyname => {
                const suggestionhelp = familyname.map(element => {
                    var FatherNameup = fetchnameusingId(element.FatherName)
                    var MotherNameup = fetchnameusingId(element.MotherName)
                    return {
                        Name: element.Name,
                        FatherName: FatherNameup,
                        MotherName: MotherNameup,

                    };
                    console.log("Name is ", familyname);
                });

                this.setState({
                    items: [...suggestionhelp]
                }, () => {
                    // console.log("Motherval setstate failed")
                });
                console.log(JSON.stringify(this.state.items, "Suggestion is" + familyname));

            })
            .catch(err => {
                console.log("Error" + err);
            })
    }
    componentDidMount() {
        this.familysuggestion();
    }


    render() {
        const { navigation } = this.props;
        key = navigation.getParam('key', '123');
        // const other_param = navigation.getParam('otherParam', 'some default value');
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text style={styles.textStyle}>key: {JSON.stringify(key)}</Text>
                <View style={styles.buttonStyle}>
                    <Button
                        title="Go back"
                        onPress={() => this.props.navigation.navigate('AddFam')}
                    />
                </View>
            </View>

        );
    }
}
const styles = StyleSheet.create({
    textStyle: {
        fontSize: 23,
        textAlign: 'center',
        color: '#f00',
    },

    buttonStyle: {
        width: "93%",
        marginTop: 50,
        backgroundColor: "red",
    }
});
