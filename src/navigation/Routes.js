import React from 'react';
import { SafeAreaView, View, Image } from 'react-native'
import { createSwitchNavigator, createStackNavigator, createAppContainer, createDrawerNavigator, DrawerItems } from 'react-navigation'
import PastQuestions from '../screens/PastQuestions'
import Startup from '../screens/Startup'
import Payment from '../screens/Payment'
import BankTransferScreen from '../screens/BankTransferScreen'
import PutmeScreen from '../screens/PutmeScreen'
import WaecScreen from '../screens/WaecScreen'



const CustomDrawerNavigation = (props) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ height: 170 }}>
                <Image style={{ height: 170, width: 280 }} source={require("../../assets/images/background.jpg")} />
            </View>
            <View style={{ flex: 1, backgroundColor: "#fafafa" }}>
                <DrawerItems {...props} />
            </View>
        </SafeAreaView>
    );
}

const Main = createStackNavigator({
    PastQuestions: {
        screen: PastQuestions,
        navigationOptions: {
            header: null
        }
    },
    Payment: {
        screen: Payment,
        navigationOptions: {
            header: null
        }
    },
    BankTransfer: {
        screen: BankTransferScreen,
        navigationOptions: {
            header: null
        }
    },
    Download: {
        screen: DownloadScreen,
        navigationOptions: {
            header: null
        }
    }



})
const StartScreen = createSwitchNavigator({
    Startup: Startup,
    Main: Main


})

const DrawerNavigation = createDrawerNavigator({
    Waec: {
        screen: WaecScreen
    },
    Putme: {
        screen: PutmeScreen
    }
},
    {
        contentComponent: CustomDrawerNavigation
    }
)

const AppSwitchNavigator = createSwitchNavigator(
    {
        StartScreen: StartScreen,
        DrawerNavigation: DrawerNavigation
    },
    {
        initialRouteName: 'StartScreen',
    }
)




export default createAppContainer(AppSwitchNavigator);




