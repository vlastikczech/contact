import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking, Platform } from 'react-native';
import { Divider, Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import InsetShadow from '../assets/UI/InsetShadow';
import { LinearGradient } from 'expo-linear-gradient';

let linearColor = Platform.OS === 'android' ? '#e8e8e8' : "#e4e4e4"

export default function InfoScreen() {
  return (
    <View style={styles.outerContainer}>
    <InsetShadow size={0.02}>
    <ScrollView contentContainerStyle={styles.contentContainer}>

      <LinearGradient 
            style={styles.card}
            colors={[linearColor, '#f4f4f4']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            >
        <Text style={styles.headerText}>How do I use this app?</Text>
        <Text style={styles.paraText}>During times of social distancing, use it to track your daily "human connections" and "digital connections." </Text>
      </LinearGradient>

        <LinearGradient 
            style={styles.card}
            colors={[linearColor, '#f4f4f4']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            >
        <Text style={styles.headerText}>Human Connections?</Text>
        <Text style={styles.paraText}>Add to the count when you happen to cross a 6ft bubble with another human while out and about. (not including folks you live with). </Text>
        <Text style={styles.paraText}>KEEP THIS COUNT LOW!</Text>
        <Text style={styles.paraText}>Count unique humans. While out, try to keep a mental note and update the app as often as possible. </Text>
        </LinearGradient>

        <LinearGradient 
            style={styles.card}
            colors={[linearColor, '#f4f4f4']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            >
        <Text style={styles.headerText}>Digital Connections?</Text>
        <Text style={styles.paraText}>A partial cure for all of this isolation. Call a loved one. Text a friend to catch up. Video chat with a colleague!</Text>
        <Text style={styles.paraText}>For this count, high numbers are encouraged!</Text>
      </LinearGradient>
      
        <LinearGradient 
            style={styles.card}
            colors={[linearColor, '#f4f4f4']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            >
        <Text style={styles.headerText}>So... is it automatic?</Text>
        <Text style={styles.paraText}>No. We wanted to deliver this to folks as soon as possible with the least amount of app permissions. So just use it to manually keep track of your counts each day. Think of it as a journal of sorts.</Text>
      </LinearGradient>

        <LinearGradient 
            style={styles.card}
            colors={[linearColor, '#f4f4f4']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            >
        <Text style={styles.headerText}>But, why?</Text>
        <Text style={styles.paraText}>Social distancing is a critical tool to flatten the curve. Many experts recommend staying 6ft away from other humans in order to slow the spread.</Text>
        <Text style={styles.paraText}>This app can help you track your own progress. And, if you share your progress, perhaps it can inspire your friends and family.</Text>
        </LinearGradient>
      
        <LinearGradient 
            style={styles.card}
            colors={[linearColor, '#f4f4f4']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            >
        <Text style={styles.headerText}>Am I being tracked?</Text>
        <Text style={styles.paraText}>Nope. Patient 31 takes a privacy centric approach. Location and/or bluetooth permissions aren't required or requested.</Text>
      </LinearGradient>
      
        <LinearGradient 
            style={styles.card}
            colors={[linearColor, '#f4f4f4']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            >
        <Text style={styles.headerText}>Where's my data?</Text>
        <Text style={styles.paraText}>On your device. Never in the cloud.</Text>
      </LinearGradient>

      
        <LinearGradient 
            style={styles.card}
            colors={[linearColor, '#f4f4f4']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            >
        <Text style={styles.headerText}>Who built this?</Text>
        <Text style={styles.paraText}>We are PHX Devs, a software engineering firm based in Phoenix, AZ</Text>
        <Text style={styles.paraText}>More about us... </Text>
        <TouchableOpacity onPress={() => Linking.openURL('https://phxdevs.com')}>
        <Text style={[{color: 'blue'},styles.paraText]}>
          https://phxdevs.com
        </Text>
        </TouchableOpacity>
      </LinearGradient>

      
        <LinearGradient 
            style={styles.card}
            colors={[linearColor, '#f4f4f4']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            >
        <Text style={styles.headerText}>What are their motives?</Text>
        <Text style={styles.paraText}>We built this completly free app as part of our Humanity Driven Development initiative.</Text>
        <Text style={styles.paraText}>Some light reading, if you're interested...</Text>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.linkedin.com/pulse/humanity-driven-development-john-zechlin')}>
        <Text style={[{color: 'blue'},styles.paraText]}>
          Humanity Driven Development
        </Text>
        </TouchableOpacity>
      </LinearGradient>

      
        <LinearGradient 
            style={styles.card}
            colors={[linearColor, '#f4f4f4']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            >
        <Text style={styles.headerText}>I have suggestions.</Text>
        <Text style={styles.paraText}>Great! We're working on the next release and we'd love to hear your feedback.</Text>
        <View style={styles.emailButtonContainer}>
        <Button raised buttonStyle={styles.emailButton} icon={{name: 'email', color: 'white'}} onPress={() => Linking.openURL('mailto:patient31@phxdevs.com?subject=Patient 31 Feedback') }
        title="Email Us" />
        </View>
      </LinearGradient>

      
        <LinearGradient 
            style={styles.card}
            colors={[linearColor, '#f4f4f4']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            >
        <Text style={styles.headerText}>What about the name?</Text>
        <Text style={styles.paraText}>Patient 31. South Korea. Look it up. A stark reminder about the impact one person can make when their Human Connection number is high.</Text>
        </LinearGradient>

    </ScrollView>
    </InsetShadow>
    </View>
  );
}



const styles = StyleSheet.create({
  outerContainer: {
    paddingLeft: '5%',
    paddingRight: '5%',
    marginRight: 'auto',
    marginLeft: 'auto',
    flex: 1,
    backgroundColor: '#ececec'
  },
  card: {
    borderRadius: 17,
    marginVertical:10,
    marginHorizontal:25,
    paddingVertical: 10,
    paddingHorizontal: 8,
    shadowColor: linearColor,
    shadowOffset: {
      width: 8,
      height: 8,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  contentContainer: {
    paddingTop: 12,
    paddingBottom: 10,
  },
  headerText: {
    fontFamily: 'Raleway-Medium',
    textAlign: 'center',
    fontSize: 21,
    color: "#4d4d4d",
    marginBottom: 5,
  },
  paraText: {
    fontSize: 16,
    paddingHorizontal: 15,
    fontFamily: 'Roboto-Regular',
    color: "#4d4d4d",
    marginBottom: 5,
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
  emailButtonContainer: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  emailButton: {
    width: 175,
    backgroundColor:'#6AA84F',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
});
