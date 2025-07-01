import { Cloud, Sun, CloudRainWind, Snowflake, CloudLightning, AudioLines } from 'lucide-react';
import { WeatherCondition } from '@/types';

interface WeatherIconProps {
	condition: WeatherCondition;
}

export function WeatherIcon({ condition }: WeatherIconProps) {
	const getWeatherIcon = (weather: WeatherCondition) => {
		if (weather === 'Snow') {
			return <Snowflake className="size-8 text-blue-200" />;
		} else if (weather === 'Clouds') {
			return <Cloud className="size-8 text-gray-300" />;
		} else if (weather === 'Drizzle' || weather === 'Rain') {
			return <CloudRainWind className="size-8 text-gray-300" />;
		} else if (weather === 'Clear') {
			return <Sun className="size-8 text-yellow-400" />;
		} else if (weather === 'Thunderstorm') {
			return <CloudLightning className="size-8 text-gray-300"></CloudLightning>;
		} else {
			return <AudioLines className="size-8 rotate-90 text-gray-400"></AudioLines>;
		}
	};

	return (
		<div className="flex justify-center">
			<div className={`rounded-full bg-gradient-to-br from-blue-400 to-blue-600 p-6 shadow-lg`}>
				{getWeatherIcon(condition)}
			</div>
		</div>
	);
}
