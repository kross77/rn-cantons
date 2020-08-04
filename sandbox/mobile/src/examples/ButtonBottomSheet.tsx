import React, {useEffect, useState} from 'react';
import {Animated, Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
import Test from '@rn-cantons/layout';
import DarkSkin from './components/darkSkin';
import {BottomSheet} from '@rn-cantons/bottom-sheet';
import {useSingleLink} from "@rn-cantons/react-link";

const ScrollBottomSheet = ({zIndex = 0}) => {
    const [hideAnimation] = useState(new Animated.Value(0));
    const openLink = useSingleLink(false);

    useEffect(() => {
        Animated.spring(hideAnimation, {toValue: openLink.value ? 1 : 0, useNativeDriver: true}).start();
    }, [openLink.value])

    return (
        <>
            <SafeAreaView zIndex={zIndex}>
                <Header/>
                {global.HermesInternal == null ? null : (
                    <View style={styles.engine}>
                        <Text style={styles.footer}>Engine: Hermes</Text>
                    </View>
                )}
                <Test/>
                <Button onPress={() => openLink.set(!openLink.value)} title={'toggle bottom sheet'}/>
            </SafeAreaView>
            <BottomSheet
                {...{
                    skin: DarkSkin,
                    openLink,
                    headerHeight: 0,
                    height: 500,
                    zIndex: zIndex + 1,
                    children: <Text>This is working</Text>
                }} />
            {/*</Animated.View>*/}
        </>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.lighter,
    },
    scrollViewContent: {
        minHeight: '100%',
        paddingBottom: 100
    },
    engine: {
        position: 'absolute',
        right: 0,
    },
    body: {
        backgroundColor: Colors.white,
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: Colors.dark,
    },
    highlight: {
        fontWeight: '700',
    },
    footer: {
        color: Colors.dark,
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right',
    },
});

export default ScrollBottomSheet;
