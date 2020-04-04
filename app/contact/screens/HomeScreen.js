import React, { useState, useEffect, setState, Component } from 'react';
import { Image, Platform, StyleSheet,TouchableOpacity, View, AsyncStorage, Dimensions } from 'react-native';
import { Tooltip, Text, Button, Icon, Divider  } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import ContactCounter from '../components/ContactCounter';
import InsetShadow from '../assets/UI/InsetShadow';
import Reminders from '../components/Reminders';
import FirstTimeModal from '../components/FirstTimeModal'
import ChooseSVG from '../assets/icons/SVG';

let width = Dimensions.get('window').width; //full width

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    };
    // this.setModalVisible = this.setModalVisible.bind(this)
  }

  componentDidMount() {
      AsyncStorage.getItem('home_screen_key', (err, result) => {
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
      AsyncStorage.setItem('home_screen_key', JSON.stringify({"value":"true"}), (err,result) => {
          console.log("error",err,"result",result);
      });
  }

  setModalVisible = (visible) => {
      this.setState({ modalVisible: visible });
  }

  render() {
    return (
      <View style={styles.container}>
        { this.state.modalVisible ? 
          <FirstTimeModal setModalVisible={this.setModalVisible} modalVisible={this.state.modalVisible}/> 
          :
            <View style={styles.getStartedContainer}>
              <View style={styles.counterBox}>
                <InsetShadow size={0.04}>
                  <View style={styles.counterContainer}>
                    <View style={styles.counterView}>
                      <Text style={styles.counterHeader}>
                        Human
                      </Text>
                      <View style={styles.svgBox}>
                        <ChooseSVG name='help' />
                      </View>
                      <Text style={styles.getStartedText}>{`Slow the spread!\nLOWER IS BETTER`}</Text>
                    </View>
                    <ContactCounter name="in_person"/>
                  </View>
                </InsetShadow>
              </View>

              <View style={styles.counterBox}>
                <InsetShadow size={0.04}>
                  <View style={styles.counterContainer}>
                    <View style={styles.counterView}>
                      <Text style={styles.counterHeader}>
                        Digital
                      </Text>
                      <View style={styles.svgBox}>
                        <ChooseSVG name='help' />
                      </View>
                      <Text style={styles.getStartedText}>{`Call a friend.\nText a family member.\nHIGHER IS BETTER`}</Text>
                    </View>
                    <ContactCounter name="digital"/>
                  </View>
                </InsetShadow>
              </View>
            </View>
        }
      </View>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingLeft: '5%',
    paddingRight: '5%',
    marginRight: 'auto',
    marginLeft: 'auto',
    flex: 1,
    backgroundColor: '#ececec'
  },
  counterBox: {
    height: '47%',
    position: 'relative',
  },
  svgBox: {
    position: "absolute",
    left: '89.6%',
    right: '4.8%',
    top: '15%',
    bottom: '86.23%',
  },
  getStartedContainer: {
    display: 'flex',
    maxWidth: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'red',
    flex: 1,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 20,
    textAlign: 'center'
  },
  divider: {
    marginTop: 10
  },
  counterHeader: {
    fontSize: 24,
    color: '#7A7A7A',
    fontFamily: 'Raleway-Medium',
    textAlign: 'center',
    marginTop: 15
  },
  counterText: {
    fontSize: 80,
    marginHorizontal: 15
  },
  counterContainer: {
    // height: 50,
    // backgroundColor: 'red',
    // paddingBottom: 30,
    // width: '100%',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
});
