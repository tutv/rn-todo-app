import {AsyncStorage} from 'react-native'

const _getKey = () => {
    return '@cg:tasks'
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

export const storeListTasks = (tasks) => {
    const tasksValidated = Array.isArray(tasks) ? tasks : []
    const stringToStore = JSON.stringify(tasksValidated)

    return AsyncStorage.setItem(_getKey(), stringToStore)
}

export const addTask = (name) => {
    return getListTasks()
        .then(currentTasks => {
            const tasks = [].concat([name], currentTasks)

            return storeListTasks(tasks)
                .then(() => name)
        })
}