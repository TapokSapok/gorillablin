import type { Metadata } from 'next';
import { Montserrat, Raleway } from 'next/font/google';
import './globals.scss';
import Header from '@/components/features/header/Header';
import { Toaster } from 'sonner';
import { Providers, profileContext } from './providers';
import { Snowfall } from 'react-snowfall';
import SnowFall from '@/components/features/snowfall/SnowFall';
import PageTransition from './transition';

// const inter = Montserrat({ subsets: ['latin'], weight: '400' });
const inter = Raleway({ subsets: ['latin'], weight: ['100', '200', '300', '400', '400', '500', '600', '700', '800'] });

export const metadata: Metadata = {
	title: 'GORILLABLIN',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<Providers>
					<Header />
					<main className='main'>{children}</main>
					<Toaster richColors />
				</Providers>
			</body>
		</html>
	);
}
