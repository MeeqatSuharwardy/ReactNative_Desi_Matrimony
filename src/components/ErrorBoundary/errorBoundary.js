import React from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import RNRestart from 'react-native-restart';
import { FONT, SCALED_SIZE } from '~src/assets/fonts';
import { APP_ICON_PINK_TRANSPARENT } from '~src/assets/images';
import { ERROR_BOUNDARY } from '~src/constants/displayTexts';
import { screenHeight, screenWidth } from '~src/constants/screenSizes';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    iconStyle: {
        width: screenWidth * 0.36,
        height: screenHeight * 0.2,
        alignSelf: 'center'
    }
});

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
    }

    handleRestartClick = () => {
        RNRestart.Restart();
    };

    render() {
        if (this.state.hasError) {
            return (
                <View
                    style={styles.container}>
                    <Text
                        style={{
                            fontFamily: FONT.BOLD,
                            fontSize: SCALED_SIZE.s20
                        }}
                    >
                        {ERROR_BOUNDARY.TITLE}
                    </Text>
                    <Image
                        source={APP_ICON_PINK_TRANSPARENT}
                        resizeMode="contain"
                        style={styles.iconStyle}
                    />
                    <Text
                        style={{
                            fontFamily: FONT.MEDIUM,
                            fontSize: SCALED_SIZE.s16,
                            paddingVertical: SCALED_SIZE.s20
                        }}
                    >
                        {ERROR_BOUNDARY.MESSAGE}
                    </Text>
                    <Button
                        onPress={this.handleRestartClick}
                        title={ERROR_BOUNDARY.ACTION_LABEL}
                    />
                </View>
            );
        }
        return this.props.children;
    }
}
