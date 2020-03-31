import * as React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import InfoScreen from '../screens/InfoScreen';
import StatsScreen from '../screens/StatsScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Connections';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator 
      initialRouteName={INITIAL_ROUTE_NAME}
      tabBarOptions={{
        showLabel: false,
        style: {
          height: 120,
          backgroundColor: '#ececec'
        },
      }}>
        <BottomTab.Screen
          name="Info"
          component={InfoScreen}
          options={{
            // title: 'Info',
            tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="info" />,
            style: {backgroundColor:'red'}
          }}
        />
        <BottomTab.Screen
          name="Connections"
          component={HomeScreen}
          options={{
            // title: 'Connections',
            tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="user" />,
          }}
        />
        <BottomTab.Screen
          name="Stats"
          component={StatsScreen}
          options={{
            // title: 'Stats',
            tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="stats" />,
          }}
        />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Connections':
      return 'Connections';
    case 'Info':
      return 'Information';
    case 'Stats':
      return 'Statistics';
  }
}
