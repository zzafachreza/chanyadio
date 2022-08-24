
import React, { useState } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  View
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { Icon } from 'react-native-elements'
import axios from 'axios';
import { colors } from '../../utils/colors';
import { fonts, windowWidth } from '../../utils/fonts';
import { storeData, urlAPI } from '../../utils/localStorage';
export default function Akses({ navigation }) {

  const [lampu, setLampu] = useState(false);
  const [barcode, setBarcode] = useState('');

  const onSuccess = e => {
    console.log(e.data);
    setBarcode(e.data);
    axios.post(urlAPI + '1_get_member.php', {
      key: e.data
    }).then(res => {
      console.log(res.data);
      navigation.navigate('Tambah', res.data)
    })
  };




  return (
    <QRCodeScanner
      onRead={onSuccess}
      type={RNCamera.Constants.Type.back}
      autoFocus={RNCamera.Constants.AutoFocus.on}
      flashMode={lampu ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}
      topContent={
        <View style={{
        }}>

          <Text style={styles.centerText}>
            Silahkan scan barcode Member
          </Text>


        </View>
      }
      bottomContent={

        <>
          {!lampu && <TouchableOpacity onPress={() => setLampu(true)} style={{
            backgroundColor: colors.primary,
            padding: 20,
            borderRadius: 10,
          }}>
            <Icon type='ionicon' name='flash-off' color={colors.white} />
          </TouchableOpacity>}

          {lampu && <TouchableOpacity onPress={() => setLampu(false)} style={{
            backgroundColor: colors.primary,
            padding: 20,
            borderRadius: 10,
          }}>
            <Icon type='ionicon' name='flash' color={colors.white} />
          </TouchableOpacity>}

          <TouchableOpacity onPress={() => {
            storeData('user', null);
            navigation.replace('GetStarted');
          }} style={{

            backgroundColor: colors.tertiary,
            paddingHorizontal: 100,
            paddingVertical: 20,
            borderRadius: 10,
            marginTop: 10,

          }}>
            <Text style={{
              fontFamily: fonts.primary.demi,
              fontSize: windowWidth / 26,
              color: colors.white
            }}>Keluar</Text>
          </TouchableOpacity>

        </>

      }
    />
  )
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  }
});