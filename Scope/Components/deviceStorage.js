
import { AsyncStorage } from 'react-native';

export default devicesStoreage = {
    async saveItem(key, value) {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            console.log('AsyncStorage Error: ' + error.message);
        }
    },
    async getData(key) {
        try {
            const value = await AsyncStorage.getItem(key)
                .then((keyValue) => {
                    console.log(keyValue);
                    return keyValue;
                })
        } catch (e) {
            console.log(e);
        }
    }
}