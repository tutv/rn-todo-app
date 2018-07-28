import React, {Component} from 'react'
import {View, StyleSheet} from 'react-native'
import ListTasks from "./ListTasks"
import FormCreate from "./FormCreate"
import {getListTasks, addTask, removeTaks} from '../services/StorageServices'

class HomePage extends Component {
    state = {
        tasks: [],
        loading: false
    }

    componentDidMount() {
        this._fetchListTasks()
    }

    _fetchListTasks = () => {
        this.setState({loading: true})

        getListTasks().then(tasks => {
            this.setState({
                loading: false,
                tasks: Array.isArray(tasks) ? tasks : [],
            })
        }).catch(error => {
            console.error(error)

            this.setState({loading: false})
        })
    }

    _handleOnCreate = name => {
        addTask(name)
            .then(task => {
                this.setState(({tasks}) => ({
                    tasks: [].concat([task], tasks)
                }))
            })
    }

    _handleOnRemove = index => {
        removeTaks(index)
            .then(() => {
                this.setState(({tasks}) => ({
                    tasks: tasks.filter((_, _index) => _index !== index)
                }))
            })
    }

    render() {
        const {tasks} = this.state

        return (
            <View style={styles.container}>
                <FormCreate onCreate={this._handleOnCreate}/>
                <ListTasks onRemove={this._handleOnRemove} tasks={tasks}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        flexDirection: 'column',
        width: '100%'
    }
})

export default HomePage