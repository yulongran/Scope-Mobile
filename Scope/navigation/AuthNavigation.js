import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack'
import HomeScreen from "../views/SignIn/index";
import SignUpScreen from '../views/SignUp/index';
import TabNavigator from './ProjectNavigation';

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