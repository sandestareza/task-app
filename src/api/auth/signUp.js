import ApiClient from "../../lib/apiClient";
import { setToken } from '../../helpers/tokens';

export default async function SignUp(data){

    try {

        const response = await ApiClient.post('/signup', data)
    
        const result = await response.data

        if (response.status === 201) {

            setToken(result.auth_token)
            
            return {
                status : 201,
                message : result.message,
            }
        }   

    } catch (error) {

        if (error?.response) {
            
            return {
                status : error?.response?.status,
                message : error?.response?.data?.message
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