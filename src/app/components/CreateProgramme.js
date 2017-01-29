import React, { Component, PropTypes } from 'react';
import { Navigator, Text, View, TextInput, TouchableHighlight } from 'react-native';

import { styles } from '../styles/styles';

export class CreateProgramme extends Component {

    static get propTypes() {
        return {
            navigator: PropTypes.instanceOf(Navigator).isRequired
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            highDuration: '',
            lowDuration: '',
            intervals: ''
        };
    }

    startProgramme() {
        // Remove focus hack
        this.refs.Repeat.setNativeProps({'editable':false});
        this.refs.Repeat.setNativeProps({'editable':true});

        const navigator = this.props.navigator;
        let passProps = {};
        for (prop in this.state) {
            if (this.state[prop].length > 0) {
                passProps[prop] = this.state[prop];
            }
        }
        navigator.push({
            name: 'Programme',
            passProps
        })
    }

    render() {
        return <View style={{ flex: 1 }}>
            <View style={{ flex:1, backgroundColor: '#e74c3c', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.createHeader}>High</Text>
                <TextInput
                    ref="High"
                    style={styles.createInput}
                    keyboardType="numeric"
                    returnKeyType="next"
                    onSubmitEditing={() => this.refs.Low.focus()}
                    // placeholder="seconds"
                    value={this.state.highDuration}
                    onChangeText={(highDuration) => this.setState({ highDuration })}
                    blurOnSubmit={false}
                />
            </View>

            <View style={{ flex:1, backgroundColor: '#3498db', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.createHeader}>Low</Text>
                <TextInput
                    ref="Low"
                    style={styles.createInput}
                    keyboardType="numeric"
                    returnKeyType="next"
                    onSubmitEditing={() => this.refs.Repeat.focus()}
                    // placeholder="seconds"
                    value={this.state.lowDuration}
                    onChangeText={(lowDuration) => this.setState({ lowDuration })}
                    blurOnSubmit={false}
                />
            </View>

            <View style={{ flex:1, backgroundColor: '#8e44ad', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.createHeader}>Repeat</Text>
                <TextInput
                    ref="Repeat"
                    style={styles.createInput}
                    keyboardType="numeric"
                    // placeholder="no. times"
                    value={this.state.intervals}
                    onChangeText={(intervals) => this.setState({ intervals })}
                />
                <Text>+1 high interval</Text>
            </View>

            <View style={{ flex:1, backgroundColor: '#27ae60', alignItems: 'center', justifyContent: 'center' }}>
                <TouchableHighlight style={styles.fullButton} ref="Start" onPress={() => this.startProgramme()}>
                    <Text style={styles.createHeader}>Start</Text>
                </TouchableHighlight>
            </View>
        </View>
    }
}