import { Card } from '@mantine/core';
import type { TemperatureUnit } from '../types';

interface InstructionsProps {
	unit: TemperatureUnit;
}

export function Instructions({ unit }: InstructionsProps) {
	return (
		<Card className="border-white/20 bg-white/10 backdrop-blur-md">
			<Card.Section className="px-5 py-6">
				<h4 className="mb-2 font-semibold text-white">How to Play</h4>
				<ul className="space-y-1 text-sm text-white/80">
					<li>
						• Guess the current temperature in {unit === 'celsius' ? 'Celsius' : 'Fahrenheit'}
					</li>
					<li>• Perfect guess: 10 points</li>
					<li>• Within 2°C: 7 points</li>
					<li>• Within 5°C: 5 points</li>
					<li>• Within 10°C: 2 points</li>
				</ul>
			</Card.Section>
		</Card>
	);
}
