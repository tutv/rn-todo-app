import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'

class HomePage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>ToDo App</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    }
})

export default HomePage