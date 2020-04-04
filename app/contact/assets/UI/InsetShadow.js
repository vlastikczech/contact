import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

export default function InsetShadow(props) {
    return (
        <View style={{flex: 1, maxHeight: '100%', maxWidth: '100%'}}>
            <LinearGradient
                style={styles.gradient}
                locations={[0, 0.03]}
                colors={['#d4d4d4', 'transparent']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
            >
            <LinearGradient
                style={styles.gradient}
                locations={[0, 0.03]}
                colors={['#dbdbdb', 'transparent']}
                start={{ x: 1, y: 1 }}
                end={{ x: 0, y: 1 }}
            >
                <LinearGradient
                    style={styles.gradient}
                    locations={[0, props.size]}
                    colors={['#dbdbdb', 'transparent']}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 0, y: 0 }}
                >
                    <LinearGradient
                        style={styles.gradient}
                        locations={[0, props.size]}
                        colors={['#d4d4d4', 'transparent']}
                    >
                            {props.children}
                        </LinearGradient>
                    </LinearGradient>
                </LinearGradient>
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
        borderRadius: 23,
        // #c4c4c4
    },
});