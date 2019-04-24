import { createStackNavigator, createAppContainer } from 'react-navigation'
import Signin from '../screens/Signin'
import PastQuestions from '../screens/PastQuestions'
import Startup from '../screens/Startup'

const Navigator = createStackNavigator({
    Startup: {
        screen: Startup,
        navigationOptions: {
            header: null
        }
    },
    Signin: {
        screen: Signin,
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
})

export default createAppContainer(Navigator)


