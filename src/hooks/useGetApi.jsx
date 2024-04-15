import { useState, useEffect } from "react";

export const useGetApi = (url) => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(null);

	useEffect(() => {
		async function getApiData() {
			try {
        setIsError(false);
        setIsLoading(true);
				const response = await fetch(url);

				if (response.ok) {
          const data = await response.json();
          return setData(data);
				}

				throw new Error("Error loading products");
			} catch (error) {
				console.log(error);
				setIsError(error.message);
			} finally {
				setIsLoading(false);
			}
		}

		getApiData();
	}, [url]);

	return { data, isLoading, isError };
};
