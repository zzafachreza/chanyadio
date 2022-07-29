import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  Alert,
  FlatList,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { colors } from '../../utils/colors';
import { fonts, windowWidth } from '../../utils/fonts';
import 'intl';
import 'intl/locale-data/jsonp/en';
import { urlAPI } from '../../utils/localStorage';


export default function Hadiah({ navigation, route }) {

  const user = route.params;

  useEffect(() => {
    axios.get(urlAPI + '1_get_hadiah.php').then(res => {
      console.log(res.data);
      setData(res.data);
      // setData(res.data.data);
    });
  }, []);

  const [data, setData] = useState([]);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          if (user.point < item.nilai) {
            Alert.alert("Redeem Point", "Maaf point Adna tidak cukup !")
          } else {
            Alert.alert(
              "Redeem Point",
              "Apakah Anda akan menukar point dengan " + item.judul + ' ?',
              [

                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                },
                {
                  text: "OK", onPress: () => {

                    axios.post(urlAPI + '1_add_redeem.php', {
                      fid_user: user.id,
                      fid_hadiah: item.id,
                      point: item.nilai

                    }).then(res => {
                      console.log(res.data);
                      Alert.alert("Selamat Redeem Berhasil !", "Terima kasih sudah melakukan redeem point");
                      navigation.replace('MainApp')

                    })

                  }
                }
              ]
            );
          }
        }}
        activeOpacity={1.0}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
          }}>



        </View>
        <Image style={styles.image} source={{ uri: item.link }} />

        <View style={styles.detailsContainer}>
          <View
            style={{
              flex: 1,
            }}>
            <Text style={styles.title}>{item.judul}</Text>
          </View>
        </View>
        <Text
          style={{
            fontFamily: fonts.secondary[600],
            fontSize: windowWidth / 27,
            padding: 3,
            backgroundColor: colors.tertiary,
            borderBottomLeftRadius: 10,
            paddingHorizontal: 20,
            textAlign: 'center',
            color: colors.primary,
          }}>
          {item.nilai} Point
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{
        margin: 10,
        backgroundColor: colors.white,
        padding: 10,
        borderRadius: 10,
        elevation: 3,

      }}>
        <Text style={{
          fontFamily: fonts.secondary[600],
          fontSize: windowWidth / 30,
          marginBottom: 10,
        }}>My Poin</Text>

        <View style={{
          flexDirection: 'row'
        }}>

          <View>
            <Image source={{
              uri: user.foto_user
            }} style={{
              width: 50, height: 50,
              borderRadius: 25,
            }} />
          </View>
          <View style={{
            flex: 1,
            justifyContent: 'center',
            paddingLeft: 10,
          }}>
            <Text style={{
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 27,
            }}>{user.nama_lengkap}</Text>
          </View>
          <View style={{
            borderRightWidth: 2,
            borderRightColor: colors.primary,
            marginHorizontal: 5,

          }} />
          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            flexDirection: 'row'
          }}>
            <Image source={require('../../assets/coin.png')} style={{
              width: 20,
              resizeMode: 'contain',
            }} />
            <Text style={{
              left: 10,
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 26,
            }}>{new Intl.NumberFormat().format(user.point)}</Text>
          </View>
        </View>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
  },
  card: {
    shadowColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: -10,
      height: 2,
    },
    shadowOpacity: 0.44,
    shadowRadius: 5.32,

    elevation: 5,

    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginBottom: 20,
    flex: 1,
    marginHorizontal: 5,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  detailsContainer: {
    padding: 10,
    flex: 1,
  },
  detailsContainerButton: {
    paddingHorizontal: 5,
  },
  title: {
    fontFamily: fonts.secondary[400],
    marginBottom: 7,
    fontSize: windowWidth / 27,
    color: colors.black,
  },
  subTitle: {
    // flex: 1,
    // backgroundColor: 'red',
    fontFamily: fonts.secondary[600],
    fontSize: 14,
    color: '#000',
    marginBottom: 5,
  },
});
