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
          <View style={styles.selected}>
            <ChooseSVG name={props.name} color="#bdbdbd"/>
          </View>
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
    boxShadow: "-10px -10px 30px #FFFFFF, 5px 5px 30px rgba(0, 0, 0, 0.25)",
    borderRadius: 19,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selected: {
    backgroundColor: "#F0F0F0",
    width: 68,
    height: 68,
    border: '3px solid black',
    boxShadow: "inset 5px 5px 30px rgba(119, 119, 119, 0.25), inset -5px -5px 10px rgba(255, 255, 255, 0.25)",
    borderRadius: 19,
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
