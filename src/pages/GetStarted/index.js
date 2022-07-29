import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Animated,
  Dimensions,
  ImageBackground,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { MyButton, MyGap } from '../../components';
import { colors } from '../../utils/colors';
import { color } from 'react-native-reanimated';
import { fonts } from '../../utils/fonts';
import LottieView from 'lottie-react-native';
import FastImage from 'react-native-fast-image';

export default function GetStarted({ navigation }) {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const bottom = new Animated.Value(windowWidth);
  const opacity = new Animated.Value(0);
  const top = new Animated.Value(0);

  Animated.timing(bottom, {
    toValue: 100,
    duration: 1200,
    useNativeDriver: false,
  }).start();

  Animated.timing(opacity, {
    toValue: 1,
    duration: 1000,
    useNativeDriver: false,
  }).start();

  Animated.timing(top, {
    toValue: 50,
    duration: 1000,
    useNativeDriver: false,
  }).start();

  return (
    <ImageBackground
      source={require('../../assets/splash.png')}
      style={styles.page}>

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>

        <Image
          source={require('../../assets/logo.png')}
          style={{
            resizeMode: 'contain',
            height: 120,
          }}
        />
        <Text style={{
          fontFamily: fonts.primary.normal,
          color: colors.white,
          fontSize: windowWidth / 12,
          marginVertical: 10,
        }}>CHANYA DIO</Text>


      </View>

      <MyButton
        title="LOGIN"
        Icons="log-in-outline"
        warna={colors.white}
        colorText={colors.primary}
        iconColor={colors.primary}
        onPress={() => navigation.navigate('Login')}
      />

      <MyGap jarak={20} />

      <MyButton
        title="REGISTER"

        borderSize={1}
        borderColor={colors.white}
        iconColor={colors.white}
        colorText={colors.white}
        Icons="create-outline"

        onPress={() => navigation.navigate('Register')}
      />

      <Animated.View style={{ height: top }} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.primary,
  },
  title: {
    marginTop: 50,
    fontFamily: fonts.secondary[800],
    fontSize: 50,
    color: colors.primary,
  },
});
