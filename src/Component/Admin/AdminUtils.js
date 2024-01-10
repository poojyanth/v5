import axios from 'axios';


const AdminUtils = () => {
    const data=[];
    const Backendport = process.env.REACT_APP_BACKEND_PORT;

    const getusers = async () => {
        try {
            const response = await axios.get(`http://localhost:${Backendport}/api/user/get/allusers`);
            data.push(response.data);
        } catch (error) {
            console.log("ERROR OCCURED IN CATCH BLOCK" + error)
        }
    }

  return data
}

export {AdminUtils}