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
                        <View style={styles.verticalHr}/>
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
        fontSize: 24
    },
    countContainer: {
        flexDirection: 'row',
        marginRight: 20,
    },
    humanText: {
        fontSize: 24,
        color: '#ed0000',
        width: 50,
        textAlign: 'center'
    },
    digitalText: {
        fontSize: 24,
        color: '#14ed00',
        width: 50,
        textAlign: 'center'
    },
    verticalHr: {
        borderLeftColor: '#D3D3D3',
        borderLeftWidth: 1,
        opacity: .7,
        height: '100%',
    },
})