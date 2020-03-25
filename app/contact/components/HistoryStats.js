import React, { Component } from 'react'
import moment from 'moment';
import { View, AsyncStorage, Text, StyleSheet, SafeAreaView, ScrollView} from 'react-native'

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
            return a.date < b.date;
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

        const rendList = historyList.map( (data, idx) => {
            return (
                <View style={styles.statsContainer} key={idx}>
                        <View>
                        <Text style={styles.dateText}>{data.date}</Text>
                    </View>
                
                    <View style={styles.countContainer}>
                        <Text style={styles.humanText}>
                            {data.inPersonCount}
                        </Text>
                        <View style={styles.verticalHr}/>
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
                    <Text style={styles.titleText}>History</Text>
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
    titleText: {
        fontSize: 30,
        marginLeft: 16,
        marginTop: 10,
        marginBottom: 2
    },
    dateText: {
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