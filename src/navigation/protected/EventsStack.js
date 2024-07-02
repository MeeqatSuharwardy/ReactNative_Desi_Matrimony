import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useTheme } from '@react-navigation/native';
import { FONT, SCALED_SIZE } from '~src/assets/fonts';
import NavigatorPath from '~src/navigatorPaths';
import { CurrentEvents, PastEvents, UpcomingEvents } from '~src/screens';

const Tab = createMaterialTopTabNavigator();

const EventsStack = () => {
    const { colors } = useTheme();
    return (
        <Tab.Navigator
            initialRouteName={NavigatorPath.CurrentEvents}
            screenOptions={{
                headerShown: false,
                headerStyle: {
                    backgroundColor: 'transparent',
                },
                tabBarStyle: {
                    backgroundColor: colors.buttonLinerGradient[0]
                },
                tabBarAllowFontScaling: true,
                tabBarIndicatorStyle: {
                    backgroundColor: colors.headingWhite
                },
                tabBarLabelStyle: {
                    fontFamily: FONT.BOLD,
                    fontSize: SCALED_SIZE.s14
                },
                tabBarActiveTintColor:colors.headingWhite
            }}

        >
            <Tab.Screen
                name={NavigatorPath.CurrentEvents}
                component={CurrentEvents}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Current\nEvents',
                }}
            />
            <Tab.Screen
                name={NavigatorPath.UpcomingEvents}
                component={UpcomingEvents}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Upcoming\nEvents',
                }}
            />
            <Tab.Screen
                name={NavigatorPath.PastEvents}
                component={PastEvents}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Past\nEvents',
                }}
            />
        </Tab.Navigator>
    );
};

export default EventsStack;
