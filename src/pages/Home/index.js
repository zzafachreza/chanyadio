import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Dimensions,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StatusBar,
} from 'react-native';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { storeData, getData, urlAPI } from '../../utils/localStorage';
import { Icon } from 'react-native-elements';
import MyCarouser from '../../components/MyCarouser';
import axios from 'axios';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import 'intl';
import 'intl/locale-data/jsonp/en';
import LottieView from 'lottie-react-native';
import { useIsFocused } from '@react-navigation/native';
import { Modalize } from 'react-native-modalize';
import QRCode from 'react-native-qrcode-svg';

export default function Home({ navigation }) {
  const [user, setUser] = useState({});
  const [promo, setPromo] = useState([]);
  const [cart, setCart] = useState(0);
  const [token, setToken] = useState('');

  const isFocused = useIsFocused();


  const modalizeRef = useRef();

  const onOpen = () => {
    modalizeRef.current?.open();
  };


  useEffect(() => {

    const unsubscribe = messaging().onMessage(async remoteMessage => {

      const json = JSON.stringify(remoteMessage);
      const obj = JSON.parse(json);

      // console.log(obj);

      // alert(obj.notification.title)

      __getDataUserInfo();

      PushNotification.localNotification({
        /* Android Only Properties */
        channelId: 'chanyadio', // (required) channelId, if the channel doesn't exist, notification will not trigger.
        title: obj.notification.title, // (optional)
        message: obj.notification.body, // (required)
      });
    });

    // getDataKategori();

    if (isFocused) {
      __getDataUserInfo();
    }
    return unsubscribe;
  }, [isFocused]);


  // const getDataKategori = () => {
  //   axios.post(urlAPI + '/1data_kategori.php').then(res => {
  //     console.log('kategori', res.data);

  //     setKategori(res.data);
  //   })
  // }
  const [point, setPoint] = useState(0);

  const __getDataUserInfo = () => {

    axios.post(urlAPI + '1_get_promo.php').then(p => {
      setPromo(p.data);
      console.log('promo get', p.data);
    })

    getData('user').then(users => {
      // console.log(users);
      setUser(users);

      if (users.tipe == "KASIR") {
        navigation.replace('Akses')
      }

      axios.post(urlAPI + '1_get_point.php', {
        fid_user: users.id
      }).then(rx => {
        console.warn(rx.data);
        setPoint(rx.data);
        setUser({
          ...users,
          point: rx.data
        })
      })

      getData('token').then(res => {
        console.log('data token,', res);
        setToken(res.token);
        axios
          .post(urlAPI + 'update_token.php', {
            id: users.id,
            token: res.token,
          })
          .then(res => {
            console.error('update token', res.data);

          });
      });
    });
  }

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const ratio = 192 / 108;


  const __renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('Brand', item)} style={{
        flex: 1,
        overflow: 'hidden',
        marginVertical: 10,
        marginHorizontal: 10,
      }}>

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
          paddingVertical: 10,
        }}>
          <Text style={{
            color: colors.black,
            textAlign: 'center',
            fontFamily: fonts.primary.normal,
            fontSize: windowWidth / 20,
          }}>{item.judul}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}>
      <ScrollView>
        <View
          style={{
            marginBottom: 10,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            elevation: 3,
            padding: 10,
            backgroundColor: colors.primary,
          }}>

          <View style={{
            flexDirection: 'row',
            padding: 10,
          }}>
            <View style={{
              flex: 1
            }}>
              <Text style={{
                fontFamily: fonts.secondary[400],
                fontSize: windowWidth / 25,
                color: colors.white
              }}>Selamat datang !</Text>
              <Text style={{
                fontFamily: fonts.primary.normal,
                fontSize: windowWidth / 20,
                color: colors.white
              }}>{user.nama_lengkap}</Text>
            </View>
            <View style={{
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Image source={require('../../assets/logo.png')} style={{
                width: 40,
                height: 40
              }} />
              <Text style={{
                fontFamily: fonts.primary.normal,
                fontSize: windowWidth / 30,
                color: colors.white
              }}>Chanya Dio</Text>
            </View>
          </View>

          {/* user */}

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
            }}>Pointku</Text>

            <View style={{
              flexDirection: 'row'
            }}>
              <View style={{
                flex: 1,
                alignItems: 'center',
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
                }}>{new Intl.NumberFormat().format(point)}</Text>
              </View>
              <View style={{
                borderRightWidth: 2,
                borderRightColor: colors.primary,
                marginHorizontal: 5,

              }} />

              <TouchableOpacity onPress={() => navigation.navigate('Laporan', user)} style={{
                flex: 1,
                paddingVertical: 10,
                borderRadius: 10,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Image source={require('../../assets/riwayat.png')} style={{
                  width: 17,
                  height: 17,
                }} />
                <Text style={{
                  color: colors.black,
                  fontFamily: fonts.secondary[600],
                  fontSize: windowWidth / 26,
                  left: 10,
                }}>Riwayat</Text>
              </TouchableOpacity>


            </View>
          </View>


        </View>





        <View style={{
          flexDirection: 'row',
          paddingHorizontal: 10,
          justifyContent: 'space-around',
          alignItems: 'center'
        }}>
          <View style={{
            flex: 1,
            marginRight: 5,
          }}>
            <TouchableOpacity onPress={onOpen} style={{
              padding: 20,
              backgroundColor: colors.primary,
              borderRadius: 10,
              elevation: 3,
            }}>
              <Icon size={windowWidth / 8} type='ionicon' name="qr-code-outline" color={colors.white} />

            </TouchableOpacity>
            <Text style={{
              marginTop: 10,
              textAlign: 'center',
              color: colors.primary,
              fontFamily: fonts.primary.normal,
              fontSize: windowWidth / 20,
            }}>Kode QR</Text>
          </View>

          <View style={{
            flex: 1,
            marginLeft: 5,
          }}>
            <TouchableOpacity onPress={() => navigation.navigate('Hadiah', user)} style={{
              padding: 20,
              backgroundColor: colors.primary,
              borderRadius: 10,
              elevation: 3,
            }}>
              <Icon size={windowWidth / 8} type='ionicon' name="gift-outline" color={colors.white} />

            </TouchableOpacity>
            <Text style={{
              marginTop: 10,
              textAlign: 'center',
              color: colors.primary,
              fontFamily: fonts.primary.normal,
              fontSize: windowWidth / 20,
            }}>Penukaran</Text>
          </View>


        </View>

        <View style={{
          padding: 10,
          marginTop: 0,
          flexDirection: 'row'
        }}>
          <Text style={{
            color: colors.primary,
            fontFamily: fonts.secondary[600],
            fontSize: windowWidth / 25,
          }}>News</Text>
          <View style={{
            flex: 1,
            paddingTop: 11,
          }}>
            <View style={{
              borderTopColor: colors.tertiary,
              marginHorizontal: 10,
              borderTopWidth: 1,
            }} />
          </View>
        </View>

        <FlatList showsVerticalScrollIndicator={false} data={promo} renderItem={__renderItem} />

      </ScrollView>
      <Modalize
        withHandle={false}
        scrollViewProps={{ showsVerticalScrollIndicator: false }}
        snapPoint={windowHeight / 1.8}
        HeaderComponent={
          <View style={{ padding: 10, flexDirection: 'column' }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text
                  style={{
                    fontFamily: fonts.primary.normal,
                    fontSize: windowWidth / 20,
                    color: colors.black,
                  }}>
                  QR Code
                </Text>
                <Text
                  style={{
                    fontFamily: fonts.primary[400],
                    fontSize: windowWidth / 30,
                    color: colors.black,
                  }}>
                  Tunjukan barcode ini ke kasir untuk mendapatkan point
                </Text>
              </View>
              <TouchableOpacity onPress={() => modalizeRef.current.close()}>
                <Icon type="ionicon" name="close-outline" size={35} />
              </TouchableOpacity>
            </View>
          </View>
        }

        ref={modalizeRef} >
        <View style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>


          <QRCode
            size={300}
            logoSize={50}
            logo={require('../../assets/qr.png')}
            value={user.barcode}

          />
        </View>
      </Modalize >
    </SafeAreaView >
  );
}
