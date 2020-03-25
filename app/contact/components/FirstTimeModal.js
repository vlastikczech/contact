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
import { Divider, Image } from 'react-native-elements';
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
                    <View style={styles.imageContainer}>
                        <Image
                          style={styles.image}
                          source={require('../assets/images/splash.png')}
                        />
                    </View>
                    <Text style={styles.titleText}>Patient 31</Text>
                    <Text style={styles.conversationText}>Thanks for downloading Patient 31!</Text>
                    <Text style={styles.conversationText}>We built this app for social distancing... as an easy way to keep track of the daily number of other humans you come in contact with.</Text>
                    <Text style={styles.conversationText}>It might be a little rough around the edges. We wanted to get it in your hands as quickly as possible. Please send suggestions to patient31@phxdevs.com.</Text>
                    <Text style={styles.conversationText}>Head over to the info tab to learn how to use the app and the story behind the name.</Text>
                    <Text style={styles.conversationText}>Stay healthy.</Text>
                    <Divider style={styles.divider}/>

                    <View style={styles.firstTimeExitContainer}>
                      <TouchableHighlight
                        onPress={() => {
                          this.setModalVisible(!this.state.modalVisible);
                        }}
                      >
                        <View style={styles.firstTimeExitButtonContainer}>
                          <Text style={styles.firstTimeExitButtonText}>OK</Text>
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
            backgroundColor: '#6AA84F',
            borderColor: '#6AA84F',
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
        imageContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20
        },
        image: {
            height: 150,
            width: 150
        },
        container: {
            flex: 1,
            backgroundColor: '#fafafa',
        },
        contentContainer: {
            paddingTop: 15,
        },
        titleText: {
          textAlign: 'center',
          fontSize: 35
        },
        conversationText: {
          fontSize: 18,
          paddingHorizontal: 15,
          paddingVertical: 10
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