# Sử dụng AsyncStorage trong React Native

## Mục tiêu

Thực hành kiến thức về AysncStorage trong React Native.

## Mô tả

- Tạo 1 project với `creact-react-native-app`.
- Tạo màn hình hiển thị danh sách các công việc cần làm hàng ngày (tasks).
- Các task cho phép xóa hoặc complete/uncomplete.
- Tạo 1 form để tạo task mới.

## Hướng dẫn

### Bước 1:

- Tạo một file `StorageServices.js` với các function `addTask`, `getListTasks`, 'removeTask', `toggleTask`.

(Ở trong đây có sử dụng thêm 1 thư viện `uuid` để generate unique id cho các task. Thêm thư viện vào project bằng cách cài đặt: `npm i --save uuid`)

```javascript
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
```

### Bước 2

- Tạo 1 component tên là: `HomePage.js`, trong componenent này sẽ quản lý các `tasks` trong state và giao tiếp với `AsyncStorage` thông qua `StorageServices.js` để thay dổi dữ liệu.

Khi `componentDidMount` thì ta sẽ lấy ra list tasks hiện tại đã lưu lại trước đó. Còn lại là lắng nghe các event từ các child components để `thêm, sửa, xóa` các task.

```javascript
import React, {Component} from 'react'
import {View, StyleSheet} from 'react-native'
import ListTasks from "./ListTasks"
import FormCreate from "./FormCreate"
import {getListTasks, addTask, removeTask, toggleTask} from '../services/StorageServices'

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

    _handleOnRemove = id => {
        removeTask(id)
            .then((currentTasks) => {
                this.setState({
                    tasks: currentTasks
                })
            })
    }

    _handleToggleTask = (id) => {
        toggleTask(id)
            .then((tasks) => {
                this.setState({
                    tasks,
                })
            })
    }

    render() {
        const {tasks} = this.state

        return (
            <View style={styles.container}>
                <FormCreate onCreate={this._handleOnCreate}/>
                <ListTasks onToggle={this._handleToggleTask} onRemove={this._handleOnRemove} tasks={tasks}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        flexDirection: 'column',
        width: '100%',
        backgroundColor: '#eee'
    }
})

export default HomePage
```

### Bước 3

- Cuối cùng là hoàn thiện project bằng cách tạo ra các component con để render ra giao diện với dữ liệu đã có sẵn.

    * `FormCreate`: Form tạo task mới
    * `ListTasks`: Danh sách các task.

### Bước 4

- Chạy chương trình và quan sát kết quả.

### Mã nguồn

Tham khảo tại: https://github.com/tutv/rn-todo-app

## Ảnh demo

![Home](/demo/home-1.jpeg)