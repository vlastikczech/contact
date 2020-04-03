import React from 'react'
import { StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

export default function Inset(props) {
    return (
        <LinearGradient 
            style={styles.inset}
            colors={['#d5d5d5', '#ffffff']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            {props.children}
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    inset: {
        width: 44,
        height: 44,
        borderRadius: 13,
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
})