import { ColorSchemeScript, MantineProvider, createTheme, mantineHtmlProps } from '@mantine/core';
import { HeadContent, Link, Outlet, Scripts, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import type * as React from 'react';
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary';
import { NotFound } from '~/components/NotFound';
import { seo } from '~/utils/seo';
import css from './__root.css?url';

const theme = createTheme({
	/** Put your mantine theme override here */
});

export const Route = createRootRoute({
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
				title: 'TanStack Start | Type-Safe, Client-First, Full-Stack React Framework',
				description: 'TanStack Start is a type-safe, client-first, full-stack React framework. '
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
					<div className="flex gap-2 p-2 text-lg">
						<Link
							to="/"
							activeProps={{
								className: 'font-bold'
							}}
							activeOptions={{ exact: true }}
						>
							Home
						</Link>{' '}
						<Link
							// @ts-expect-error
							to="/this-route-does-not-exist"
							activeProps={{
								className: 'font-bold'
							}}
						>
							This Route Does Not Exist
						</Link>
					</div>
					<hr />
					{children}
					<TanStackRouterDevtools position="bottom-right" />
					<Scripts />
				</MantineProvider>
			</body>
		</html>
	);
}
