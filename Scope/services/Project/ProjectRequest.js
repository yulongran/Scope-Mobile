
import { AsyncStorage } from 'react-native';

class ProjectRequest {

    /** 
     * POST APT to fetch all projects under one user
     */
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

    /**
     * POST API to delete project by given id
     * @param {*} project_id  The id of the delete project 
     */
    static async deleteProject(project_id) {
        const token = await AsyncStorage.getItem('id_token');
        if (!token) {
            return false;
        }
        let response = await fetch('http://localhost:8001/project/delete',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    auth_token: token,
                },
            })
        let responseJson = await response.text();
        if (responseJson == 'Success') {
            return true
        }
        return false

    }
}

export default ProjectRequest
