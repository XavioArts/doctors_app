import { useState, useEffect } from "react";
import axios from "axios";

const useAxiosOnMount = (url) => {
    const[data, setData] = useState(null);
    const[error, setError] = useState(null);
    const[loading, setLoading] = useState(true);
    
    useEffect(()=> {
        getData();
    }, []);

    const getData = async () => {
        setLoading(true);
        try {
            let res = await axios.get(url);
            setData(res.data);
            setLoading(false);
        } catch {
            setError("error occured");
            setLoading(false);
            // addd a better error message
        }
    };

    return { data, error, setData, loading };

};

export default useAxiosOnMount;