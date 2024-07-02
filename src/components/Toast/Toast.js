import React, { useState, useEffect, memo } from 'react';
import { StyleSheet, View, Animated, Text, ViewPropTypes as RNViewPropTypes } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { screenHeight } from '~src/constants/screenSizes';
import TOAST from './constants';

// eslint-disable-next-line react/forbid-foreign-prop-types
const ViewPropTypes = RNViewPropTypes || View.propTypes;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        elevation: 999,
        alignItems: 'center',
        zIndex: 10000
    },
    content: {
        backgroundColor: 'black',
        borderRadius: 5,
        padding: 10
    },
    text: {
        color: 'white'
    }
});

export const DURATION = {
    LENGTH_SHORT: 500,
    FOREVER: 0
};

const ToastWrapped = props => {
    // eslint-disable-next-line no-unused-vars
    const [opacity, setOpacity] = useState(new Animated.Value(props.opacity));
    const dispatch = useDispatch();

    useEffect(() => () => {
        // eslint-disable-next-line no-unused-expressions
        this.animation && this.animation.stop();
        // eslint-disable-next-line no-unused-expressions
        this.timer && clearTimeout(this.timer);
    }, []);

    useEffect(() => {
        if (props.isShowing) {
            // eslint-disable-next-line no-use-before-define
            show();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.isShowing]);


    const close = duration => {
        let delay = typeof duration === 'undefined' ? this.duration : duration;

        if (delay === DURATION.FOREVER) delay = props.defaultCloseDelay || 250;

        if (!this.isShow && !props.isShowing) return;
        // eslint-disable-next-line no-unused-expressions
        this.timer && clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.animation = Animated.timing(opacity, {
                toValue: 0.0,
                duration: props.fadeOutDuration,
                useNativeDriver: true
            });
            this.animation.start(() => {
                dispatch({ type: TOAST.TOAST_TRIGGER_OFF });
                this.isShow = false;
                if (typeof this.callback === 'function') {
                    this.callback();
                }
            });
        }, delay);
    };
    const show = (duration, callback) => {
        this.duration =
            typeof duration === 'number' ? duration : DURATION.LENGTH_SHORT;
        this.callback = callback;

        this.animation = Animated.timing(opacity, {
            toValue: props.opacity,
            duration: props.fadeInDuration,
            useNativeDriver: true
        });

        this.animation.start(() => {
            this.isShow = true;
            if (duration !== DURATION.FOREVER) {
                close();
            }
        });
    };

    let pos;
    switch (props.position) {
    case 'top':
        pos = props.positionValue;
        break;
    case 'center':
        pos = screenHeight / 2;
        break;
    case 'bottom':
        pos = screenHeight - props.positionValue;
        break;
    default:
        break;
    }

    const view = props.isShowing ? (
        <View style={[styles.container, { top: pos }]} pointerEvents="none">
            <Animated.View style={[styles.content, { opacity }, props.style]}>
                {React.isValidElement(props.text) ?
                    props.text
                    : (
                        <Text style={props.textStyle}>{props.text}</Text>
                    )}
            </Animated.View>
        </View>
    ) : null;

    return view;
};

export const Toast = memo(() => {
    const props = useSelector(state => state.toast);
    return <ToastWrapped {...props} />;
});

ToastWrapped.propTypes = {
    style: ViewPropTypes.style,
    position: PropTypes.oneOf(['top', 'center', 'bottom']),
    textStyle: Text.propTypes.style,
    positionValue: PropTypes.number,
    fadeOutDuration: PropTypes.number,
    opacity: PropTypes.number
};

ToastWrapped.defaultProps = {
    position: 'bottom',
    textStyle: styles.text,
    positionValue: 120,
    fadeInDuration: 0,
    fadeOutDuration: 1500,
    opacity: 1
};
