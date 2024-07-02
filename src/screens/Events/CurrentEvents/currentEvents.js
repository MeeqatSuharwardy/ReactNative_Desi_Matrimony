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
import { changeEventStatus, getCurrentEventRequest } from '~src/redux/Events/eventsActions';
import { selectCurrentEventStates } from '~src/redux/Events/eventsSelectors';
import { NoDataView, Loader } from '../components';
import styles from './styles';

export const CurrentEvents = () => {

    const dispatch = useDispatch();
    const currentEventsStates = useSelector(selectCurrentEventStates);
    const { colors } = useTheme();

    useEffect(() => {
        dispatch(getCurrentEventRequest());
    }, [dispatch]);
    const detailsButtonPressed = useCallback((item, index) => {
        navigationActions.navigate(NavigatorPath.UnderConstruction);
        console.log(item, index);
    }, []);
    const joinButtonPressed = useCallback((item, index) => {
        dispatch(changeEventStatus({ item, index, from: 'current' }));
    }, [dispatch]);
    return (
        <View style={styles.container(colors.background)}>
            {
                currentEventsStates
                    .fetchingCurrentEventsRequest
                    ?
                    <Loader />
                    :
                    currentEventsStates
                        .currentEvents
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
                                    currentEventsStates
                                        .currentEvents
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
                                        />
                                }
                                onRefresh={() => dispatch(getCurrentEventRequest())}
                                refreshing={currentEventsStates.fetchingCurrentEventsRequest}
                            />
                        </>
                        :
                        <NoDataView />
            }
        </View>
    );
};
