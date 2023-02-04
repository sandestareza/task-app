import ApiClient from "../../lib/apiClient";
import { setToken } from '../../helpers/tokens';

export default async function SignIn(data){

    try {

        const response = await ApiClient.post('/auth/login', data)
    
        const result = await response.data

        if (response.status === 200) {

            setToken(result.auth_token)
            
            return {
                status : 200,
                message : 'Login Success',
            }
        }   

    } catch (error) {

        if (error?.response) {
            
            return {
                status : error?.response?.status,
                message : "Email or Password wrong"
            }
        }
        
        if (error.message) {
            return {
                status : 404,
                message : error?.message
            }
        }        
    }


}