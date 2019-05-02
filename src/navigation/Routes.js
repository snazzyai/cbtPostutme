
import { createSwitchNavigator, createStackNavigator, createAppContainer, createDrawerNavigator, DrawerItems } from 'react-navigation'
import CustomDrawerNavigation from "../components/CustomDrawerNavigation/CustomDrawerNavigation"
import PastQuestions from '../screens/PastQuestions'
import Startup from '../screens/Startup'
import Quiz from '../screens/Quiz.screen';
import Payment from '../screens/Payment'
import BankTransferScreen from '../screens/BankTransferScreen'
import PutmeScreen from '../screens/PutmeScreen'
import WaecScreen from '../screens/WaecScreen'
import DownloadScreen from "../screens/DownloadScreen"
import ActivationScreenOne from "../screens/ActivationScreenOne"
import ActivationScreenTwo from "../screens/ActivationScreenTwo"



const Main = createStackNavigator({
    Quiz: {
        screen: Quiz,
        navigationOptions: {
            header: null
        }
    },
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
    ActivationOne: {
        screen: ActivationScreenOne,
        navigationOptions: {
            header: null
        }
    },
    ActivationTwo: {
        screen: ActivationScreenTwo,
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


