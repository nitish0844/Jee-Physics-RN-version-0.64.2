// import React, {useState} from 'react';
// import {
//   View,
//   StyleSheet,
//   TouchableOpacity,
//   PanResponder,
//   Dimensions,
// } from 'react-native';
// import AntDesign from 'react-native-vector-icons/AntDesign';

// const screenWidth = Dimensions.get('window').width;
// const screenHeight = Dimensions.get('window').height;

// const FloatingButton = () => {
//   const buttonSize = 60;
//   const bottomTabsHeight = 60;

//   const initialX = screenWidth - buttonSize - 16; // 16 is a margin from the right edge
//   const initialY = screenHeight - bottomTabsHeight - buttonSize - 16; // 16 is a margin from the bottom edge

//   const [buttonPosition, setButtonPosition] = useState({
//     x: initialX,
//     y: initialY,
//   });
//   const [moving, setMoving] = useState(false);

//   const getTargetCorner = (x, y) => {
//     const screenHalfWidth = screenWidth / 2;
//     if (x <= screenHalfWidth) {
//       // Left half
//       return {x: 0, y};
//     } else {
//       // Right half
//       return {x: screenWidth - buttonSize, y};
//     }
//   };

//   const panResponder = PanResponder.create({
//     onStartShouldSetPanResponder: () => true,
//     onMoveShouldSetPanResponder: () => true,
//     onPanResponderGrant: (event, gestureState) => {
//       const {pageX, pageY} = event.nativeEvent;
//       const touchWithinButton =
//         pageX >= buttonPosition.x &&
//         pageX <= buttonPosition.x + buttonSize &&
//         pageY >= buttonPosition.y &&
//         pageY <= buttonPosition.y + buttonSize;
//       setMoving(touchWithinButton);
//     },
//     onPanResponderMove: (event, gestureState) => {
//       if (!moving) return;

//       // Calculate the new position of the button
//       const newX = Math.max(
//         0,
//         Math.min(gestureState.moveX - buttonSize / 2, screenWidth - buttonSize),
//       );
//       const newY = Math.max(
//         0,
//         Math.min(
//           gestureState.moveY - buttonSize / 2,
//           screenHeight - bottomTabsHeight - buttonSize,
//         ),
//       );
//       setButtonPosition({x: newX, y: newY});
//     },
//     onPanResponderRelease: () => {
//       setMoving(false);
//       const targetCorner = getTargetCorner(buttonPosition.x, buttonPosition.y);
//       setButtonPosition(targetCorner);
//     },
//     onPanResponderTerminate: () => {
//       setMoving(false);
//     },
//   });

//   return (
//     <View style={styles.container}>
//       <View
//         {...panResponder.panHandlers}
//         style={[
//           styles.floatingButton,
//           {top: buttonPosition.y, left: buttonPosition.x},
//         ]}>
//         {/* Your floating button content */}
//         <TouchableOpacity
//           onPress={() => !moving && console.log('Button pressed!')}
//           activeOpacity={1}
//           style={styles.touchable}>
//           <AntDesign
//             name="customerservice"
//             size={30}
//             color={'#000'}
//             style={styles.icon}
//           />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default FloatingButton;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//   },
//   floatingButton: {
//     position: 'absolute',
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: 'blue', // Change this to your desired button color
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#fff',
//   },
//   touchable: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// import React, {useState, useRef, useEffect} from 'react';
// import {
//   View,
//   StyleSheet,
//   TouchableOpacity,
//   PanResponder,
//   Dimensions,
//   Animated,
// } from 'react-native';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import {useNavigation} from '@react-navigation/native';

// const screenWidth = Dimensions.get('window').width;
// const screenHeight = Dimensions.get('window').height;

// const FloatingButton = () => {
//   const navigation = useNavigation();
//   const buttonSize = 60;
//   const bottomTabsHeight = 60;

//   // CrispChat.initialize({websiteId: 'a8fcd120-1b98-4e79-90b7-cc02a26163a1'});

//   const initialX = screenWidth - buttonSize - 16; // 16 is a margin from the right edge
//   const initialY = screenHeight - bottomTabsHeight - buttonSize - 16; // 16 is a margin from the bottom edge

//   const [buttonPosition, setButtonPosition] = useState({
//     x: initialX,
//     y: initialY,
//   });
//   const [moving, setMoving] = useState(false);

//   const position = useRef(
//     new Animated.ValueXY({x: initialX, y: initialY}),
//   ).current;

