import React, {Component} from 'react'
import {View, Text, ScrollView, StyleSheet} from 'react-native'
import PropTypes from 'prop-types'

class ListTodo extends Component {
    render() {
        const {tasks} = this.props

        return (
            <View style={styles.container}>
                <ScrollView>
                    {
                        tasks.map((task, index) => {
                            console.log(task)

                            return (
                                <Text key={index}>{task}</Text>
                            )
                        })
                    }
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%'
    }
})

ListTodo.propTypes = {
    tasks: PropTypes.array.isRequired,
}

export default ListTodo