import React, { Component } from 'react'
import moment from 'moment';
import { View, AsyncStorage, Text, StyleSheet, SafeAreaView, ScrollView} from 'react-native'
import InsetShadow from '../assets/UI/InsetShadow';
import Inset from '../assets/UI/Inset';

export default class HistoryStats extends Component {
    state = {
        inPersonList: [],
        digitalList: []
    }

    async _retrieveData() {
        try {
            const inPersonRegex = /([a-z]+_){1}([^_ ]+)/g
            const digitalRegex = /([a-z]+)/g

            await AsyncStorage.getAllKeys((err, keys) => {
                AsyncStorage.multiGet(keys, (err, stores) => {
                  stores.map((result, i, store) => {
                    // get at each store's key/value so you can work with it
                    let key = store[i][0];
                    let value = store[i][1];

                    if (key.match(inPersonRegex) == 'in_person') {
                        let list = this.state.inPersonList

                        list.push({ 
                            date: this.getFormattedDate(key),
                            inPersonCount: value
                        })

                        this.setState({inPersonList: list})

                    }
                    else if (key.match(digitalRegex) == 'digital') {
                        let list = this.state.digitalList

                        list.push({ 
                            date: this.getFormattedDate(key),
                            digitalCount: value
                        })

                        this.setState({digitalList: list})
                    }
                  });
                });
              });
            } catch (error) {
            // Error retrieving data
            }
      }

    getFormattedDate(key) {
        const dateRegex = /([0-9]+_){2}([^_ ]+)/g
        let date_part = key.match(dateRegex)[0]
        let parts = date_part.split('_')
        var parsed_date = new Date(parts[2], parts[1] - 1, parts[0]); 
        return moment(parsed_date).format('ll');
    }

    combineLists() {
        let inPersonList = this.state.inPersonList
        let digitalList = this.state.digitalList

        let newList = inPersonList.map(itm => ({
            ...digitalList.find((item) => (item.date[0] === itm.date[0]) && item),
            ...itm
        }));

        // sorts the list
        newList.sort(function(a, b) { 
            return a.date[0] > b.date[0];
        })

        // Remove first item of array
        newList.shift()

        // limit history list
        newList = newList.slice(0,45)

        return newList
    }

    componentDidMount() {
        this._retrieveData()
    }

    render () {
        let historyList = this.combineLists()

        const displayList = historyList.map( (data, idx) => {
            return (
                <View style={styles.statsContainer} key={idx}>
                    <View style={styles.itemBox}>
                        <View>
                            <Text style={styles.dateText}>
                                {data.date}
                            </Text>
                        </View>
                    
                        <View style={styles.countContainer}>
                            <Inset>
                                <Text style={styles.humanText}>
                                    {data.inPersonCount}
                                </Text>
                            </Inset>
                            <View style={styles.horizontalSpace}/>
                            <Inset>
                                <Text style={styles.digitalText}>
                                    {data.digitalCount}
                                </Text>
                            </Inset>
                        </View>
                    </View>
                </View>
            )
        })

        const displayEmptyList = (
            <View style={styles.statsContainer}>
                <Text style={styles.placeholderText}>--empty for now--</Text>
            </View>
        )

        return (
            <View style={styles.historyContainer}>
                <InsetShadow size={0.04}>
                    <Text style={styles.titleText}>History</Text>
                    <ScrollView>                
                        <SafeAreaView>
                            <View>
                                {historyList.length != 0 
                                    ? displayList
                                    : displayEmptyList
                                }
                            </View>
                        </SafeAreaView>
                    </ScrollView>
                </InsetShadow>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    centered: {
        // textAlign: 'center',
    },
    historyContainer: {
        width: '90%',
        flex: 1,
        marginTop: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center',
    },
    statsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    itemBox: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#F0F0F0',
        padding: 16,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 3,
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
    titleText: {
        fontSize: 24,
        marginLeft: 16,
        marginTop: 10,
        marginBottom: 2,
        fontFamily: 'Raleway-Medium',
        textAlign: 'center',
        color: '#626262'
    },
    dateText: {
        fontSize: 24,
        color: '#989898'
    },
    placeholderText: {
        fontSize: 16
    },
    countContainer: {
        flexDirection: 'row'
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