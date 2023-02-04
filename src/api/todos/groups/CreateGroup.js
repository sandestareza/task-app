import ApiClient from "../../../lib/apiClient";


export async function CreateGroup(data) {

    try {

        const response = await ApiClient.post('/todos', data);

        const result = await response.data;
        
        if (response.status === 201) {

            return {
                status: 201,
                message: 'Create Group Todo Success',
                data: result
            };
        }

    } catch (error) {

        if (error?.response) {

            return {
                status: error?.response?.status,
                message: error?.response?.data?.message,
                data: []
            };
        }

        if (error.message) {
            return {
                status: 404,
                message: error?.message,
                data: []
            };
        }
    }


}
