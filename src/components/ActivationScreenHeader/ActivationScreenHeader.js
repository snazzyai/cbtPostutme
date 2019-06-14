import React from 'react';
import { StyleSheet, View, Text, ImageBackground } from 'react-native'
import MenuDrawer from '../MenuDrawerComponent/MenuDrawerComponent'



const ActivationScreenHeader = ({ processText, myStyle, onClickDrawerOpen }) => {
    return (
        <ImageBackground source={require("../../../assets/images/background.jpg")} style={[styles.header, myStyle]}>
            <MenuDrawer styling={{ paddingLeft: 30, marginBottom: 50 }} onClickDrawerOpener={onClickDrawerOpen} />
            <Text style={styles.headerText} > {processText}</Text>
        </ImageBackground>
    )
}
const styles = StyleSheet.create({
    header: {
        height: 200,
        paddingTop: "3%"
    },
    headerText: {
        fontWeight: "bold",
        fontSize: 30,
        color: "#fff",
        textAlign: "center"

    }
})
export default ActivationScreenHeader