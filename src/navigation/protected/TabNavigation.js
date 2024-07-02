/* eslint-disable react/no-unstable-nested-components */
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@react-navigation/native';
import { SCALED_SIZE } from '~src/assets/fonts';
import { IconHome, IconExplore, IconEvents, IconChats } from '~src/assets/svg';
import { RoundedImageView } from '~src/components';
import NavigatorPath from '~src/navigatorPaths';
import { selectApp } from '~src/redux/Auth/authSelectors';
import { navigationActions } from '../navigationActions';
import ChatsStack from './ChatsStack';
import EventsStack from './EventsStack';
import ExploreStack from './ExploreStack';
import HomeStack from './HomeStack';
import SettingsStack from './SettingsStack';

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
    const { colors } = useTheme();
    const { currentUser } = useSelector(selectApp);
    
    const profileTabPressed = useCallback(() => { 
        navigationActions.navigate(NavigatorPath.SettingsStack);
    }, []);

    return (
        <Tab.Navigator
            screenOptions={() => ({
                tabBarActiveTintColor: colors.buttonLinerGradient[0],
                tabBarInactiveTintColor: colors.inactive,
                tabBarStyle: {
                    backgroundColor: colors.background,
                },
                headerShown: false,
            })}>
            <Tab.Screen
                name={NavigatorPath.HomeStack}
                component={HomeStack}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => 
                        <IconHome
                            width={SCALED_SIZE.s20}
                            height={SCALED_SIZE.s20}
                            fill={color}
                        />
                }}
            />
            <Tab.Screen
                name={NavigatorPath.EventsStack}
                component={EventsStack}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Events',
                    tabBarIcon: ({ color }) => 
                        <IconEvents
                            width={SCALED_SIZE.s20}
                            height={SCALED_SIZE.s20}
                            fill={color}
                        />
                }}
            />
            <Tab.Screen
                name={NavigatorPath.ExploreStack}
                component={ExploreStack}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Explore',
                    tabBarIcon: ({ color }) => 
                        <IconExplore
                            width={SCALED_SIZE.s20}
                            height={SCALED_SIZE.s20}
                            fill={color} 
                        />
                }}
            />
            <Tab.Screen
                name={NavigatorPath.ChatsStack}
                component={ChatsStack}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Chats',
                    tabBarIcon: ({ color }) => 
                        <IconChats
                            width={SCALED_SIZE.s20}
                            height={SCALED_SIZE.s20}
                            fill={color}
                        />
                }}
            />

            <Tab.Screen
                name={NavigatorPath.SettingsStack}
                component={SettingsStack}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color }) => 
                        <RoundedImageView
                            onPress={profileTabPressed}
                            imageUri={currentUser?.avatar || null}
                            nameFontSize={SCALED_SIZE.s13}
                            nameInitials={currentUser?.first_name}
                            nameTextColor={color}
                            bgColor="transparent"
                            borderColor={color}
                            size={SCALED_SIZE.s26} 
                        />
                }}
            />
        </Tab.Navigator>
    );
};

export default BottomTabNavigation;
