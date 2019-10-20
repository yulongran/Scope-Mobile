export const checkLogin = async () => {
    const token = await AsyncStorage.getItem('id_token')
    if (!token) {
        return false;
    }
    var isLogged = false;
    fetch('http://localhost:8001/users/status',
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    auth_token: token
                }
            ),
        })
    return isLogged;
}

