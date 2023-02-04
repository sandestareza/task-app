import apiClient from "../../../lib/apiClient"

export default async function CreateItem(idGroup, data){

    try {

        const response = await apiClient.post(`/todos/${idGroup}/items`, data)
    
        const result = await response.data

        if (response.status === 201) {

            
            return {
                status : 201,
                message : 'Create Item Todos',
                data : result
            }
        }   

    } catch (error) {

        if (error?.response) {
            
            return {
                status : error?.response?.status,
                message : error?.response?.data?.message,
                data : []
            }
        }
        
        if (error.message) {
            return {
                status : 404,
                message : error?.message,
                data : []
            }
        }        
    }


}