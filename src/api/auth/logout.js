import { checkToken, getToken, removeToken } from '../../helpers/tokens';

export default async function Logout(){

    try {

        const token = getToken()
        
        if (token) {

            removeToken()
            
            return {
                status : 200,
                message : 'Logout Success',
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