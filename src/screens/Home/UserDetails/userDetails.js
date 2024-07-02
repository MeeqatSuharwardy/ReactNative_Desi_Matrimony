import React from 'react';
import { View, Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import { SCALED_SIZE } from '~src/assets/fonts';
import { IconClose } from '~src/assets/svg';
import { ProfileCard } from '~src/components';
import { screenHeight } from '~src/constants/screenSizes';
import { navigationActions } from '~src/navigation/navigationActions';
import { selectApp } from '~src/redux/Auth/authSelectors';
import { selectSelectedUser } from '~src/redux/Home/homeSelectors';
import { generateBoxShadowStyle, isRunningOniOS } from '~src/utils/helperFuncs';
import styles from './styles';

export const UserDetails = () => {
    const selectedUser = useSelector(selectSelectedUser);
    const { currentUser } = useSelector(selectApp);

    return (
        <View style={styles.container}>
            <Pressable
                onPress={() => navigationActions.pop()}
                style={{
                    right: SCALED_SIZE.s20,
                    top: isRunningOniOS() ? screenHeight * 0.07 : SCALED_SIZE.s2,
                    position: 'absolute',
                    ...generateBoxShadowStyle()
                }}>
                <IconClose
                    height={SCALED_SIZE.s40}
                    width={SCALED_SIZE.s40}
                />
            </Pressable>
            <ProfileCard
                {...selectedUser}
                showBottomButton
                is_payment_plan_expired={currentUser?.is_payment_plan_expired}
                onMessagePressed={() => { navigationActions.pop(); }}
                onDislikePressed={() => { navigationActions.pop(); }}
                onLikePressed={() => { navigationActions.pop(); }}
            />
        </View>
    );
};
