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
import { windowWidth, fonts, windowHeight } from '../../utils/fonts';

export default function Brand({ route }) {
  const item = route.params;
  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.white,
    }}>

      <View style={{
        flex: 1,
      }}>
        <View style={{
          padding: 20,
        }}>
          <Image style={{
            width: '100%',
            height: 200,
            borderRadius: 20,

          }} source={{
            uri: item.link
          }} />
        </View>
        <View style={{
          backgroundColor: colors.secondary,
          borderRadius: 20,
        }}>

        </View>
        <View style={{
          padding: 10,
          backgroundColor: colors.warning,
          margin: 10,
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
        }}>
          <View style={{
            marginTop: -30,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.tertiary,
            width: '85%',
            borderRadius: 10,
            padding: 5,
            alignSelf: 'center'
          }}>
            <Text style={{
              color: colors.white,
              fontFamily: fonts.primary.normal,
              fontSize: windowWidth / 15,
              textAlign: 'center'
            }}>{item.judul}</Text>
          </View>
          <Text style={{
            marginTop: 20,
            color: colors.tertiary,
            fontFamily: fonts.secondary[400],
            fontSize: windowWidth / 25,
            textAlign: 'center'
          }}>{item.periode}</Text>
          <View style={{
            backgroundColor: colors.white,
            marginTop: 20,
            marginHorizontal: 10,
            padding: 20,
          }}>
            <Text style={{

              color: colors.black,
              textAlign: 'justify',
              fontFamily: fonts.primary.normal,
              fontSize: windowWidth / 25,
            }}>{item.desc}</Text>
          </View>
        </View>
      </View>
      <Text style={{
        margin: 10,
        fontFamily: fonts.primary.normal,
        textAlign: 'center',
        color: colors.warning
      }}>Chanya Dio Parfum</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})