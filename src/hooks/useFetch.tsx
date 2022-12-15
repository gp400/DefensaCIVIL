import { useState } from "react"

const useFetch = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<any>();

    const fetchApi = (url: string) => {
        setIsLoading(true);
        fetch(url)
            .then((response) => response.json())
            .then((resp) => {
                setData(resp);
                setIsLoading(false);
            });
    }

    const fetchApiPost = async(url: string, data: FormData) => {
        return fetch(url, {
            method: 'POST',
            body: data
        })
    }

    return {data, isLoading, fetchApi, fetchApiPost}
}

export default useFetch
