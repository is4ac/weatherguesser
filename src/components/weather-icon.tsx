import { Cloud, Sun, CloudRain, Snowflake } from 'lucide-react';
import { getTemperatureColor } from '../utils';

interface WeatherIconProps {
	temperature: number;
}

export function WeatherIcon({ temperature }: WeatherIconProps) {
	const getWeatherIcon = (temp: number) => {
		if (temp < 0) return <Snowflake className="h-8 w-8 text-blue-200" />;
		if (temp < 10) return <Cloud className="h-8 w-8 text-gray-300" />;
		if (temp < 20) return <CloudRain className="h-8 w-8 text-blue-400" />;
		return <Sun className="h-8 w-8 text-yellow-400" />;
	};

	return (
		<div className="flex justify-center">
			<div
				className={`rounded-full bg-gradient-to-br p-6 ${getTemperatureColor(temperature)} shadow-lg`}
			>
				{getWeatherIcon(temperature)}
			</div>
		</div>
	);
}
