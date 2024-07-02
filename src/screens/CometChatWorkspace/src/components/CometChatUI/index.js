import React, { useEffect, useRef, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CometChatGroupListWithMessages } from '../Groups';
import { CometChatUserListWithMessages } from '../Users';
import { CometChatConversationListWithMessages } from '../Chats';
import { CometChatContextProvider } from '../../utils/CometChatContext';
import { CometChatUserProfile } from '../UserProfile';

const Tab = createBottomTabNavigator();

function CometChatUI() {
  const [tabs, setTabs] = useState(null);
  const contextRef = useRef(null);

  useEffect(() => {
    checkRestrictions();
  }, []);
  const checkRestrictions = async () => {
    let isChatEnabled = await contextRef.current.state.FeatureRestriction.isRecentChatListEnabled();
    let isGroupListEnabled = await contextRef.current.state.FeatureRestriction.isGroupListEnabled();
    let isUserSettingsEnabled = await contextRef.current.state.FeatureRestriction.isUserSettingsEnabled();
    let isUserListEnabled = await contextRef.current.state.FeatureRestriction.isUserListEnabled();
    let isCallListEnabled = await contextRef.current.state.FeatureRestriction.isCallListEnabled();
    setTabs({
      isChatEnabled,
      isGroupListEnabled,
      isUserSettingsEnabled,
      isUserListEnabled,
      isCallListEnabled,
    });
  };
  return (
    <CometChatContextProvider ref={contextRef}>
      {tabs ? (
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            headerStyle: {
              backgroundColor: 'transparent',
            },
          }}
          initialRouteName="Chats"
          tabBar={() => <></>}
        >
          {tabs.isChatEnabled && (
            <Tab.Screen
              name="Chats"
              component={CometChatConversationListWithMessages}
            />
          )}
          {tabs.isUserListEnabled && (
            <Tab.Screen
              name="Users"
              component={CometChatUserListWithMessages}
            />
          )}
          {tabs.isGroupListEnabled && (
            <Tab.Screen
              name="Groups"
              component={CometChatGroupListWithMessages}
            />
          )}
          {tabs.isUserSettingsEnabled && (
            <Tab.Screen name="More" component={CometChatUserProfile} />
          )}
        </Tab.Navigator>
      ) : null}
    </CometChatContextProvider>
  );
}

export default CometChatUI;
