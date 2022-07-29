import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  SafeAreaView,
  RefreshControl,
  Image,
  TouchableOpacity,
  TextInput,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { storeData, getData, urlAPI } from '../../utils/localStorage';
import axios from 'axios';
import { colors } from '../../utils/colors';
import { windowWidth, fonts } from '../../utils/fonts';

export default function Brand({ route }) {
  const item = route.params;
  return (
    <SafeAreaView>
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
      />
      <Image style={{
        width: '100%',
        height: 250,

      }} source={{
        uri: item.link
      }} />
      <View style={{
        backgroundColor: colors.secondary,
        borderRadius: 20,
      }}>

      </View>
      <View style={{
        padding: 10,
      }}>
        <Text style={{
          color: colors.secondary,
          fontFamily: fonts.primary.normal,
          fontSize: windowWidth / 15,
        }}>{item.judul}</Text>
        <Text style={{
          color: colors.secondary,
          fontFamily: fonts.secondary[400],
          fontSize: windowWidth / 25,
        }}>{item.periode}</Text>
        <Text style={{
          marginTop: 20,
          color: colors.black,
          fontFamily: fonts.secondary[400],
          fontSize: windowWidth / 25,
        }}>{item.desc}</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})