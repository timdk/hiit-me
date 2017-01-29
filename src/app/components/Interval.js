import React, { Component } from 'react';
import { Text, View } from 'react-native';

import { TimeDisplay } from './TimeDisplay';

export const IntervalTypes = {
    Warmup: 'w',
    High: 'h',
    Low: 'l',
    Cooldown: 'c'
}

export class Interval extends Component {
    
    tickIntervalId;

    constructor(props) {
        super(props);
        this.state = {
            timeElapsed: 0.0
        }
    }

    componentDidMount() {
        this.start();
    }

    componentWillUnmount() {
        this.stop();
    }

    start() {
        this.tickIntervalId = setInterval(() => this.tick(), 1000);
    }

    stop() {
        clearInterval(this.tickIntervalId);
    }

    tick() {
        const timeElapsed = this.state.timeElapsed + 1;
        const complete = timeElapsed > this.props.duration;
        
        this.setState({ timeElapsed });
        
        this.props.onTick();
        if (complete) { 
            this.setState({ timeElapsed: 0 });
            this.props.onComplete();    // Notify the programme
        };
    }

    render() {
        const timeElapsed = this.state.timeElapsed;
        const timeRemaining = parseFloat(this.props.duration) - timeElapsed;
        return <TimeDisplay seconds={timeRemaining} size="large"></TimeDisplay>
    }
}