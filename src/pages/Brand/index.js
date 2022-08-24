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
          padding: 35,
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
          backgroundColor: colors.kotakDesc,
          // margin: 10,
          paddingBottom: 50,
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
        }}>
          <View style={{
            marginTop: -30,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.kotakJudul,
            width: '85%',
            borderRadius: 10,
            padding: 5,
            alignSelf: 'center'
          }}>
            <Text style={{
              color: colors.white,
              fontFamily: fonts.primary.demi,
              fontSize: windowWidth / 15,
              textAlign: 'center'
            }}>{item.judul}</Text>
          </View>
          <Text style={{
            marginTop: 20,
            color: colors.kotakJudul,
            fontFamily: fonts.primary.demi,
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

              color: colors.kotakText,
              textAlign: 'justify',
              fontFamily: fonts.primary[300],
              fontSize: windowWidth / 20,
            }}>{item.desc}</Text>
          </View>
        </View>
      </View>
      <Text style={{
        margin: 10,
        fontFamily: fonts.primary.demi,
        textAlign: 'center',
        fontSize: windowWidth / 25,
        marginBottom: 20,
        color: '#FFB8A6'
      }}>Chanya Dio Parfum</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})