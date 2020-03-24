import React, { Component } from 'react'
import { View, AsyncStorage, Text, StyleSheet, FlatList, SafeAreaView, ScrollView} from 'react-native'

import axios from "axios";

import { List, ListItem } from 'react-native-elements'

export default class HistoryStats extends Component {
    state = {
        list: []
    }

    keyExtractor = (item, index) => index.toString();

    renderItem = ({ item }) => (
        <ListItem 
            title={item.name}
            subTitle={"Status: " + item.status}
            bottomDivider={true}
        />
    )

    componentDidMount() {
        axios.get("https://rickandmortyapi.com/api/character").then(response => {
            this.setState({ list: response.data.results })
        })
    }

    render () {
        return (
            <ScrollView>                
                <SafeAreaView>
                    <Text style={styles.statsTitle}>History</Text>
                    <FlatList
                        keyExtractor={this.keyExtractor}
                        data={this.state.list}
                        renderItem={this.renderItem}
                    />
                </SafeAreaView>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    statsTitle: {
        fontSize: 24,
        marginTop: 10,
        textAlign: "left"
    }
})