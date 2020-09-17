import React, { Component } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { TextInput } from 'react-native-paper';
// import { fetchnameusingId } from '../components/FetchnameusingId'
import { Surface, Shape } from '@react-native-community/art';
import * as Progress from 'react-native-progress';
var usernameval, key;
var dataArray = [];
var originaldata = [];
// var familyitem = [];
export default class familydisplay extends React.Component {
    constructor(props) {
        //constructor to set default state  
        super(props);
        this.state = {
            // familydata: [],
            items: [],
            Name: '',
            FatherName: '',
            MotherName: '',
            progress: 0,
            indeterminate: true,
            isloading: true,
        };
    }
    familysuggestion = () => {
        var FatherNameup, MotherNameup;
        console.log("I entered Display FAmily Method" + key)
        return fetch('http://192.168.43.131:3000/familysuggestionfetching?' + new URLSearchParams({
            familysearchid: key
        }))
            .then(response => response.json())
            .then(data => {
                console.log("Response is " + data.FatherData.Name)
                this.setState({ Name: data.Name.Name })
                this.setState({ FatherName: data.FatherData.Name })
                this.setState({ MotherName: data.MotherData.Name })
                this.setState({ isloading: false })
            })
            .catch(err => {
                console.log("Error" + err);
            })
    }
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

    componentDidMount() {
        this.animate();
        this.familysuggestion();
    }


    render() {
        const { navigation } = this.props;
        key = navigation.getParam('key', '123');
        // const other_param = navigation.getParam('otherParam', 'some default value');
        return (
            <View style={styles.outerlayout}>
                {this.state.isloading == true ?
                    <View>
                        <Text style={{
                            marginTop: 100,
                        }}>Loading Please wait</Text>
                        <View style={styles.circles}>
                            <Progress.Circle
                                style={styles.progress}
                                progress={this.state.progress}
                                indeterminate={this.state.indeterminate}
                            />

                        </View>
                    </View>
                    :
                    <View style={styles.outerlayout}>

                        <View style={styles.NameOuter}>
                            <View style={styles.NameInner1}>
                                <Text style={styles.textStyle}>Fathername</Text>
                                <Text style={styles.textdisplay}>{this.state.FatherName}</Text>
                            </View>
                            <View style={styles.NameInner2}>
                                <Text style={styles.textStyle}>MotherName</Text>
                                <Text style={styles.textdisplay}>{this.state.MotherName}</Text>
                            </View>
                        </View>
                        {/* <View style={styles.lineStyle}>
                        </View> */}

                    </View >

                }
            </View>

        );
    }
}
const styles = StyleSheet.create({
    outerlayout:
    {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"

    },
    textStyle: {
        fontSize: 18,
        textAlign: 'center',
        fontFamily: "Verdana",
        color: '#ffff',
        paddingTop: 10,
    },
    textdisplay: {
        fontSize: 14,
        textAlign: 'center',
        fontFamily: "Verdana",
        color: '#37474F',
        paddingBottom: 30,

    },
    lineStyle: {
        borderWidth: 1,
        borderColor: 'black',
        marginLeft: 10,
        height: 20,
        flex: 1

    },
    NameOuter:
    {
        flex: 1,
        flexDirection: "row",
    },
    NameInner1:
    {
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        justifyContent: "space-around",
        width: "45%",
        height: 100,
        borderRadius: 5,
        backgroundColor: "#9E9E9E",
        // position: "relative",
        // top: 20,
        alignSelf: "flex-start"

    },
    NameInner2:
    {
        marginTop: 20,
        marginLeft: 5,
        marginRight: 20,
        justifyContent: "space-between",
        width: "45%",
        height: 100,
        borderRadius: 5,
        backgroundColor: "#9E9E9E",
        // position: "relative",
        // top: 20,
        alignSelf: "flex-start"

    },
    buttonStyle: {
        width: "93%",
        marginTop: 50,
        backgroundColor: "red",
    },
    progress: {
        margin: 10,

    },
    circles: {
        flex: 1,
        // flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10

    },
});
