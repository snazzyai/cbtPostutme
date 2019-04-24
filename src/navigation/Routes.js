import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation'
import Splashscreen from './screens/Splashscreen'
import Signin from './screens/Signin.js'

const Navigator = createStackNavigator({
    Splashscreen: {
        screen: Splashscreen,
        navigationOptions: {
            header: null
        }
    },
    Signin: {
        screen: Signin,
        navigationOptions: {
            header: null
        }
    }
})

export default createAppContainer(Navigator)


