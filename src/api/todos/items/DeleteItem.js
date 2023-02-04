import ApiClient from "../../../lib/apiClient";

export default async function DeleteItem(idGroup, idItem){

    try {

        const response = await ApiClient.delete(`/todos/${idGroup}/items/${idItem}`)
     
        const result = await response.data

        if (response.status === 204) {

            
            return {
                status : 200,
                message : 'Delete Item Todos',
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