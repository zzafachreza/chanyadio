import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Modal, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MyPicker, MyGap, MyInput, MyButton } from '../../components';
import DateTimePicker from '@react-native-community/datetimepicker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { colors } from '../../utils/colors';
import { fonts, windowHeight, windowWidth } from '../../utils/fonts';
import { Image } from 'react-native';
import { getData, urlAPI } from '../../utils/localStorage';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import 'intl';
import 'intl/locale-data/jsonp/en';
import { Icon } from 'react-native-elements';
import { showMessage } from 'react-native-flash-message';

export default function ({ navigation, route }) {

    const user = route.params;
    const [data, setData] = useState([]);
    const [kirim, setKirim] = useState({
        email: ''
    });

    const [loading, setLoading] = useState(false);
    const __sendServer = () => {
        setLoading(true);

        setTimeout(() => {
            axios.post(urlAPI + '/lupa.php', kirim).then(res => {
                console.log(res.data);
                setLoading(false);
                showMessage({
                    type: 'success',
                    message: 'Sent Successfully !'
                });
                // navigation.replace('MainApp');
            })
        }, 1200)
    }

    useEffect(() => {
        axios.get(urlAPI + '/1get_component.php').then(res => {
            console.log(res.data);
            setData(res.data);
        })
    }, [])

    return (
        <SafeAreaView style={{
            flex: 1,
            padding: 10,
            backgroundColor: colors.primary,
        }}>

            <View style={{
                justifyContent: 'center',
                alignItems: 'center'
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
            <View>
                <MyInput value={kirim.email} onChangeText={x => {
                    setKirim({
                        ...kirim,
                        email: x
                    })
                }} autoFocus label="Masukan Email" iconname="mail" placeholder="masukan email anda" />
                <MyGap jarak={10} />
                {!loading && <MyButton onPress={__sendServer} title="Reset Password" iconColor={colors.primary} colorText={colors.primary} Icons="cloud-upload-outline" warna={colors.white} />}
                {loading && <ActivityIndicator color={colors.white} size="large" />}
            </View>

        </SafeAreaView >
    )
}

const styles = StyleSheet.create({})