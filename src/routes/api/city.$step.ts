import { json } from '@tanstack/react-start';
import { createAPIFileRoute } from '@tanstack/react-start/api';
import { getRandomCity } from '@/utils';
import { ofetch } from 'ofetch';

const WEATHER_API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const APIRoute = createAPIFileRoute('/api/city/$step')({
	GET: async ({ params }) => {
		console.log(`/api/city/${params.step} called`);

		const city = getRandomCity(parseInt(params.step));

		console.info(city);

		const response = await ofetch(
			`${WEATHER_API_BASE_URL}?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${process.env.OPEN_WEATHER_API_KEY}`
		);

		// return json(response);

		return json({
			...city,
			temp: response.main.temp
		});
	}
});
