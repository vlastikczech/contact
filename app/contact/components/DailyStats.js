import React, { Component } from 'react'
import { View, AsyncStorage, Text, StyleSheet, FlatList, SafeAreaView, ScrollView} from 'react-native'
import Inset from '../assets/UI/Inset';


export default class DailyStats extends Component {
    state = {
        in_person_count: 0,
        digital_count: 0,
    }

    getStorageKey(name) {
        let today = new Date();
        let date = today.getDate() + "_" + parseInt(today.getMonth()+1, 10) + "_" + today.getFullYear()
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
                    <View style={ styles.itemBox }>
                        <View>
                            <Text style={styles.statsTitleText}>Today</Text>
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
    horizontalSpace: {
        marginHorizontal: 5
    }
})