import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { RectButton, ScrollView } from 'react-native-gesture-handler';

import HistoryStats from '../components/HistoryStats'
import DailyStats from '../components/DailyStats'
import MultiDayStats from '../components/MultiDayStats'

export default function StatsScreen(props) {
  return (
    <View>
      <DailyStats nav={props.navigation}/>
      <MultiDayStats nav={props.navigation} title='3 day avg:' days={3}/>
      <MultiDayStats nav={props.navigation} title='10 day avg:' days={10}/>
      <HistoryStats/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingTop: 15,
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
