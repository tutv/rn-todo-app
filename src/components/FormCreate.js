import React, {Component} from 'react'
import {View, TextInput, Button, StyleSheet} from 'react-native'
import PropTypes from 'prop-types'

class FormCreate extends Component {
    state = {
        text: ''
    }

    _handleChangeText = text => {
        this.setState({
            text,
        })
    }

    _handlePressAdd = () => {
        this._submit()
    }

    _handleSubmitText = () => {
        this._submit()
    }

    _submit = () => {
        const {text} = this.state

        this.props.onCreate(text)
        this.setState({
            text: ''
        })
    }

    render() {
        const {text} = this.state

        return (
            <View style={styles.container}>
                <View style={styles.form}>
                    <TextInput
                        style={styles.textInput}
                        value={text}
                        onSubmitEditing={this._handleSubmitText}
                        onChangeText={this._handleChangeText}/>
                    <Button
                        title="Add" onPress={this._handlePressAdd}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },

    form: {
        // flex: 1,
        // flexDirection: 'column',
        // justifyContent: 'center'
    },

    textInput: {
        fontSize: 14,
        borderColor: '#eee',
        borderWidth: 1,
        padding: 10,
    }
})

FormCreate.propTypes = {
    onCreate: PropTypes.func.isRequired,
}

export default FormCreate