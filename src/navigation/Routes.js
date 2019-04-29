import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation'
import PastQuestions from '../screens/PastQuestions'
import Startup from '../screens/Startup'
import Payment from '../screens/Payment'
import BankTransferScreen from '../screens/BankTransferScreen'

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



export default createAppContainer(createSwitchNavigator(
    {
        Navigation: Navigation,
        Main: Main,

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





