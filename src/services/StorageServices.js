import {AsyncStorage} from 'react-native'
import uuid from 'uuid/v4'

const _getKey = () => {
    return '@cg:tasks'
}

const _storeListTasks = (tasks) => {
    const tasksValidated = Array.isArray(tasks) ? tasks : []
    const stringToStore = JSON.stringify(tasksValidated)

    return AsyncStorage.setItem(_getKey(), stringToStore)
}

export const getListTasks = () => {
    return AsyncStorage.getItem(_getKey())
        .then(str => {
            if (!str) return []

            try {
                const tasks = JSON.parse(str)

                return Array.isArray(tasks) ? tasks : []
            } catch (e) {
                return []
            }
        })
}

export const addTask = (name) => {
    if (!name) {
        return Promise.reject('Task name is empty')
    }

    const task = {
        id: uuid(),
        created: Date.now(),
        name,
        completed: false
    }

    return getListTasks()
        .then(currentTasks => {
            const tasks = [].concat([task], currentTasks)

            return _storeListTasks(tasks)
                .then(() => task)
        })
}

export const removeTask = (id) => {
    return getListTasks()
        .then(currentTasks => {
            const tasks = currentTasks.filter((task) => task.id !== id)

            return _storeListTasks(tasks)
                .then(() => tasks)
        })
}

export const toggleTask = (id) => {
    return getListTasks()
        .then(currentTasks => {
            const tasks = currentTasks.map(task => {
                if (task.id === id) {
                    return {
                        ...task,
                        completed: !task.completed
                    }
                }

                return task
            })

            return _storeListTasks(tasks)
                .then(() => tasks)
        })

}