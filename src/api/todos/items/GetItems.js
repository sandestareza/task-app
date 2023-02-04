import ApiClient from "../../../lib/apiClient";


export default async function GetItems(idGroup) {

    try {

        const response = await ApiClient.get(`/todos/${idGroup}/items`);

        const result = await response.data;

        if (response.status === 200) {


            return {
                status: 200,
                message: 'List Items Todos',
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
