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
    }
})