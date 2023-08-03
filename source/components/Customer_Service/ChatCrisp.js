import React from 'react';
import {WebView} from 'react-native-webview';

const ChatCrips = ({route}) => {
  return <WebView source={{uri: route?.params?.uri}} />;
};

export default ChatCrips;
