import React, { useEffect, useRef } from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { Congratulation } from '~src/assets/animations';
import { IconBottomWave, IconTopWave } from '~src/assets/svg';
import { Button } from '~src/components';
import { CLAUSE } from '~src/constants/displayTexts';
import { navigationActions } from '~src/navigation/navigationActions';
import NavigatorPath from '~src/navigatorPaths';
import styles from './styles';

export const SignupSuccessful = () => {

    const { colors } = useTheme();
    const animation = useRef();

    useEffect(() => {
        setTimeout(() => {
            animation?.current?.play();
        }, 1000);
    }, [animation]);

    return (
        <View
            style={styles.container(colors.background)}
        >
            <View
                style={styles.topSvg}>
                <IconTopWave />
            </View>
            <View
                style={styles.bottomSvg}>
                <IconBottomWave />
            </View>
            <Text
                style={styles.headingText(colors.boldHeadingText)}>
                {CLAUSE.ACCOUNT_SUCCESSFULLY_CREATED}
            </Text>
            <Text
                style={styles.miniHeadingText(colors.boldHeadingText)}>
                {CLAUSE.WE_HAVE_SENT_YOU_AN_EMAIL}
            </Text>
            <LottieView
                ref={animation}
                source={Congratulation}
                autoPlay
                loop
            />
            <Button
                loading={false}
                disabled={false}
                buttonContainerStyle={styles.continueButton}
                title={CLAUSE.CONTINUE}
                onPress={()=>{
                    navigationActions.replace(NavigatorPath.Login);
                }}
            />
        </View>
    );
};
