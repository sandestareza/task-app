import ApiClient from "../../../lib/apiClient"

export default async function UpdateItem(idGroup, idItem, data, idGroupTo = null){

    try {

        const body = {
            ...data,
            target_todo_id : data.idGroup || idGroupTo
        }

        const response = await ApiClient.patch(`/todos/${idGroup}/items/${idItem}`, body)
    
        const result = await response.data

        if (response.status === 200) {

            return {
                status : 200,
                message : 'Update Item Todos',
                data : result
            }
        }   

    } catch (error) {

        if (error?.response) {
            
            return {
                status : error?.response?.status,
                message : error?.response?.data,
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