import { useState, useEffect } from "react";
import { useToken } from "../stores/useUserStore";
import { useApiKey } from "../stores/useApiKeyStore";

export const useGetApi = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);
  const token = useToken();
	const apiKey = useApiKey();

  useEffect(() => {
    async function getApiData() {
      const options = {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
          "X-Requested-With": "",
					"X-Noroff-API-Key": apiKey,
        }
      };

      try {
        setIsError(false);
        setIsLoading(true);
        const response = await fetch(url, options);

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setData(data);
        } else {
          throw new Error("Error loading results");
        }
      } catch (error) {
        console.log(error);
        setIsError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    getApiData();
  }, [url, token, apiKey]);

  return { data, isLoading, isError };
};