//   //   const getTargetCorner = (x, y) => {
//   //     const screenHalfWidth = screenWidth / 2;
//   //     if (x <= screenHalfWidth) {
//   //       // Left half
//   //       return {x: 0, y};
//   //     } else {
//   //       // Right half
//   //       return {x: screenWidth - buttonSize, y};
//   //     }
//   //   };

//   const getTargetCorner = (x, y) => {
//     const screenHalfWidth = screenWidth / 2;
//     if (x <= screenHalfWidth) {
//       // Left half
//       return {x: 0, y};
//     } else {
//       // Right half
//       return {x: screenWidth - buttonSize, y};
//     }
//   };

//   const panResponder = PanResponder.create({
//     onStartShouldSetPanResponder: () => true,
//     onMoveShouldSetPanResponder: () => true,
//     onPanResponderGrant: (event, gestureState) => {
//       const {pageX, pageY} = event.nativeEvent;
//       const touchWithinButton =
//         pageX >= buttonPosition.x &&
//         pageX <= buttonPosition.x + buttonSize &&
//         pageY >= buttonPosition.y &&
//         pageY <= buttonPosition.y + buttonSize;
//       setMoving(touchWithinButton);
//     },
//     onPanResponderMove: (event, gestureState) => {
//       if (!moving) return;

//       // Calculate the new position of the button
//       const newX = Math.max(
//         0,
//         Math.min(gestureState.moveX - buttonSize / 2, screenWidth - buttonSize),
//       );
//       const newY = Math.max(
//         0,
//         Math.min(
//           gestureState.moveY - buttonSize / 2,
//           screenHeight - bottomTabsHeight - buttonSize,
//         ),
//       );
//       position.setValue({x: newX, y: newY});
//     },

//     onPanResponderRelease: () => {
//       setMoving(false);
//       const targetCorner = getTargetCorner(buttonPosition.x, buttonPosition.y);
//       Animated.spring(position, {
//         toValue: targetCorner,
//         useNativeDriver: false,
//       }).start();
//     },

//     // onPanResponderRelease: (event, gestureState) => {
//     //   setMoving(false);

//     //   // Use the last known position to calculate the target corner
//     //   const newX = buttonPosition.x + gestureState.dx;
//     //   const newY = buttonPosition.y + gestureState.dy;
//     //   const targetCorner = getTargetCorner(newX, newY);

//     //   Animated.spring(position, {
//     //     toValue: targetCorner,
//     //     useNativeDriver: false,
//     //   }).start(() => {
//     //     // Update the buttonPosition state after the animation is complete
//     //     setButtonPosition(targetCorner);
//     //   });
//     // },
//     onPanResponderTerminate: () => {
//       setMoving(false);
//     },
//   });

//   const onButtonPress = () => {
//     navigation.navigate('ChatCrips', {
//       uri: 'https://go.crisp.chat/chat/embed/?website_id=a8fcd120-1b98-4e79-90b7-cc02a26163a1',
//     });
//   };

//   return (
//     <View style={styles.container}>
//       <Animated.View
//         {...panResponder.panHandlers}
//         style={[styles.floatingButton, {top: position.y, left: position.x}]}>
//         {/* Your floating button content */}
//         <TouchableOpacity
//           onPress={() => !moving && onButtonPress()}
//           activeOpacity={1}
//           style={styles.touchable}>
//           <AntDesign
//             name="customerservice"
//             size={30}
//             color={'#000'}
//             style={styles.icon}
//           />
//         </TouchableOpacity>
//       </Animated.View>
//     </View>
//   );
// };

// export default FloatingButton;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//   },
//   floatingButton: {
//     position: 'absolute',
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: 'blue', // Change this to your desired button color
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#fff',
//   },
//   touchable: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

const FloatingButton = () => {
  const navigation = useNavigation();

  const onButtonPress = () => {
    navigation.navigate('ChatCrips', {
      uri: 'https://go.crisp.chat/chat/embed/?website_id=a8fcd120-1b98-4e79-90b7-cc02a26163a1',
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.floatingButton}>
        {/* Your floating button content */}
        <TouchableOpacity
          onPress={onButtonPress}
          activeOpacity={0.8}
          style={styles.touchable}>
          <AntDesign
            name="customerservice"
            size={30}
            color={'#000'}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FloatingButton;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 16, // Adjust this value to set the vertical position of the button
    right: 16, // Adjust this value to set the horizontal position of the button
  },
  floatingButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'blue', // Change this to your desired button color
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d0eff5',
  },
  touchable: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
