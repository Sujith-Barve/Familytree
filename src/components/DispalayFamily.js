import React, { Component } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Col, Row, Grid } from "react-native-easy-grid";
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
            SpouseName: null,
            Siblings: [],
            progress: 0,
            SiblingView: [],
            indeterminate: true,
            isloading: true,
            bachelor: ''
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
                this.setState({ Siblings: data.Siblings })

                // this.setState({ SpouseName: data.SpouseData.Name })
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

    componentWillUnmount() {
        this.familysuggestion();
    }
    addTextInput = (length, str) => {
        if (str == "Child") {
            let SiblingView = this.state.SiblingView;
            SiblingView.push(
                <View>
                    <Row style={styles.row}>
                        <Text style={styles.textheader}>Sibling Name</Text>
                    </Row>
                </View>
            );
            this.setState({ textInput });
        }
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
                        <Grid style={styles.Grid}>
                            <Col style={styles.column}>
                                <Row style={styles.row}>
                                    <Text style={styles.textheader}>Name</Text>
                                </Row>
                                <Row style={styles.row}>
                                    <Text style={styles.textheader}>FatherName</Text>
                                </Row>
                                <Row style={styles.row}>
                                    <Text style={styles.textheader}>MotherName</Text>
                                </Row>
                                {
                                    this.state.SpouseName != null
                                        ?
                                        <Row style={styles.row}>
                                            <Text style={styles.textheader}>Spouse Name</Text>
                                        </Row>
                                        : null
                                }

                                {
                                    this.state.SiblingView.map((value) => {
                                        return value
                                    })
                                }



                            </Col>

                            <Col>
                                <Row style={styles.row}>
                                    <Text style={styles.text}>{this.state.Name}</Text>
                                </Row>
                                <Row style={styles.row}>
                                    <Text style={styles.textheader}>{this.state.FatherName}</Text>
                                </Row>
                                <Row style={styles.row}>
                                    <Text style={styles.textheader}>{this.state.MotherName}</Text>
                                </Row>
                                {
                                    (this.state.SpouseName != null)
                                        ?
                                        <Row style={styles.row}>
                                            <Text style={styles.textheader}>{this.state.Name}</Text>
                                        </Row>
                                        : null
                                }
                                <Row style={styles.row}>
                                    <Text style={styles.textheader}>{this.state.Name}</Text>
                                </Row>

                            </Col>
                        </Grid>

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
        flexDirection: "column",
        backgroundColor: '#E0E0E0',

    },
    Grid:
    {
        margin: 10,
        // borderColor: '#EEEEEE',



    },
    column:
    {
        marginRight: 5,

    },
    textheader:
    {
        fontSize: 20,
        color: '#FAFAFA',
        marginLeft: 20,
    },
    text:
    {
        fontSize: 20,
        color: '#FAFAFA'
    },
    row:
    {
        marginBottom: 5,
        backgroundColor: '#9E9E9E',
        alignContent: "center",
        textAlign: "center",
        borderBottomLeftRadius: 10,
        borderTopRightRadius: 10,
        alignItems: "center",
        paddingLeft: 10,
        overflow: "scroll"

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
