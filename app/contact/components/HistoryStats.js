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
            let elementMargin = 0
            if (idx === historyList.length - 1) {
                elementMargin = 12
            }
            return (
                <View style={{...styles.statsContainer, marginBottom: elementMargin}} key={idx}>
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
                <View style={styles.itemBox}>
                    <Text style={styles.placeholderText}>{`No data (yet)`}</Text>
                </View>
            </View>
        )

        return (
            <View style={styles.historyContainer}>
                <InsetShadow size={0.04}>
                    <ScrollView>                
                        <Text style={styles.titleText}>History</Text>
                        {historyList.length != 0 
                            ? displayList
                            : displayEmptyList
                        }
                    </ScrollView>
                </InsetShadow>
            </View>
        )
    }
}

const styles = StyleSheet.create({
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
        width: '100%',
        paddingVertical: 5,
    },
    itemBox: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#F0F0F0',
        paddingVertical: 13,
        paddingHorizontal: 17,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 3,
        marginHorizontal: 'auto',
        width: '90%',
        borderRadius: 19,
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,
        elevation: 7,
    },
    titleText: {
        fontSize: 24,
        marginTop: 13,
        marginBottom: 4,
        fontFamily: 'Raleway-Medium',
        textAlign: 'center',
        color: '#626262'
    },
    dateText: {
        fontSize: 24,
        color: '#989898'
    },
    placeholderText: {
        fontSize: 24,
        color: '#989898',
        paddingVertical: 7,
    },
    countContainer: {
        flexDirection: 'row'
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