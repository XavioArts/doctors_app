import { useState, useEffect } from "react";
import axios from "axios";

const useAxiosOnMount = (url) => {
    const[data, setData] = useState(null);
    const[error, setError] = useState(null);
    
    useEffect(()=> {
        getData();
    }, []);

    const getData = async () => {
        try {
            let res = await axios.get(url);
            setData(res.data);
        } catch {
            setError("error occured");
            // addd a better error message
        }
    };

    return { data, error }

};

export default useAxiosOnMount;