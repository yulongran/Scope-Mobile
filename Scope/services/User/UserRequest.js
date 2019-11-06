import { AsyncStorage } from 'react-native';

class UserRequest {

    /**
    * POST Login request to the sever
    */
    static async login(username, password) {
        console.log("Calling login")
        await fetch('http://localhost:8001/users/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        }).then((response) => {
            // Log in Successful
            if (response.status == 200) {
                AsyncStorage.setItem("id_token", response.headers.map.auth_token)
                return true
            }
        }).catch((error) => {
            throw error
        });
        return false
    }



    /**
     * POST User Status request to verify JWT token
     */
    static async checkUserStatus() {
        const token = await AsyncStorage.getItem('id_token')
        await fetch('http://localhost:8001/users/status',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    auth_token: token,
                },

            }).then((response) => {
                if (response.status == 200) {
                    return true
                }
            }).catch((error) => {
                throw ("User Status: " + error)
            })
        return false
    }

    /**
  * POST Sign Up request to the sever
  */
    static async signUp(firstname, lastname, username, password) {
        await fetch('http://localhost:8001/users/register',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        firstname, firstname,
                        lastname: lastname,
                        username: username,
                        password: password,
                    }
                ),
            }).then((response) => {
                if (response.status == 200) {
                    return true
                }
            })
        return false
    }

    /**
     * POST Request to fetch one user info
     */
    static async fetchPeople(user_firstname, user_lastname) {
        const token = await AsyncStorage.getItem('id_token');
        if (!token) {
            return false;
        }
        let response = await fetch('http://localhost:8001/users/people',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    auth_token: token,
                    user_firstname: user_firstname,
                    user_lastname: user_lastname,
                },
            })
        let responseJson = await response.json();
        return responseJson
    }
}


export default UserRequest