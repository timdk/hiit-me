import React, { Component } from 'react';
import { Text, View } from 'react-native';

import { styles } from '../styles/styles';
import { formatTime } from '../utils/formatTime';

export class TimeDisplay extends Component {
    timerId;

    constructor(props) {
        super(props);
    }

    render() {
        const displayTime = formatTime(this.props.seconds);
        const caption = this.props.caption;
        const style = this.props.size === 'large' ? styles.timeLarge : styles.timeSmall;
        return <View style={styles.container}>
            { caption && <Text style={styles.programmeHeader}>{ caption }</Text> }
            <Text
              style={style}>
                { displayTime }
            </Text>
        </View>
    }
}