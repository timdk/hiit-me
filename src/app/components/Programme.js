import React, { Component, PropTypes } from 'react';
import { Text, View, Platform, BackAndroid, Navigator, Vibration } from 'react-native';

import { Interval, IntervalTypes } from './Interval';
import { TimeDisplay } from './TimeDisplay';

// import { navigatorBack } from '../utils/navigatorBack';
import { formatTime } from '../utils/formatTime';

import { styles } from '../styles/styles';

const IntervalColors = {
    w: 'lemonchiffon',
    h: '#e74c3c',
    l: '#3498db',
    c: 'lemonchiffon'
}

/**
 * An interval training programme. Consists of a warm up, a 
 * number of repeating high and low intervals and a cooldown.
 * @class Programme
 * @extends Component
 * @export
 */
export class Programme extends Component {

    static get defaultProps() {
        return {
            highDuration: 15,
            lowDuration: 30,
            intervals: 10
        }
    }

    static get propTypes() {
        return {
            navigator: PropTypes.instanceOf(Navigator).isRequired
        }
    }

    // static get propTypes() {
    //     return {
    //         highDuration: PropTypes.number.isRequired,
    //         lowDuration: PropTypes.number.isRequired,
    //         intervals: PropTypes.number
    //     }
    // }

    constructor(props) {
        super(props);
        this.state = {
            currentInterval: 0,
            totalTimeElapsed: 0,
            complete: false
        }
        this.handleTick = this.handleTick.bind(this);
        this.handleIntervalComplete = this.handleIntervalComplete.bind(this);
        
    }

    componentDidMount() {
        if (Platform.OS === 'android') {
            this.handleAndroidBackButton = this.handleAndroidBackButton.bind(this);
            BackAndroid.addEventListener('hardwareBackPress', this.handleAndroidBackButton);
        }
    }

    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackAndroid.removeEventListener('hardwareBackPress', this.handleAndroidBackButton);
        }
    }

    handleAndroidBackButton() {
        // navigatorBack(this.props.navigator);
        if (this.props.navigator && this.props.navigator.getCurrentRoutes().length > 1) {
            this.props.navigator.pop();
            return true;
        }
        return false;
    }

    handleTick() {
        const totalTimeElapsed = this.state.totalTimeElapsed + 1;
        this.setState({ totalTimeElapsed: totalTimeElapsed });
    }

    handleIntervalComplete() {
        const currentInterval = this.state.currentInterval + 1;
        if (currentInterval === parseFloat(this.props.intervals) * 2 + 1) {
            this.setState({ complete: true });
        } else {
            this.setState({ currentInterval });
        }
        // Vibration.vibrate(1000);
    }

    getCurrentIntervalType() {
        return (this.state.currentInterval + 1) % 2 ? IntervalTypes.High : IntervalTypes.Low;
    }

    getCurrentIntervalDuration(intervalType) {
        if (!intervalType) {
            intervalType = this.getCurrentIntervalType();
        }
        return (intervalType === IntervalTypes.High) ? this.props.highDuration : this.props.lowDuration;
    }

    render() {
        const currentInterval = this.state.currentInterval + 1;
        const totalIntervals = parseFloat(this.props.intervals) * 2 + 1;
        const backgroundColor = IntervalColors[this.getCurrentIntervalType()];

        return <View style={{ flex: 1, backgroundColor }}>
            <View style={styles.container}>
                <Text style={styles.programmeHeader}>Interval</Text>
                <Text style={{ fontSize: 20 }}>{ currentInterval } / { totalIntervals }</Text>
            </View>

            { this.state.complete ? (
                <View style={styles.container}><Text style={{ fontSize: 100, fontWeight: 'bold'}}>Done!</Text></View>
            ) : (
                <Interval duration={this.getCurrentIntervalDuration()}
                    onTick={this.handleTick} onComplete={this.handleIntervalComplete}>
                </Interval>
            )}

            <View style={styles.container}>
                <TimeDisplay style={{ flex: 1 }}
                    caption="Elapsed"
                    seconds={this.state.totalTimeElapsed}>
                </TimeDisplay>
            </View>
        </View>
    }

}