import React, { Component } from 'react'
import { View, AsyncStorage, Text, StyleSheet, FlatList, SafeAreaView, ScrollView} from 'react-native'


import { List, ListItem } from 'react-native-elements'

export default class HistoryStats extends Component {
    state = {
        inPersonList: [],
        digitalList: []
    }

    async _retrieveData() {
        try {
            const inPersonRegex = /([a-z]+_){1}([^_ ]+)/g
            const digitalRegex = /([a-z]+)/g
            const dateRegex = /([0-9]+_){2}([^_ ]+)/g

            await AsyncStorage.getAllKeys((err, keys) => {
                AsyncStorage.multiGet(keys, (err, stores) => {
                  stores.map((result, i, store) => {
                    // get at each store's key/value so you can work with it
                    let key = store[i][0];
                    let value = store[i][1];

                    if (key.match(inPersonRegex) == 'in_person') {
                        let list = this.state.inPersonList

                        list.push({ 
                            date: key.match(dateRegex),
                            inPersonCount: value
                        })

                        this.setState({inPersonList: list})

                    }
                    else if (key.match(digitalRegex) == 'digital') {
                        let list = this.state.digitalList

                        list.push({ 
                            date: key.match(dateRegex),
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
    
      combineLists() {
        let inPersonList = this.state.inPersonList
        let digitalList = this.state.digitalList

        let newList = inPersonList.map(itm => ({
            ...digitalList.find((item) => (item.date[0] === itm.date[0]) && item),
            ...itm
        }));

        // sorts the list
        newList.sort(function(a, b) { 
            return a.date < b.date;
        })
    
        return newList
    }
    
    componentDidMount() {
        this._retrieveData()
    }

    render () {
        let historyList = this.combineLists()

        const rendList = historyList.map( (data, idx) => {
            return (
                <View style={styles.statsContainer} key={idx}>
                        <View>
                        <Text style={styles.statsTitleText}>{data.date}</Text>
                    </View>
                
                    <View style={styles.countContainer}>
                        <Text style={styles.humanText}>
                            {data.inPersonCount}
                        </Text>
                        
                        <Text style={styles.digitalText}>
                            {data.digitalCount}
                        </Text>
                    </View>
                </View>
            )
        })

        return (
            <ScrollView>                
                <SafeAreaView>
                    <Text style={styles.statsTitleText}>History</Text>
                    <View>
                        {rendList}
                    </View>
                </SafeAreaView>
            </ScrollView>
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