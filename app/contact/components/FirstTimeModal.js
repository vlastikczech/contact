import React, { Component, PropTypes } from "react";
import {
  AsyncStorage,
  Modal,
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  TouchableOpacity,
  Linking
} from "react-native";
import { Divider } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

export default class FirstTimeModal extends Component {
    constructor(props) {
      super(props);
      this.state = {
        modalVisible: false
      };
    }

    componentDidMount() {
        AsyncStorage.getItem(this.props.pagekey, (err, result) => {
          if (err) {
          } else {
            if (result == null) {
              console.log("null value recieved", result);
              this.setModalVisible(true);
            } else {
              console.log("result", result);
            }
          }
        });
        AsyncStorage.setItem(this.props.pagekey, JSON.stringify({"value":"true"}), (err,result) => {
            console.log("error",err,"result",result);
        });
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    render() {
      return (
        <View>
          <Modal
            animationType={"slide"}
            transparent={true}
            style={styles.firstTimeContainer}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              alert("Modal has been closed.");
            }}
          >
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.firstTimeContainer}>
                <Text style={styles.headerText}>How do I use this app?</Text>
                <Text style={styles.paraText}>During times of social distancing, use it to track your daily "human connections" and "digital connections." </Text>

                <Divider style={styles.divider}/>

                <Text style={styles.headerText}>Human Connections?</Text>
                <Text style={styles.paraText}>Add to the count when you happen to cross a 6ft bubble with another human while out and about. (not including folks you live with). </Text>
                <Text style={styles.paraText}>KEEP THIS COUNT LOW!</Text>
                <Text style={styles.paraText}>Count unique humans. While out, try to keep a mental note and update the app as often as possible. </Text>

                <Divider style={styles.divider}/>

                <Text style={styles.headerText}>Digital Connections?</Text>
                <Text style={styles.paraText}>A partial cure for all of this isolation. Call a loved one. Text a friend to catch up. Video chat with a colleague!</Text>
                <Text style={styles.paraText}>For this count, high numbers are encouraged!</Text>

                <Divider style={styles.divider}/>

                <Text style={styles.headerText}>So... is it automatic?</Text>
                <Text style={styles.paraText}>Nope. We wanted to deliver this to folks as soon as possible with the least amount of app permissions. So just use it to manually keep track of your counts each day.</Text>

                <Divider style={styles.divider}/>

                <Text style={styles.headerText}>But, why?</Text>
                <Text style={styles.paraText}>Social distancing is a critical tool to flatten the curve. Many experts recommend staying 6ft away from other humans in order to slow the spread.</Text>
                <Text style={styles.paraText}>This app can help you track your own progress. And, if you share your progress, perhaps it can inspire your friends and family.</Text>

                <Divider style={styles.divider}/>

                <Text style={styles.headerText}>Who built this?</Text>
                <Text style={styles.paraText}>And... What are their motives? Are they tracking me?</Text>
                <Text style={styles.paraText}>PHX Devs, as part of their Humanity Driven Development initiative.</Text>
                <Text style={styles.paraText}>It's completely free and there is no server. All of your data stays on your device.</Text>
                <Text style={styles.paraText}>More about PHX Devs and Humanity Driven Development here...</Text>
                <TouchableOpacity onPress={() => Linking.openURL('https://phxdevs.com')}>
                <Text style={[{color: 'blue'},styles.paraText]}>
                    https://phxdevs.com
                </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL('https://www.linkedin.com/pulse/humanity-driven-development-john-zechlin')}>
                <Text style={[{color: 'blue'},styles.paraText]}>
                    Humanity Driven Development
                </Text>
                </TouchableOpacity>

                <Divider style={styles.divider}/>

                <Text style={styles.headerText}>What about the name?</Text>
                <Text style={styles.paraText}>Patient 31. South Korea. A stark reminder about the impact one person can make when their Human Connection number is high.</Text>
              <View style={styles.firstTimeExitContainer}>
                <TouchableHighlight
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}
                >
                  <View style={styles.firstTimeExitButtonContainer}>
                    <Text style={styles.firstTimeExitButtonText}>Exit</Text>
                  </View>
                </TouchableHighlight>
              </View>
            </View>
            </ScrollView>
          </Modal>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
        firstTimeContainer:{
            backgroundColor:'#D3D3D3',
            flex:1,
            marginTop:5,
            marginBottom:40,
            marginLeft:20,
            marginRight:20,
            borderRadius:20,
            borderWidth:2,
            borderColor:'black'
        },
        firstTimeExitContainer:{
            flex:2,
            justifyContent:'flex-start',
            alignItems:'center',
        },
        firstTimeExitButtonContainer:{
            width:100,
            height:40,
            backgroundColor: '#ff6666',
            borderColor: 'red',
            borderWidth: 1,
            borderRadius:10,
            justifyContent:'center',
            marginVertical: 10
        },
        firstTimeExitButtonText:{
            color:'white',
            fontSize:20,
            fontWeight:'bold',
            textAlign:'center'
        },
        container: {
            flex: 1,
            backgroundColor: '#fafafa',
        },
        contentContainer: {
            paddingTop: 15,
        },
        headerText: {
            fontSize: 29,
            paddingHorizontal: 15,
            textDecorationLine: 'underline',
        },
        paraText: {
            fontSize: 18,
            paddingHorizontal: 15,
        },
        divider: {
            marginTop: 7,
            marginBottom: 5,
        },
        optionIconContainer: {
            marginRight: 12,
        },
        option: {
            backgroundColor: '#fdfdfd',
            paddingHorizontal: 15,
            paddingVertical: 15,
            borderWidth: StyleSheet.hairlineWidth,
            borderBottomWidth: 0,
            borderColor: '#ededed',
        },
        lastOption: {
            borderBottomWidth: StyleSheet.hairlineWidth,
        },
        optionText: {
            fontSize: 15,
            alignSelf: 'flex-start',
            marginTop: 1,
        },
    });