import type React from 'react';

import { Button, NumberInput } from '@mantine/core';
import { Thermometer } from 'lucide-react';
import type { TemperatureUnit } from '../types';

interface TemperatureInputProps {
	guess: string;
	unit: TemperatureUnit;
	cityName: string;
	onGuessChange: (guess: string) => void;
	onSubmitGuess: () => void;
}

export function TemperatureInput({
	guess,
	unit,
	cityName,
	onGuessChange,
	onSubmitGuess
}: TemperatureInputProps) {
	const getUnitSymbol = () => (unit === 'fahrenheit' ? '°F' : '°C');

	const handleKeyUp = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			onSubmitGuess();
		}
	};

	return (
		<div className="space-y-4">
			<div className="text-center">
				<h3 className="mb-2 text-lg font-semibold text-white">What's the temperature?</h3>
				<p className="text-sm text-white/80">Guess the current temperature in {cityName}</p>
			</div>

			<div className="flex gap-2">
				<div className="relative flex-1">
					<NumberInput
						value={guess}
						onChange={(value) => onGuessChange(value + '')}
						placeholder={`Temp in ${getUnitSymbol()}`}
						size="md"
						className="border-white/30 bg-white/20 pr-12 text-white placeholder:text-white/60"
						onKeyUp={handleKeyUp}
					/>
					<div className="absolute top-1/2 right-3 -translate-y-1/2 transform">
						<Thermometer className="h-4 w-4 text-white/60" />
					</div>
				</div>
				<Button
					onClick={onSubmitGuess}
					size="md"
					disabled={!guess}
					className="border-white/30 bg-white/20 text-white hover:bg-white/30"
				>
					Guess
				</Button>
			</div>
		</div>
	);
}
