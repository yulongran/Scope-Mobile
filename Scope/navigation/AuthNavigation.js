import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack'
import HomeScreen from "../views/SignIn/index";
import SignUpScreen from '../views/SignUp/index';
import TabNavigator from './ProjectNavigation';
import ForegetPasswordScreen from '../views/ForgetPassword/index';

const Auth_Stack = createStackNavigator(
    {
        Home:
        {
            screen: HomeScreen,
            navigationOptions: {
                header: null,
            }

        },
        SignUp:
        {
            screen: SignUpScreen,
            navigationOptions: {
                header: null,
            }
        },
        ForegetPassword:
        {
            screen: ForegetPasswordScreen,
            navigationOptions: {
                header: null,
            }
        },
        Main:
        {
            screen: TabNavigator,
            navigationOptions: {
                header: null,
            }
        },

    },
    {
        initialRouteName: 'Home',
    },

)

export default createAppContainer(Auth_Stack);