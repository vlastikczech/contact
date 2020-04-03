import React, { Component } from 'react'
import { View, AsyncStorage, Text, StyleSheet, SafeAreaView} from 'react-native'
import Inset from '../assets/UI/Inset';

export default class MultiDayStats extends Component {
    state = {
        in_person_count: 0,
        digital_count: 0,
        title: this.props.title,
        days: this.props.days
    }

    getStorageKey(name, minusDays) {
        let today = new Date();
        let date;

        if (minusDays == 0) {
            date = today.getDate() + "_" + parseInt(today.getMonth()+1, 10) + "_" + today.getFullYear()
        } else {
            date = (today.getDate() - parseInt(minusDays, 10)) + "_" + parseInt(today.getMonth()+1, 10) + "_" + today.getFullYear()
        }

        return '@' + name + '_' + date;
    }

    clearCounters() {
        this.state.digital_count = 0
        this.state.in_person_count = 0
    }

    updateCounters() {
        this.clearCounters()
        let days = this.state.days
        // start at 1 to exclude today, then add one to make the count accurate (i.e. '3' give you the average of the last 3 full days)
        for(var i = 1; i < days+1; i++) {
            let in_person = this.getStorageKey('in_person', i)
            let digital = this.getStorageKey('digital', i)
            this._retrieveData(in_person, 'in_person_count')
            this._retrieveData(digital, 'digital_count')
        }
    }

    async _retrieveData(key, state) {
        try {
            let value = await AsyncStorage.getItem(key);
        
            if (value !== null) {
                //convert value to int
                value = parseInt(value, 10)

                if (state == 'in_person_count') {
                    this.setState({[state]: (this.state.in_person_count + value)});
                } else if (state == 'digital_count') {
                    this.setState({[state]: (this.state.digital_count + value)});
                }
                console.log(value);
            } else {
                console.log("No " + key + " key stored");
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
                    <View style={styles.itemBox}>
                        <View>
                            <Text style={styles.statsTitleText}>{this.state.title}</Text>
                        </View>
                    
                        <View style={styles.countContainer}>
                            <Inset>
                                <Text style={styles.humanText}>
                                    {this.state.in_person_count}
                                </Text>
                            </Inset>
                            <View style={styles.horizontalSpace}/>
                            <Inset>
                                <Text style={styles.digitalText}>
                                    {this.state.digital_count}
                                </Text>
                            </Inset>
                        </View>
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
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    statsTitleText: {
        fontSize: 24,
        color: '#989898'
    },
    itemBox: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#F0F0F0',
        padding: 16,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
        width: '90%',
        borderRadius: 19,
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,
        elevation: 13
    },
    countContainer: {
        flexDirection: 'row',
        marginRight: 20,
    },
    humanText: {
        fontSize: 24,
        color: '#D03251',
        width: 50,
        textAlign: 'center'
    },
    digitalText: {
        fontSize: 24,
        color: '#26BF9B',
        width: 50,
        textAlign: 'center'
    },
    horizontalSpace: {
        marginHorizontal: 5
    }
})