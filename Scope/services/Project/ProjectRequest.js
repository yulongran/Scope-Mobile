
import { AsyncStorage } from 'react-native';

class ProjectRequest {

    static async fetchProject() {
        const token = await AsyncStorage.getItem('id_token');
        if (!token) {
            return false;
        }
        let response = await fetch('http://localhost:8001/project/',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    auth_token: token,
                },
            })
        let responseJson = await response.json();
        return responseJson

    }
}

export default ProjectRequest
