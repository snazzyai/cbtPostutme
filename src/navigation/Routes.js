import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation'
import PastQuestions from '../screens/PastQuestions'
import Startup from '../screens/Startup'

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
})

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





