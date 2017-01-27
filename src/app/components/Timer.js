import React, { Component } from 'react';
import { Text, View } from 'react-native';

import { formatTime } from '../utils/formatTime';

export class Timer extends Component {
    timerId;

    constructor(props) {
        super(props);

        this.state = {
            timeElapsed: 0.0
        };
    }

    componentDidMount() {
        this.start();
    }

    componentWillUnmount() {
        this.stop();
    }

    start() {
        this.timerInterval = setInterval(() => this.tick(), 1000);
    }

    stop() {
        clearInterval(this.timerInterval);
    }

    tick() {
        const timeElapsed = this.state.timeElapsed + 1;
        const complete = timeElapsed > this.props.intervalDuration;
        
        this.setState({ timeElapsed });
        
        this.props.onTick();
        if (complete) { 
            //this.stop();
            this.props.onComplete();    // Notify the programme
            this.setState({ timeElapsed: 0 });
            // this.start();
        };
    }

    render() {
        const timeElapsed = this.state.timeElapsed;
        const timeRemaining = parseFloat(this.props.intervalDuration) - timeElapsed;

        return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 100, fontWeight: 'bold' }}>{ formatTime(timeRemaining) }</Text>
        </View>
    }
}