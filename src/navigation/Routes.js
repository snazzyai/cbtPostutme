import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation'
import PastQuestions from '../screens/PastQuestions'
import Startup from '../screens/Startup'
import Payment from '../screens/Payment'

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
            title: "CHOOSE A TYPE",
            headerStyle: {
                backgroundColor: "#47a309"
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
                fontWeight: "bold"
            }
        }
    },
    Payment: {
        screen: Payment,
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





