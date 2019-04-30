import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation'
import PastQuestions from '../screens/PastQuestions'
import Startup from '../screens/Startup'
import Quiz from '../screens/Quiz.screen';
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

/**
 * @var setup: Setup Navigation Stack for First User.
 */
const Setup = createStackNavigator({

    BankTransfer: {
        screen: BankTransferScreen
    },
    Payment: {
        screen: Payment,
        navigationOptions: {
            header: null
        }
    },
    PastQuestions: {
        screen: PastQuestions,
        navigationOptions: {
            header: null
        }
    }
});

// const User = createStackNavigator({
//     MyExam: {
//         screen: 
//     }
// })



export default createAppContainer(createSwitchNavigator(
    {
        Navigation: Navigation,
        Main: Main,
    },
    {
        initialRouteName: 'Main',
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



