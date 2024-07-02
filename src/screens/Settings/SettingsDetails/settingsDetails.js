import React, { useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@react-navigation/native';
import { SCALED_SIZE } from '~src/assets/fonts';
import { IconMenu } from '~src/assets/svg';
import { ProfileCard } from '~src/components';
import { screenHeight } from '~src/constants/screenSizes';
import { navigationActions } from '~src/navigation/navigationActions';
import NavigatorPath from '~src/navigatorPaths';
import { selectApp } from '~src/redux/Auth/authSelectors';
import styles from './styles';

export const SettingsDetails = () => {

    const dispatch = useDispatch();
    const { colors } = useTheme();
    const { currentUser } = useSelector(selectApp);

    useEffect(() => {
    }, [dispatch]);

    return (
        <>
            <View
                style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    height: screenHeight * 0.07,
                    backgroundColor: '#ff3c78',
                    paddingHorizontal: SCALED_SIZE.s20
                }}>

                <Text
                    style={{
                        ...styles.headingText(colors.headingWhite),
                        alignSelf: 'center',
                        paddingHorizontal: SCALED_SIZE.s10,
                        flex: 1,
                    }}
                >
                    Profile
                </Text>
                <Pressable
                    onPress={
                        () => {
                            navigationActions
                                .navigate(
                                    NavigatorPath
                                        .SettingsMenu
                                );
                        }
                    }
                >
                    <IconMenu
                        height={SCALED_SIZE.s28}
                        width={SCALED_SIZE.s28}
                    />
                </Pressable>
            </View>
            <View style={styles.container(colors.background)}>

                <ProfileCard
                    {...currentUser}
                    showBottomButton={false}
                    is_payment_plan_expired={false}
                />
            </View>
        </>
    );
};
