import axios from 'axios';

export const get_accident_data = async (getData) => {
    try{
        const response = await axios.post("/get_accident_data");
        getData(response.data)
    } catch (error) {
        console.log(error)
    }
}