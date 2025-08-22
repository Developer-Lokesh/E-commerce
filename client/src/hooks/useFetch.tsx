// import { ICategory, IProduct } from "../types/types";
import type { ICategory, IProduct } from "@/types/types";
import { useEffect, useState } from "react"

const useFetch = (url: string) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<ICategory[] | IProduct[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(url);
                const json = await res.json();
                if(!json.success){
                    setError(json.error || "Something went wrong while fetching");
                    return;
                }
                setData(json.data)
            } catch (error: any) {
                console.log(error );
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    },[url]);
    return { loading, error, data}
}

export default useFetch;