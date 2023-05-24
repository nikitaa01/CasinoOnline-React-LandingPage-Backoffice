import { useState } from "react";

export default function useFetch(url, options = undefined) {
    if (!url) throw new Error("URL is required");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        setData(null);
        let dataRes = false;
        try {
            const res = await fetch(url, options)
            if (!res.ok) {
                setError(res.status)
            }
            const data = await res.json()
            setData(data);
            dataRes = data;
        } catch (error) {
            setError(error);
        }
        setLoading(false);
        return dataRes;
    };

    return {
        fetchData,
        loading,
        error,
        data,
    };
}
