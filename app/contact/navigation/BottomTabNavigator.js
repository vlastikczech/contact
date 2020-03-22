import * as React from 'react';
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
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Info"
        component={InfoScreen}
        options={{
          title: 'Info',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-information" />,
        }}
      />
      <BottomTab.Screen
        name="Connections"
        component={HomeScreen}
        options={{
          title: 'Connections',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-people" />,
        }}
      />
      <BottomTab.Screen
        name="Stats"
        component={StatsScreen}
        options={{
          title: 'Stats',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-stats" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Connections':
      return 'Patient 31';
    case 'Info':
      return 'Patient 31';
    case 'Stats':
      return 'Patient 31';
  }
}
