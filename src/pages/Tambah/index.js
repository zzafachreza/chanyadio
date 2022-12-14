import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Linking,
  ScrollView,
  Alert,
  ActivityIndicator
} from 'react-native';
import { windowWidth, fonts } from '../../utils/fonts';
import { getData, storeData, urlAPI } from '../../utils/localStorage';
import { colors } from '../../utils/colors';
import { MyButton, MyGap, MyInput } from '../../components';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import CurrencyInput from 'react-native-currency-input';


export default function Tambah({ navigation, route }) {
  const [user, setUser] = useState(route.params);
  const [loading, setLoading] = useState(false);

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.primary
    }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: 10 }}>
          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Image source={{
              uri: user.foto_user,
            }} style={{ width: 80, height: 80, borderRadius: 10, }} />
          </View>

          {/* data detail */}
          <View style={{ padding: 10 }}>

            <MyGap jarak={10} />
            <View>
              <View
                style={{
                  marginVertical: 3,
                  padding: 10,
                  backgroundColor: colors.white,
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    fontFamily: fonts.secondary[600],
                    color: colors.black,
                  }}>
                  Nama Pribadi
                </Text>
                <Text
                  style={{
                    fontFamily: fonts.secondary[400],
                    color: colors.primary,
                  }}>
                  {user.nama_lengkap}
                </Text>
              </View>


              <View
                style={{
                  marginVertical: 3,
                  padding: 10,
                  backgroundColor: colors.white,
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    fontFamily: fonts.secondary[600],
                    color: colors.black,
                  }}>
                  E-mail
                </Text>
                <Text
                  style={{
                    fontFamily: fonts.secondary[400],
                    color: colors.primary,
                  }}>
                  {user.email}
                </Text>
              </View>
              <View
                style={{
                  marginVertical: 3,
                  padding: 10,
                  backgroundColor: colors.white,
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    fontFamily: fonts.secondary[600],
                    color: colors.black,
                  }}>
                  Telepon / Whatsapp
                </Text>
                <Text
                  style={{
                    fontFamily: fonts.secondary[400],
                    color: colors.primary,
                  }}>
                  {user.telepon}
                </Text>
              </View>

              <MyGap jarak={10} />


              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 5,
                }}>
                <Icon type="ionicon" name="apps-outline" color={colors.white} size={16} />
                <Text
                  style={{
                    fontFamily: fonts.secondary[600],
                    color: colors.white,
                    left: 10,
                    fontSize: 12,
                  }}>
                  Nominal
                </Text>
              </View>
              <CurrencyInput delimiter=',' precision={0} style={{
                backgroundColor: colors.secondary,
                borderColor: colors.primary,
                borderRadius: 10,
                borderWidth: 1,
                paddingLeft: 10,
                color: colors.white,
                fontSize: 12,
                fontFamily: fonts.primary[400],
              }} value={user.nominal} onChangeValue={x => {
                setUser({
                  ...user,
                  nominal: x
                })
              }} />






            </View>
          </View>

          {/* button */}
          <View style={{ padding: 10 }}>
            {!loading && <MyButton
              onPress={() => {

                setLoading(true);

                axios.post(urlAPI + '1_add_reward.php', user).then(res => {
                  console.log(res.data);
                  Alert.alert("Transaksi Reward Point Berhasil !", "Terima kasih")
                  navigation.replace('Akses');
                })



              }}
              title="Simpan Transaksi"
              colorText={colors.white}
              iconColor={colors.white}
              warna={colors.tertiary}
              Icons="create-outline"
            />}

            {loading && <ActivityIndicator size="large" color={colors.white} />}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
