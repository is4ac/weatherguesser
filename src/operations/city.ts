import { queryOptions } from '@tanstack/react-query';
import { ofetch } from 'ofetch';

export const cityQueries = {
	singleKey: () => ['city'],
	single: (step: number) =>
		queryOptions({
			queryKey: [...cityQueries.singleKey(), step],
			queryFn: () => getSingleCity(step)
		})
};

export const getSingleCity = async (step: number) => {
	const response = await ofetch(`/api/city/${step}`, {
		baseURL:
			process.env.NODE_ENV === 'development'
				? 'http://localhost:3000'
				: 'https://weatherguesser.isaac-sung.com'
	});

	return response;
};
