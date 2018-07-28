import React, {Component} from 'react'
import {View, Text, Button, StyleSheet} from 'react-native'
import PropTypes from 'prop-types'

class TaskItem extends Component {
    _handlePressRemove = () => {
        this.props.onRemove(this.props.index)
    }

    render() {
        const {task} = this.props

        return (
            <View style={styles.container}>
                <Text>{task}</Text>
                <Button
                    onPress={this._handlePressRemove}
                    title="x"/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})

TaskItem.propTypes = {
    task: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    onRemove: PropTypes.func.isRequired,
}

export default TaskItem