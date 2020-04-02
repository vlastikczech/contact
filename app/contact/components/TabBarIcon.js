import * as React from 'react';
import ChooseSVG from '../assets/icons/SVG'
import { View, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

export default function TabBarIcon(props) {
  if (props.focused) {
    return (
      <LinearGradient
        colors={['#ffffff', '#d5d5d5']}
        style={ styles.background }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
          <LinearGradient 
            style={styles.selected}
            colors={['#d5d5d5', '#ffffff']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            >
              <ChooseSVG name={props.name} color="#bdbdbd"/>
          </LinearGradient>
      </LinearGradient>
    )
  } else {
    return (
      <View style={styles.unselected}>
        <ChooseSVG name={props.name} color="#a8a8a8"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  unselected: {
    width: 70,
    height: 70,
    backgroundColor: "#F0F0F0",
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    // shadowColor: 'red',
    shadowOffset: {
      width: 8,
      height: 8,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 17,
    // boxShadow: "-10px -10px 30px #FFFFFF, 5px 5px 30px rgba(0, 0, 0, 0.25)",
    borderRadius: 19,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inset: {
    // backgroundColor: "red",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: "40%",
    height: "40%",
    borderRadius: 15,
    shadowColor: 'rgb(119, 119, 119)',
    // shadowOffset: {
    //   width: 8,
    //   height: 8,
    // },
    shadowOpacity: 1,
    shadowRadius: 40,
    elevation: 10,
  },
  selected: {
    // backgroundColor: "#F0F0F0",
    width: 68,
    height: 68,
    // border: '10px solid white',
    // shadowColor: 'rgba(119, 119, 119, 0.25)',
    // shadowOffset: {
    //   width: 8,
    //   height: 8,
    // },
    // shadowOpacity: 0.5,
    // shadowRadius: 12,
    // elevation: 17,
    // boxShadow: "inset 5px 5px 30px rgba(119, 119, 119, 0.25), inset -5px -5px 10px rgba(255, 255, 255, 0.25)",
    borderRadius: 19,
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    width: 74,
    height: 74,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d5d5d5',
    borderRadius: 21
  }
});
