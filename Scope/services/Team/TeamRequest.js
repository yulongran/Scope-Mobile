import { AsyncStorage } from 'react-native';

class TeamRequest {

    /**
     * Fetch team info based on project id
     */

    static async fetchTeam(project_id) {
        const token = await AsyncStorage.getItem('id_token');
        if (!token) {
            return false;
        }
        let response = await fetch('http://localhost:8001/team',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    auth_token: token,
                    project_id: project_id
                },
            })
        let responseJson = await response.json();
        return responseJson
    }


    static async fetchTeamMember(project_id, team_number) {
        const token = await AsyncStorage.getItem('id_token');
        if (!token) {
            return false;
        }
        let response = await fetch('http://localhost:8001/team/member_size',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    auth_token: token,
                    project_id: project_id,
                    team_number: team_number,
                },
            })
        let responseJson = await response.json();
        return responseJson
    }

    //  /**
    //     * Remove Team
    //     */
    //    async removeTeam() {

    //     const token = await AsyncStorage.getItem('id_token');
    //     if (!token) {
    //         return false;
    //     }
    //     let response = await fetch('http://localhost:8001/team/delete',
    //         {
    //             method: 'POST',
    //             headers: {
    //                 Accept: 'application/json',
    //                 'Content-Type': 'application/json',
    //                 auth_token: token,
    //                 project_id: this.state.project_id,
    //                 team_number: this.state.team_number,
    //             },
    //         })
    //     let responseJson = await response.text();
    //     if (responseJson == 'Success') {
    //         this.setState(
    //             {
    //                 delete: true,
    //             }
    //         )
    //     }
    //     return true

    // }
}


export default TeamRequest