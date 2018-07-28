import React from 'react'
import {StyleSheet, View} from 'react-native'
import HomePage from './src/components/HomePage'
import Header from "./src/components/Header"

export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Header/>
                <HomePage/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 18,
    },
})
