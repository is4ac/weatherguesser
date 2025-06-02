import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/cities/')({
	beforeLoad: () => redirect({ to: '/cities/$city', params: { city: '0' } })
});
