import React, { Component } from 'react'
import { View, AsyncStorage, Text, StyleSheet, SafeAreaView} from 'react-native'

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
            date = today.getDate() + "_" + parseInt(today.getMonth()+1) + "_" + today.getFullYear()
        } else {
            date = (today.getDate() - parseInt(minusDays)) + "_" + parseInt(today.getMonth()+1) + "_" + today.getFullYear()
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

        for(var i = 0; i < days; i++) {
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
                        <Text style={styles.statsTitleText}>{this.state.title}</Text>
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