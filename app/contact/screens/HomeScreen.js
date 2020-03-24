import React, { useState, useEffect, setState } from 'react';
import { Image, Platform, StyleSheet,TouchableOpacity, View, AsyncStorage } from 'react-native';
import { Tooltip, Text, Button, Icon, Divider  } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import * as WebBrowser from 'expo-web-browser';
import ContactCounter from '../components/ContactCounter';


import { MonoText } from '../components/StyledText';

export default function HomeScreen() {
  // const [inPersonCount, setInPersonCount] = useState(0);
  // useEffect(() => {
  //   _retrieveData();
  // }, []);


  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.getStartedContainer}>


          <View style={styles.counterView}>
            <Text style={styles.counterHeader}>
              Human Connections: 
            </Text>
            <Text style={styles.getStartedText}>{`Help control the spread!\nEach day, keep track of how many unique people intersect your 6 ft bubble.\nUpdate your count regularly. BUT... keep the count low!`}</Text>
            {/* <Tooltip width={225} height={-1} popover={<Text>Keep your distance to stop the spread. 6 feet apart is recommended. Add one to this count for each unique person that crosses that 6ft bubble. Don't count people you live with.</Text>}>
            <Icon name='question-circle' type='font-awesome' size={24} />
            </Tooltip> */}
          </View>
        <ContactCounter name="in_person"/>

        <Divider style={{ backgroundColor: 'blue' }} />

        <View style={styles.counterView}>
          <Text style={styles.counterHeader}>
            Digital Connections: 
          </Text>
          <Text style={styles.getStartedText}>{`But don't disconnect!\nAlso keep track of your meaningful digital connections each day. Call or text a friend or family member.`}</Text>
          {/* <Tooltip width={225} height={-1} popover={<Text>Stay in touch with your friends and family. Give them a call. Send them a note.</Text>}>
          <Icon name='question-circle' type='font-awesome' size={24} />
          </Tooltip> */}
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
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
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
  counterHeader: {
    fontSize: 24,
    textAlign: 'center'
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
    paddingBottom: 15,
    paddingHorizontal: 10,
    textAlign: 'center'
  }
});
