import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  Image,
  Animated,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { color, asin } from 'react-native-reanimated';
import { getData, storeData } from '../../utils/localStorage';
import { PermissionsAndroid } from 'react-native';
import LottieView from 'lottie-react-native';
import axios from 'axios';

export default function Splash({ navigation }) {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const scaleLogo = new Animated.Value(0.1);
  const scaleRadius = new Animated.Value(0);

  Animated.timing(scaleLogo, {
    toValue: 120,
    duration: 1000,
  }).start();

  Animated.timing(scaleRadius, {
    toValue: 100,
    duration: 1000,
  }).start();


  useEffect(() => {

    const unsubscribe = getData('user').then(res => {
      // console.log(res);
      if (!res) {
        // console.log('beum login');

        setTimeout(() => {
          navigation.replace('GetStarted');
        }, 1500);
      } else {
        console.log('sudah login logon');

        setTimeout(() => {
          navigation.replace('MainApp');
        }, 1500);
      }
    });
  }, []);

  return (
    <SafeAreaView style={styles.page}>
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
      />
      <ImageBackground
        source={require('../../assets/splash.png')}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>

        <Animated.Image
          source={require('../../assets/logo.png')}
          style={{
            width: '100%',
            resizeMode: 'contain',
            height: scaleLogo,
            // aspectRatio: scaleLogo,
          }}
        />
        <Text style={{
          fontFamily: fonts.primary.normal,
          color: colors.white,
          fontSize: windowWidth / 12,
          marginVertical: 10,
        }}>CHANYA DIO</Text>
        <ActivityIndicator size="large" color={colors.white} />
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.primary,
    flex: 1,
  },
  image: {
    aspectRatio: 1,
    width: 250,
    height: 250,
  },
});
