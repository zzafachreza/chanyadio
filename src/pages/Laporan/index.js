import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { fonts, windowWidth } from '../../utils/fonts';
import { colors } from '../../utils/colors';
import axios from 'axios';
import { urlAPI } from '../../utils/localStorage';




export default function Laporan({ route }) {

    const [data, setData] = useState([]);

    useEffect(() => {
        getDataRedeem();

    }, [])

    const getDataRedeem = () => {
        axios.post(urlAPI + '1_get_redeem.php', {
            fid_user: route.params.id
        }).then(res => {
            console.log(res.data);
            setData(res.data)
        })
    }






    return (
        <View style={{ flex: 1, backgroundColor: colors.white, padding: 10, }}>

            <ScrollView showsVerticalScrollIndicator={false}>
                {data.map(i => {
                    return (
                        <View style={{
                            padding: 10,
                            borderBottomWidth: 1,
                            borderBottomColor: colors.border,
                            borderRadius: 10,
                        }}>
                            <Text style={{
                                fontFamily: fonts.secondary[400],
                                fontSize: windowWidth / 28
                            }}>{i.tipe === "redeem" ? "Penukaran Berhasil" : "Penambahan poin berhasil"}</Text>
                            <View style={{
                                paddingVertical: 5,
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <View>
                                    <Image style={{
                                        width: 20,
                                        height: i.tipe == "redeem" ? 20 : 12,
                                        resizeMode: 'contain'
                                    }} source={i.tipe == "redeem" ? require('../../assets/parfum.png') : require('../../assets/uang.png')} />
                                </View>
                                <View style={{
                                    flex: 1,
                                }}>
                                    <Text style={{
                                        left: 5,
                                        fontFamily: fonts.secondary[400],
                                        fontSize: windowWidth / 30
                                    }}>{i.tipe === "redeem" ? i.nama_hadiah : 'Rp ' + new Intl.NumberFormat().format(i.nominal)}</Text>
                                </View>

                                <View style={{
                                    flex: 0.5,
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingLeft: 10,
                                }}>
                                    <View>
                                        <Image style={{
                                            width: 20,
                                            resizeMode: 'contain'
                                        }} source={i.tipe === "redeem" ? require('../../assets/coin.png') : require('../../assets/coin2.png')} />
                                    </View>
                                    <View>
                                        <Text style={{
                                            left: 5,
                                            color: i.tipe === "redeem" ? colors.tertiary : colors.black,
                                            fontFamily: fonts.secondary[600],
                                            fontSize: windowWidth / 30
                                        }}>{i.tipe === "redeem" ? '-' : '+'} {i.point}</Text>
                                    </View>
                                </View>
                            </View>
                            <Text style={{
                                left: 5,
                                fontFamily: fonts.secondary[400],
                                fontSize: windowWidth / 35,
                                color: colors.secondary,
                                textAlign: 'right',
                                paddingRight: 10,
                            }}>{i.tanggal} {i.jam}</Text>
                        </View>
                    )
                })}
            </ScrollView>

        </View >
    )
}

const styles = StyleSheet.create({})