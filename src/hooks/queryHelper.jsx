import { useQuery } from '@tanstack/react-query';

// TEMP
const baseURL = "http://localhost:3000";

export const customUseQuery = (id, path, key, staleTime = 0) => {
    return useQuery({
        queryKey: [key, id],
        queryFn: async () => {
            const response = await fetch(
                baseURL + path,
            );
            if (!response.ok) {
                throw new Error('Network response was not successful...');
            }
            return await response.json();
        },
        enabled: !!id,
        staleTime: staleTime
    })
}