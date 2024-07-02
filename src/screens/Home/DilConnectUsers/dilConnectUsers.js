import React from 'react';
import { FlatList, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SCALED_SIZE } from '~src/assets/fonts';
import { Header, ProfileCard } from '~src/components';
import { selectApp } from '~src/redux/Auth/authSelectors';
import { setSelectedUser } from '~src/redux/Home/homeActions';
import { selectDilReceivedStates } from '~src/redux/Home/homeSelectors';

export const DilConnectUsers = () => {
    const { currentUser } = useSelector(selectApp);
    const dilReceivedStates = useSelector(selectDilReceivedStates);
    const dispatch = useDispatch();
    return (
        <>
            <Header
                title="Dil Connect Users"
                showBackIcon
            />
            <FlatList
                contentContainerStyle={{
                    flexGrow: 1,
                    paddingVertical: SCALED_SIZE.s20
                }}
                horizontal
                data={
                    dilReceivedStates
                        .dilReceivedUsers
                }
                keyExtractor={item => item?.id?.toString()}
                renderItem={
                    item =>
                        <Pressable
                            onPress={() => {
                                dispatch(setSelectedUser(item));
                            }}
                            key={item?.id?.toString()}
                            style={{
                                marginVertical: SCALED_SIZE.s10,
                            }}
                        >
                            <ProfileCard
                                key={item?.id?.toString()}
                                {...item}
                                showBottomButton={false}
                                is_payment_plan_expired={currentUser?.is_payment_plan_expired}
                                displayDetails={false}
                            />
                        </Pressable>
                }
            />
        </>
    );
};
