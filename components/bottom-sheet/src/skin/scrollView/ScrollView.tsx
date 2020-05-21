import {ScrollView, StyleSheet} from "react-native";
import React from "react";
import {Colors} from "react-native/Libraries/NewAppScreen";

interface ScrollViewSkin {
    hideHeader: () => void
    showHeader: () => void
}

const ScrollViewSkin = ({hideHeader, showHeader, ...props}: ScrollViewSkin) => (
    <ScrollView
        scrollEventThrottle={500}
        onScrollBeginDrag={hideHeader}
        onScrollEndDrag={showHeader}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.scrollViewContent}
        style={styles.scrollView}
        {...props}
    />
)

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.lighter,
    },
    scrollViewContent: {
        minHeight: '100%',
        paddingBottom: 100
    },
});


export default ScrollViewSkin;
