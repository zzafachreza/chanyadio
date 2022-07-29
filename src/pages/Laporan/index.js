import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { fonts, windowWidth } from '../../utils/fonts';
import { colors } from '../../utils/colors';
import axios from 'axios';
import { urlAPI } from '../../utils/localStorage';




export default function Laporan({ route }) {

    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);

    useEffect(() => {
        getDataRedeem();
        getDataReward();
    }, [])

    const getDataRedeem = () => {
        axios.post(urlAPI + '1_get_redeem.php', {
            fid_user: route.params.id
        }).then(res => {
            console.log(res.data);
            setData(res.data)
        })
    }


    const getDataReward = () => {
        axios.post(urlAPI + '1_get_reward.php', {
            fid_user: route.params.id
        }).then(res => {
            console.log(res.data);
            setData2(res.data)
        })
    }


    const MyRedeem = ({ dt = data }) => (
        <View style={{ flex: 1, backgroundColor: colors.white, padding: 10, }}>
            {dt.map(i => {
                return (
                    <View style={{
                        padding: 10,
                        borderWidth: 1,
                        marginVertical: 5,
                        borderRadius: 10,
                    }}>
                        <Text style={{
                            fontFamily: fonts.secondary[400],
                            fontSize: windowWidth / 27
                        }}>Redeem Berhasil</Text>
                        <View style={{
                            paddingVertical: 10,
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <View>
                                <Image source={require('../../assets/parfum.png')} />
                            </View>
                            <View style={{
                                flex: 1,
                            }}>
                                <Text style={{
                                    left: 5,
                                    fontFamily: fonts.secondary[400],
                                    fontSize: windowWidth / 30
                                }}>{i.nama_hadiah}</Text>
                            </View>
                            <View style={{
                                borderRightWidth: 1,
                                height: '100%'

                            }} />
                            <View style={{
                                flex: 0.5,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                paddingLeft: 10,
                            }}>
                                <View>
                                    <Image source={require('../../assets/coin.png')} />
                                </View>
                                <View>
                                    <Text style={{
                                        left: 5,
                                        fontFamily: fonts.secondary[400],
                                        fontSize: windowWidth / 30
                                    }}>- {i.point}</Text>
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
                        }}>{i.tanggal}</Text>
                    </View>
                )
            })}
        </View >
    );

    const MyReward = ({ dt = data2 }) => (
        <View style={{ flex: 1, backgroundColor: colors.white }}>
            {dt.map(i => {
                return (
                    <View style={{
                        padding: 10,
                        borderWidth: 1,
                        marginVertical: 5,
                        borderRadius: 10,
                    }}>
                        <Text style={{
                            fontFamily: fonts.secondary[400],
                            fontSize: windowWidth / 27
                        }}>Reward Berhasil</Text>
                        <View style={{
                            paddingVertical: 10,
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <View>
                                <Image source={require('../../assets/uang.png')} />
                            </View>
                            <View style={{
                                flex: 1,
                            }}>
                                <Text style={{
                                    left: 5,
                                    fontFamily: fonts.secondary[400],
                                    fontSize: windowWidth / 30
                                }}>Rp. {new Intl.NumberFormat().format(i.nominal)}</Text>
                            </View>
                            <View style={{
                                borderRightWidth: 1,
                                height: '100%'

                            }} />
                            <View style={{
                                flex: 0.5,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                paddingLeft: 10,
                            }}>
                                <View>
                                    <Image source={require('../../assets/coin.png')} />
                                </View>
                                <View>
                                    <Text style={{
                                        left: 5,
                                        fontFamily: fonts.secondary[400],
                                        fontSize: windowWidth / 30
                                    }}>+ {i.point}</Text>
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
                        }}>{i.tanggal}</Text>
                    </View>
                )
            })}
        </View>
    );

    const renderScene = SceneMap({
        first: MyRedeem,
        second: MyReward,
    });

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Redeem' },
        { key: 'second', title: 'Reward ' },
    ]);


    const renderTabBar = props => (
        <TabBar
            {...props}
            labelStyle={{ color: colors.primary }}
            bounces
            indicatorStyle={{ backgroundColor: colors.primary, padding: 2 }}
            style={{ backgroundColor: colors.white }}
        />
    );


    return (
        <TabView
            renderTabBar={renderTabBar}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: windowWidth }}
        />
    )
}

const styles = StyleSheet.create({})