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
      <TouchableOpacity style={{
        flex: 1,
        marginVertical: 10,
        marginHorizontal: 10,
        borderRadius: 10,
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
        <Text style={{
          textAlign: 'right',
          color: colors.secondary,
          fontFamily: fonts.secondary[600],
          fontSize: windowWidth / 25,
        }}>{item.judul}</Text>
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
                fontSize: windowWidth / 20,
                color: colors.white
              }}>Selamat datang !</Text>
              <Text style={{
                fontFamily: fonts.secondary[600],
                fontSize: windowWidth / 12,
                color: colors.white
              }}>Chanya Dio</Text>
            </View>
            <View style={{
            }}>
              <Image source={require('../../assets/logo.png')} style={{
                width: 70,
                height: 70
              }} />
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
                }}>{new Intl.NumberFormat().format(point)}</Text>
              </View>
            </View>
          </View>


        </View>





        <View style={{
          flexDirection: 'row',
          paddingHorizontal: 10,
          justifyContent: 'space-around',
          marginRight: 10,
          alignItems: 'center'
        }}>
          <View>
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
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 25,
            }}>QR Code</Text>
          </View>

          <View>
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
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 25,
            }}>Redeem</Text>
          </View>

          <View>
            <TouchableOpacity onPress={() => navigation.navigate('Laporan', user)} style={{
              padding: 20,
              backgroundColor: colors.primary,
              borderRadius: 10,
              elevation: 3,
            }}>
              <Icon size={windowWidth / 8} type='ionicon' name="file-tray-full-outline" color={colors.white} />

            </TouchableOpacity>
            <Text style={{
              marginTop: 10,
              textAlign: 'center',
              color: colors.primary,
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 25,
            }}>History</Text>
          </View>
        </View>

        <View style={{
          padding: 10,
          marginTop: 10,
          flexDirection: 'row'
        }}>
          <Text style={{
            color: colors.primary,
            fontFamily: fonts.secondary[600],
            fontSize: windowWidth / 25,
          }}>News</Text>
          <View style={{
            flex: 1,
            paddingTop: 10,
          }}>
            <View style={{
              marginHorizontal: 10,
              borderTopWidth: 1,
            }} />
          </View>
        </View>

        <FlatList data={promo} renderItem={__renderItem} />

      </ScrollView>
      <Modalize
        withHandle={false}
        scrollViewProps={{ showsVerticalScrollIndicator: false }}
        snapPoint={windowHeight / 1.5}
        HeaderComponent={
          <View style={{ padding: 10 }}>
            <View style={{ flexDirection: 'row' }}>

              <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text
                  style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: windowWidth / 20,
                    color: colors.black,
                  }}>
                  QR Code
                </Text>
                <Text
                  style={{
                    fontFamily: fonts.secondary[400],
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
