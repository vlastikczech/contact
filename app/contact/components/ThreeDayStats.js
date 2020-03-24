import React, { Component } from 'react'
import { View, AsyncStorage, Text, StyleSheet, FlatList, SafeAreaView, ScrollView} from 'react-native'

import { List, ListItem } from 'react-native-elements'

export default class ThreeDayStats extends Component {
    state = {
        in_person_count: 0,
        digital_count: 0,
    }

    getStorageKey(name, minusDays) {
        let today = new Date();
        console.log('today.getDate(): ' + today.getDate());
        let date = (parseInt(today.getDate()) - minusDays) + "_" + parseInt(today.getMonth()+1) + "_" + today.getFullYear()
        console.log('Date: ' + date);
        return '@' + name + '_' + date;
    }

    updateCounters() {
        for(var i = 0; i < 3; i++) {
            var in_person = this.getStorageKey('in_person', i)
            var digital = this.getStorageKey('digital', i)
            this._retrieveData(in_person, 'in_person_count')
            this._retrieveData(digital, 'digital_count')
        }
    }

    async _retrieveData(key, state) {
        try {
            const value = await AsyncStorage.getItem(key);
        
            if (value !== null) {
                // We have data!!
                if (state == 'in_person_count') {
                    this.setState({[state]: (this.state.in_person_count + value, 10)});
                } else if (state == 'digital_count') {
                    this.setState({[state]: (this.state.digital_count + value, 10)});
                }
                console.log(value);
            } else {
                console.log("No " + this.getStorageKey(key) + " key stored");
            }
            } catch (error) {
            // Error retrieving data
            }
      }

    componentDidMount() {
        this.updateCounters()
        this._navListener = this.props.nav.addListener('focus', () => {
            this.updateCounters()
          });
    }

    componentWillUnmount() {
        this.props.nav.removeListener('focus', () => {
            this.updateCounters()
        });
    }

    render () {
        return (
            <SafeAreaView>
                <View style={styles.statsContainer}>
                    <View>
                        <Text style={styles.statsTitleText}>3 days:</Text>
                    </View>
                
                    <View style={styles.countContainer}>
                        <Text style={styles.humanText}>
                            {this.state.in_person_count}
                        </Text>

                        <Text style={styles.statsTitleText}>-</Text>
                        
                        <Text style={styles.digitalText}>
                            {this.state.digital_count}
                        </Text>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    statsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    statsTitleText: {
        fontSize: 30
    },
    countContainer: {
        flexDirection: 'row',
        marginRight: 20
    },
    humanText: {
        backgroundColor: '#ed0000',
        fontSize: 30,
        color: '#ed0000',
    },
    digitalText: {
        fontSize: 30,
        color: '#14ed00',
    }

})