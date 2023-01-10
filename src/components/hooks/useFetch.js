import { useCallback, useState } from "react";

export const useFetch = () => {
    const [isLoading, setIsLoading] = useState(false)
    const request = useCallback(async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {

        try {
            setIsLoading(true)
            const response = await fetch(url, {method, body, headers});

            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json();
            setIsLoading(false)
            return data;
        } catch(e) {
            throw e;
        }
    }, []);

    return {request,isLoading}
}