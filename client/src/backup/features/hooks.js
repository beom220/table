import { useQueryClient, useQuery } from 'react-query';

const useSetClientState = (key) => {
    const queryClient = useQueryClient();
    return (state) => queryClient.setQueryData(key, state);
};

const useClientValue = (key, initialData) =>
    useQuery(key, {
        initialData,
        staleTime: Infinity,
    }).data;

export { useClientValue, useSetClientState };