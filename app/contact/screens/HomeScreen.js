import React, { useState, useEffect, setState, Component } from 'react';
import { Image, Platform, StyleSheet,TouchableOpacity, View, AsyncStorage } from 'react-native';
import { Tooltip, Text, Button, Icon, Divider  } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import * as WebBrowser from 'expo-web-browser';
import ContactCounter from '../components/ContactCounter';
import Reminders from '../components/Reminders';

import FirstTimeModal from '../components/FirstTimeModal'

export default function HomeScreen() {

  return (
    <View style={styles.container}>
      <FirstTimeModal pagekey={"home_screen_key"} />
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
    </View>
  );

}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
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
    paddingBottom: 5,
    paddingHorizontal: 10,
    textAlign: 'center'
  }
});
