import React, { Component } from 'react';
import { Text, View } from 'react-native';

import { Timer } from './Timer';
import { formatTime } from '../utils/formatTime';

const IntervalTypes = {
    Warmup: 'w',
    High: 'h',
    Low: 'l',
    Cooldown: 'c'
}

const IntervalColors = {
    w: 'lemonchiffon',
    h: 'orangered',
    l: 'skyblue',
    c: 'lemonchiffon'
}



export class Programme extends Component {

    constructor(props) {
        super(props);
        this.handleTick = this.handleTick.bind(this);
        this.handleIntervalComplete = this.handleIntervalComplete.bind(this);
        this.state = {
            currentInterval: 0,
            totalTimeElapsed: 0.0,
        }
    }

    handleTick() {
        const totalTimeElapsed = this.state.totalTimeElapsed + 1;
        this.setState({ totalTimeElapsed });
    }

    handleIntervalComplete() {
        const currentInterval = this.state.currentInterval + 1;
        this.setState({ currentInterval });
    }

    render() {
        const currentInterval = this.state.currentInterval + 1;
        const intervalType = currentInterval % 2 ? IntervalTypes.High : IntervalTypes.Low;
        
        const duration = intervalType === IntervalTypes.High ? this.props.highDuration : this.props.lowDuration;
        const timeElapsed = this.state.totalTimeElapsed;

        const backgroundColor = IntervalColors[intervalType];

        return <View style={{ flex: 1, backgroundColor }}>
            <View style={{ flex:1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>{ currentInterval }</Text>
            </View>

            <Timer intervalDuration={duration} onTick={this.handleTick} onComplete={this.handleIntervalComplete}></Timer>

            <View style={{ flex:1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Elapsed</Text>
                <Text>{ formatTime(timeElapsed) }</Text>
            </View>
        </View>
    }

}