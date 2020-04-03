import React, { useState, useEffect, setState, Component } from 'react';
import { Image, Platform, StyleSheet,TouchableOpacity, View, AsyncStorage } from 'react-native';
import { Tooltip, Text, Button, Icon, Divider  } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import * as WebBrowser from 'expo-web-browser';
import ContactCounter from '../components/ContactCounter';
import Reminders from '../components/Reminders';

import FirstTimeModal from '../components/FirstTimeModal'

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: true
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
          <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.getStartedContainer}>


              <View style={styles.counterView}>
                <Text style={styles.counterHeader}>
                  Human Connections: 
                </Text>
                <Text style={styles.getStartedText}>{`Slow the spread!\nLOWER IS BETTER`}</Text>
              </View>
            <ContactCounter name="in_person"/>

            <Divider style={styles.divider} />

            <View style={styles.counterView}>
              <Text style={styles.counterHeader}>
                Digital Connections: 
              </Text>
              <Text style={styles.getStartedText}>{`Call a friend.\nText a family member.\nHIGHER IS BETTER`}</Text>
            </View>
            <ContactCounter name="digital"/>
            </View>
          </ScrollView>
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
    paddingLeft: '5%',
    paddingRight: '5%',
    marginRight: 'auto',
    marginLeft: 'auto',
    flex: 1,
    backgroundColor: '#ececec'
  },
  contentContainer: {
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50
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
    textAlign: 'center',
    marginTop: 15
  },
  counterText: {
    fontSize: 80,
    marginHorizontal: 15
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  counterView: {
    paddingHorizontal: 10,
    textAlign: 'center'
  }
});
