import React, {Component} from 'react';
import { View, StyleSheet, AsyncStorage } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {Notifications} from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

export default class Reminders extends Component {
    state = {
        hours: '0'
    }
    onSubmit(hours) {
        console.log('on submit selected hours: ' + hours);
        this.persistUserSelection(hours);

        // for dev / debugging only
        if (hours == '1') {
            this.scheduleNotification(new Date().getTime() + 4000);
        } else if (hours != '0') {
            this.scheduleNext24Hours(parseInt(hours, 10));
        }
        this.setState({ hours: hours })

    }

    async scheduleNext24Hours(hours) {
        // remove all previously scheduled notifications
        await Notifications.cancelAllScheduledNotificationsAsync()

        // 0 means never notify
        if (hours == 0) {
            return;
        }

        let scheduled_time = new Date();

        if (hours === 24) {
            scheduled_time.setHours(20)
            this.scheduleNotification(scheduled_time.getTime())
            this.scheduleNotification(scheduled_time.getTime() + 86400000)
        } else {
            for (let i=8; i<=20; i=i+hours) {
                scheduled_time.setHours(i)
                this.scheduleNotification(scheduled_time.getTime())
                this.scheduleNotification(scheduled_time.getTime() + 86400000)
            }
        }
    }

    scheduleNotification(time) {
        const localNotification = {
            title: 'Reminder: Update your connection counts',
            body: 'If you\'ve gone out, update your numbers. If you\'re staying in, contact someone you know.' , // (string) — body text of the notification.
            ios: { // (optional) (object) — notification configuration specific to iOS.
              sound: true // (optional) (boolean) — if true, play a sound. Default: false.
            },
            android: // (optional) (object) — notification configuration specific to Android.
            {
              sound: true, // (optional) (boolean) — if true, play a sound. Default: false.
              icon: '../assets/images/icon.png',
              //color (optional) (string) — color of the notification icon in notification drawer.
              priority: 'high', // (optional) (min | low | high | max) — android may present notifications according to the priority, for example a high priority notification will likely to be shown as a heads-up notification.
              sticky: false, // (optional) (boolean) — if true, the notification will be sticky and not dismissable by user. The notification must be programmatically dismissed. Default: false.
              vibrate: true // (optional) (boolean or array) — if true, vibrate the device. An array can be supplied to specify the vibration pattern, e.g. - [ 0, 500 ].
              // link (optional) (string) — external link to open when notification is selected.
            }
        };

        const schedulingOptions = {
            time: time
        }

        // Notifications show only when app is not active.
        // (ie. another app being used or device's screen is locked)
        Notifications.scheduleLocalNotificationAsync(
            localNotification, schedulingOptions
        );

        console.log('Notification set')
    }

    async persistUserSelection(hours) {
        try {
            await AsyncStorage.setItem('@notification_preference', hours)
            console.log('data stored: ' + hours)
        } catch (e) {
            // saving error
            console.log(e);
        }
    }

    async retrieveUserSelection() {
        try {
            const value = await AsyncStorage.getItem('@notification_preference');
            console.log('notification preference retrieved: ' + value)
            if (value !== null) {
                return value;
            } else {
                console.log("No notification_preference key stored");
            }
        } catch (error) {
            console.log("error retrieving notification_preference")
        }
        return '0';
    }

    async componentDidMount() {
        // We need to ask for Notification permissions for ios devices
        let result = await Permissions.askAsync(Permissions.NOTIFICATIONS);

        if (Constants.isDevice && result.status === 'granted') {
            console.log('Notification permissions granted.')
        }

        await Notifications.cancelAllScheduledNotificationsAsync()
        let hours = await this.retrieveUserSelection()
        await this.setState({hours: hours})
    }

    render() {
        return (
            <View style={styles.picker}>
                <RNPickerSelect 
                    onValueChange={(value) => this.onSubmit(value)} 
                    value={ this.state.hours } 
                    items={[
                        { label: 'In 4 seconds (dev only)', value: '1' },
                        { label: 'Never', value: '0' },
                        { label: 'Every 3 hrs', value: '3' },
                        { label: 'Every 6 hrs', value: '6' },
                        { label: 'Twice a day', value: '12' },
                        { label: 'Once a day', value: '24' },
                    ]} 
                />
            </View>
        );
    }
};

const styles = StyleSheet.create({
    picker: {
        maxWidth: 300,
        marginHorizontal: 50,
        marginVertical: 10,
        borderColor: '#D3D3D3',
        borderWidth: 1
    }
})