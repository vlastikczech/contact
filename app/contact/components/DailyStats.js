import React, { Component } from 'react'
import { View, AsyncStorage, Text, StyleSheet, FlatList, SafeAreaView, ScrollView} from 'react-native'


export default class DailyStats extends Component {
    state = {
        in_person_count: 0,
        digital_count: 0,
    }

    getStorageKey(name) {
        let today = new Date();
        let date = today.getDate() + "_" + parseInt(today.getMonth()+1) + "_" + today.getFullYear()
        return '@' + name + '_' + date;
    }

    updateCounters() {
        const in_person = this.getStorageKey('in_person')
        const digital = this.getStorageKey('digital')

        this._retrieveData(in_person, 'in_person_count')
        this._retrieveData(digital, 'digital_count')
    }

    async _retrieveData(key, state) {
        try {
            const value = await AsyncStorage.getItem(key);
        
            if (value !== null) {
                // We have data!!
                this.setState({[state]: parseInt(value, 10)});
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
                        <Text style={styles.statsTitleText}>Today:</Text>
                    </View>
                
                    <View style={styles.countContainer}>
                        <Text style={styles.humanText}>
                            {this.state.in_person_count}
                        </Text>

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
        borderBottomWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.12)',
        padding: 16,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'rgb(255, 255, 255)',
        justifyContent: 'space-between',
        width: '100%'
    },
    statsTitleText: {
        fontSize: 30
    },
    countContainer: {
        flexDirection: 'row',
        marginRight: 20,
    },
    humanText: {
        backgroundColor: '#ed0000',
        fontSize: 30,
        color: 'white',
        borderRadius: 50,
        width: 40,
        height: 40,
        lineHeight: 40,
        textAlign: 'center'
    },
    digitalText: {
        backgroundColor: '#14ed00',
        fontSize: 30,
        color: 'white',
        borderRadius: 50,
        width: 40,
        height: 40,
        lineHeight: 40,
        textAlign: 'center'
    }

})