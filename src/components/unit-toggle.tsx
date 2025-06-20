import { Card, Switch } from '@mantine/core';
import type { TemperatureUnit } from '../types';

interface UnitToggleProps {
	unit: TemperatureUnit;
	onUnitChange: (unit: TemperatureUnit) => void;
}

export function UnitToggle({ unit, onUnitChange }: UnitToggleProps) {
	return (
		<Card className="border-white/20 bg-white/10 backdrop-blur-md">
			<Card.Section className="p-4">
				<div className="flex items-center justify-start gap-3 text-white">
					Mode:
					<Switch
						size="xl"
						offLabel="°C"
						onLabel="°F"
						id="unit-toggle"
						checked={unit === 'fahrenheit'}
						onChange={(event) =>
							onUnitChange(event.currentTarget.checked ? 'fahrenheit' : 'celsius')
						}
						className="data-[state=checked]:bg-orange-500 data-[state=unchecked]:bg-blue-500"
					/>
				</div>
			</Card.Section>
		</Card>
	);
}
