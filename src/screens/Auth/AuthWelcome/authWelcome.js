import React from 'react';
import { ImageBackground, View, Image, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { BACKGROUND_IMAGE, APP_ICON_PINK_TRANSPARENT } from '~src/assets/images';
import { Button } from '~src/components';
import { CLAUSE } from '~src/constants/displayTexts';
import { navigationActions } from '~src/navigation/navigationActions';
import NavigatorPath from '~src/navigatorPaths';
import styles from './styles';

export const AuthWelcome = () => {
    const { colors } = useTheme();
    return (
        <ImageBackground
            source={BACKGROUND_IMAGE}
            resizeMode="cover"
            style={styles.mainContainer}
        >
            <View
                style={styles.container(colors.blackOverLay)} >
                <View
                    style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        resizeMode="contain"
                        source={APP_ICON_PINK_TRANSPARENT}
                    />
                    <Text
                        style={styles.logoText}
                    >
                        Dil Connection
                    </Text>
                </View>
                <View
                    style={styles.buttonContainer}>
                    <Button
                        title={CLAUSE.LOGIN}
                        buttonTextStyle={styles.loginButtontext(colors.buttonLinerGradient[0])}
                        buttonColor={styles.loginButtonColor}
                        onPress={() => {
                            navigationActions.navigate(NavigatorPath.Login);
                        }}
                    />
                    <Button
                        title={CLAUSE.CREATE_ACCOUNT}
                        onPress={() => {
                            navigationActions.navigate(NavigatorPath.Signup);
                        }}
                    />
                </View>
            </View>
        </ImageBackground>
    );
};
