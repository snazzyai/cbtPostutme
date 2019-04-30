import { createSwitchNavigator, createStackNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation'
import CustomDrawerNavigation from '../components/DrawerNavigator/CustomDrawerNavigation'
import PastQuestions from '../screens/PastQuestions'
import Startup from '../screens/Startup'
import Payment from '../screens/Payment'
import BankTransferScreen from '../screens/BankTransferScreen'
import PutmeScreen from '../screens/PutmeScreen'
import WaecScreen from '../screens/WaecScreen'

const Navigation = createStackNavigator({
    Startup: {
        screen: Startup,
        navigationOptions: {
            header: null
        }
    },
})


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


})


const DrawerNavigation = createDrawerNavigator({
    Waec: WaecScreen,
    Putme: PutmeScreen,

},
    {
        contentComponent: CustomDrawerNavigation
    })



export default createAppContainer(createSwitchNavigator(
    {
        Navigation: Navigation,
        Main: Main,
        DrawerNavigation: DrawerNavigation

    },
    {
        initialRouteName: 'Navigation',
    }
));

// export const CreateRootNavigator = () => {
//     return createAppContainer(createSwitchNavigator(
//         {
//             Navigation: {
//                 screen: Navigation
//             },
//             Main: {
//                 screen: Main
//             }
//         },

//     )
//     )
// }





