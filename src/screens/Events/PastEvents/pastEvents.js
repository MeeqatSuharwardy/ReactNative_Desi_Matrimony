/* eslint-disable no-console */
/* eslint-disable no-nested-ternary */
import React, { useCallback, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@react-navigation/native';
import { SCALED_SIZE } from '~src/assets/fonts';
import {
    IconTopWave
} from '~src/assets/svg';
import { EventsCard } from '~src/components';
import { navigationActions } from '~src/navigation/navigationActions';
import NavigatorPath from '~src/navigatorPaths';
import { getPastEventRequest } from '~src/redux/Events/eventsActions';
import { selectPastEventStates } from '~src/redux/Events/eventsSelectors';
import { NoDataView, Loader } from '../components';
import styles from './styles';

export const PastEvents = () => {

    const dispatch = useDispatch();
    const pastEventsStates = useSelector(selectPastEventStates);
    const { colors } = useTheme();

    useEffect(() => {
        dispatch(getPastEventRequest());
    }, [dispatch]);
    const detailsButtonPressed = useCallback((item, index) => {
        navigationActions.navigate(NavigatorPath.UnderConstruction);
        console.log(item, index);
    }, []);
    const joinButtonPressed = useCallback((item, index) => {
        console.log(item, index);
    }, []);
    return (
        <View style={styles.container(colors.background)}>
            {
                pastEventsStates
                    .fetchingPastEventsRequest
                    ?
                    <Loader />
                    :
                    pastEventsStates
                        .pastEvents
                        .length > 0
                        ?
                        <>
                            <View
                                style={styles.topSvg}>
                                <IconTopWave />
                            </View>
                            <FlatList
                                contentContainerStyle={{
                                    flexGrow: 1,
                                    padding: SCALED_SIZE.s20
                                }}
                                data={
                                    pastEventsStates
                                        .pastEvents
                                }
                                keyExtractor={item => item.id.toString()}
                                renderItem={
                                    ({ item, index }) =>
                                        <EventsCard
                                            item={item}
                                            index={index}
                                            start_date={item?.start_date}
                                            end_date={item?.end_date}
                                            title={item?.title}
                                            address={item?.address}
                                            country={item?.country}
                                            city={item?.city}
                                            state={item?.state}
                                            interest_status={item?.interest_status}
                                            detailsButtonPressed={detailsButtonPressed}
                                            joinButtonPressed={joinButtonPressed}
                                            showJoinButton={false}
                                        />
                                }
                                onRefresh={() => dispatch(getPastEventRequest())}
                                refreshing={pastEventsStates.fetchingPastEventsRequest}
                            />
                        </>
                        :
                        <NoDataView />
            }
        </View>
    );
};
