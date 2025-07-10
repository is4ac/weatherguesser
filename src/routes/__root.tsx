import { ColorSchemeScript, MantineProvider, createTheme, mantineHtmlProps } from '@mantine/core';
import {
	HeadContent,
	Link,
	Outlet,
	Scripts,
	createRootRouteWithContext
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import type * as React from 'react';
import { DefaultCatchBoundary } from '@/components/DefaultCatchBoundary';
import { NotFound } from '@/components/NotFound';
import { seo } from '@/utils/seo';
import css from './__root.css?url';
import { QueryClient } from '@tanstack/react-query';

const theme = createTheme({
	/** Put your mantine theme override here */
});

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
}>()({
	head: () => ({
		meta: [
			{
				charSet: 'utf-8'
			},
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1'
			},
			...seo({
				title: 'Weather Guesser Game',
				description: 'Guess the current temperature of random cities around the world!',
				keywords: 'weather, guesser, game, temperature, cities'
			})
		],
		links: [
			{
				rel: 'apple-touch-icon',
				sizes: '180x180',
				href: '/apple-touch-icon.png'
			},
			{
				rel: 'icon',
				type: 'image/png',
				sizes: '32x32',
				href: '/favicon-32x32.png'
			},
			{
				rel: 'icon',
				type: 'image/png',
				sizes: '16x16',
				href: '/favicon-16x16.png'
			},
			{ rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
			{ rel: 'icon', href: '/favicon.ico' },
			{
				rel: 'stylesheet',
				href: css
			}
		]
	}),
	errorComponent: (props) => {
		return (
			<RootDocument>
				<DefaultCatchBoundary {...props} />
			</RootDocument>
		);
	},
	notFoundComponent: () => <NotFound />,
	component: RootComponent
});

function RootComponent() {
	return (
		<RootDocument>
			<Outlet />
		</RootDocument>
	);
}

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html {...mantineHtmlProps}>
			<head>
				<HeadContent />
				<ColorSchemeScript />
			</head>
			<body>
				<MantineProvider theme={theme}>
					{children}
					<TanStackRouterDevtools position="bottom-right" />
					<Scripts />
				</MantineProvider>
				<footer className="-mt-9 w-full pb-2 text-center text-sm text-white md:-mt-16 md:p-4 md:text-base">
					Made with ❤️ by{' '}
					<a
						href="https://www.isaac-sung.com"
						className="underline underline-offset-4 hover:no-underline"
					>
						Isaac Sung
					</a>
				</footer>
			</body>
		</html>
	);
}
