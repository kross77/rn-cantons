import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View, Animated} from 'react-native';
import {Colors, Header,} from 'react-native/Libraries/NewAppScreen';
import Test from '@rn-cantons/layout'
import {ScrollViewBottomSheet} from '@rn-cantons/bottom-sheet'
import DarkSkin from './darkSkin'
import faker from 'faker'

let timeoutId: number = -1;

const App = () => {

    const [hideAnimation] = useState(new Animated.Value(0));

    return (
        <>
            <StatusBar barStyle="dark-content"/>

                <ScrollViewBottomSheet
                    bottomSheet={{
                        skin: DarkSkin,
                        height: 400,
                        children:  <Text>This is working</Text>
                    }}
                >
                    <SafeAreaView>
                    <Header/>
                    {global.HermesInternal == null ? null : (
                        <View style={styles.engine}>
                            <Text style={styles.footer}>Engine: Hermes</Text>
                        </View>
                    )}
                    <Test/>
                    <Text>{faker.lorem.paragraphs(13)}</Text>
                    </SafeAreaView>
                </ScrollViewBottomSheet>



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

export default App;
