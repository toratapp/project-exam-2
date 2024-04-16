import { APIKEY_URL } from "../components/constants/api";
import { useApiKeyActions } from "../stores/useApiKeyStore";
import { useToken } from "../stores/useUserStore";
import { useState, useEffect } from "react";

export const useCreateApiKey = () => {
  const [apiKeyData, setApiKeyData] = useState(null);
  const [isError, setIsError] = useState(false);
  const token = useToken();
  const { setApiKey } = useApiKeyActions();

  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        const response = await fetch(APIKEY_URL, { method: "POST", headers: { "Authorization": `Bearer ${token}` }});
        
        if (response.ok) {
          const jsonData = await response.json();
          setApiKeyData(jsonData);
          setApiKey(jsonData.data.key);
        } else {
          throw new Error("Error loading products");
        }    
      } catch(error) {
        console.error("Error fetching API key:", error);
        setIsError(true);
      }
    };

    fetchApiKey();
  }, [token, setApiKey]);

  return { apiKeyData, isError };
};
