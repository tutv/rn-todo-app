import React, {Component} from 'react'
import {View, ScrollView, StyleSheet} from 'react-native'
import PropTypes from 'prop-types'
import TaskItem from "./TaskItem"

class ListTasks extends Component {
    _handleRemoveTask = index => {
        this.props.onRemove(index)
    }

    render() {
        const {tasks} = this.props

        return (
            <View style={styles.container}>
                <ScrollView>
                    {
                        tasks.map((task, index) => {
                            return (
                                <TaskItem onRemove={this._handleRemoveTask} key={index} index={index} task={task}/>
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

ListTasks.propTypes = {
    tasks: PropTypes.array.isRequired,
    onRemove: PropTypes.func.isRequired,
}

export default ListTasks