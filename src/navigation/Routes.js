
import { createSwitchNavigator, createStackNavigator, createAppContainer, createDrawerNavigator, DrawerItems } from 'react-navigation'
import CustomDrawerNavigation from "../components/CustomDrawerNavigation/CustomDrawerNavigation"
import PastQuestions from '../screens/PastQuestions'
import Startup from '../screens/Startup'
import Payment from '../screens/Payment'
import BankTransferScreen from '../screens/BankTransferScreen'
import PutmeScreen from '../screens/PutmeScreen'
import MyExams from '../screens/MyExamScreen'
import About from '../screens/AboutScreen'
import DownloadScreen from "../screens/DownloadScreen"
import ActivationScreenOne from "../screens/ActivationScreenOne"
import ActivationScreenTwo from "../screens/ActivationScreenTwo"
import SelectSubject from '../screens/SelectSubjectScreen'
import Questions from '../screens/QuestionsScreen'
import SignUp from '../screens/SignUpScreen'
import PaymentPage from '../screens/PaymentPage'


const Auth = createStackNavigator({

    Startup: {
        screen: Startup,
        navigationOptions: {
            header: null
        }

    },
    Signup: {
        screen: SignUp,
        navigationOptions: {
            header: null
        }
    },


})
const Main = createStackNavigator({
    SelectSubject: {
        screen: SelectSubject,
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


    Download: {
        screen: DownloadScreen,
        navigationOptions: {
            header: null
        }
    },


    PaymentPage: {
        screen: PaymentPage,
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
    ActivationTwo: {
        screen: ActivationScreenTwo,
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
    Payment: {
        screen: Payment,
        navigationOptions: {
            header: null
        }
    },
    Questions: {
        screen: Questions,
        navigationOptions: {
            header: null
        }
    },
    MyExams: {
        screen: MyExams,
        navigationOptions: {
            header: null
        }
    },
    About: {
        screen: About,
        navigationOptions: {
            header: null
        }
    },
})


const StartScreen = createSwitchNavigator({
    Auth: Auth,
    Main: Main
},
    {
        initialRouteName: 'Auth',
    }

)

const DrawerNavigation = createDrawerNavigator({
    ["Add an Exam"]: {
        screen: PastQuestions,

    },

},
    {
        contentComponent: CustomDrawerNavigation,
        navigationOptions: {
            header: null
        }
    }
)

// const AppSwitchNavigator = createStackNavigator(
//     {
//         StartScreen: {
//             screen: StartScreen, navigationOptions: {
//                 header: null
//             }
//         },
//         ChooseQuestion: {
//             screen: ChooseQuestions, navigationOptions: {
//                 header: null
//             }
//         },

//     },
//     {
//         initialRouteName: 'StartScreen',
//     }
// )




export default createAppContainer(StartScreen);




