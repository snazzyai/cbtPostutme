import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native'



class Splashscreen extends Component {

    state = {
        firstLaunch: true,
        downloadComplete: false
    }


    downloadComplete = () => {

    }

    componentDidMount() {
        if (!this.state.firtLaunch) {
            setTimeout(() => this.props.navigation.navigate('Signin'), 2000)
        }
        else {
            const LoadingScreen = setTimeout(() => {
                const Loading = <View>
                    <Text>Downloading files ..</Text>
                </View>
            }, 3000)


        }
        if (this.state.downloadComplete) {

        }
        else {

        }
    }
    render() {
        (this.state.downloadComplete === false) ? <Text>Downloading files... </Text> : downloadComplete()
        return (
            <View style={styles.container}>
                <View style={styles.logo}>
                    <Image source={require('../../assets/images/faceyourbook.jpg')} />
                    {Loading}
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#6FD84A"
    },
    logo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
export default Splashscreen;