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
import { LinearGradient } from 'expo-linear-gradient';

let width = Dimensions.get('window').width; //full width
let linearColor = Platform.OS === 'android' ? '#e8e8e8' : "#e4e4e4"

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      humanHelp: false,
      digitalHelp: false,
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

  toggleHelp = (item, toggle) => {
    this.setState({ [item]: toggle })
    console.log(this.state)
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
                      <TouchableOpacity onPress={() => this.toggleHelp('humanHelp', !this.state.humanHelp)} style={styles.svgBox}>
                        {this.state.humanHelp ? <ChooseSVG name='help' fill='none'/> : <ChooseSVG name='help' fill='#d6d6d6'/>}
                      </TouchableOpacity>
                      <Text style={styles.counterHeader}>
                        Human
                      </Text>
                      {this.state.humanHelp &&
                        <TouchableOpacity onPress={() => this.toggleHelp('humanHelp', !this.state.humanHelp)} activeOpacity={1} style={styles.centeredAbsolute}>
                          <LinearGradient 
                            style={styles.helpPopup}
                            colors={[linearColor, '#f4f4f4']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                          >
                            <Text style={styles.getStartedText}>{`Slow the spread!\nLOWER IS BETTER`}</Text>
                          </LinearGradient>
                        </TouchableOpacity>}
                    </View>
                    <ContactCounter name="in_person"/>
                  </View>
                </InsetShadow>
              </View>

              <View style={styles.counterBox}>
                <InsetShadow size={0.04}>
                  <View style={styles.counterContainer}>
                    <View style={styles.counterView}>
                      <TouchableOpacity onPress={() => this.toggleHelp('digitalHelp', !this.state.digitalHelp)} style={styles.svgBox}>
                        {this.state.digitalHelp ? <ChooseSVG name='help' fill='none'/> : <ChooseSVG name='help' fill='#d6d6d6'/>}
                      </TouchableOpacity>
                      <Text style={styles.counterHeader}>
                        Digital
                      </Text>
                      {this.state.digitalHelp &&
                        <TouchableOpacity onPress={() => this.toggleHelp('digitalHelp', !this.state.digitalHelp)} activeOpacity={1} style={styles.centeredAbsolute}>
                          <LinearGradient 
                            style={styles.helpPopup}
                            colors={[linearColor, '#f4f4f4']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                          >
                            <Text style={styles.getStartedText}>{`Call a friend, text your family!\nHIGHER IS BETTER`}</Text>
                          </LinearGradient>
                        </TouchableOpacity>}
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
    width: '100%',
  },
  centeredAbsolute: {
    position: 'absolute', 
    marginTop: '2.3%',
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  helpPopup: {
    borderRadius: 17,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '90%',
    width: '90%',
    shadowOffset: {
      width: 8,
      height: 8,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 7,
  },
  svgBox: {
    zIndex: 2,
    width: '10%',
    // backgroundColor: 'red',
    left: '89.6%',
    right: '4.8%',
    top: 10,
    bottom: '90%',
  },
  getStartedContainer: {
    display: 'flex',
    maxWidth: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  getStartedText: {
    fontSize: 17,
    color: '#4d4d4d',
    // backgroundColor: 'red',
    lineHeight: 20,
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
  },
  divider: {
    marginTop: 10
  },
  counterHeader: {
    fontSize: 24,
    color: '#7A7A7A',
    fontFamily: 'Raleway-Medium',
    textAlign: 'center',
    marginTop: 15,
    marginBottom: '8%',
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
