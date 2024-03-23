'use client';

import { userService } from '@/services/user.service';
import { IProfileContext, IUser } from '@/types/user.types';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PropsWithChildren, useEffect, useState } from 'react';
import { createContext } from 'react';

export const profileContext = createContext<IProfileContext>({ profile: null, setProfile: () => {} });

export function Providers({ children }: PropsWithChildren) {
	const [profile, setProfile] = useState<IUser | null>(null);

	const [client] = useState(
		new QueryClient({
			defaultOptions: {
				queries: {
					refetchOnWindowFocus: false,
				},
			},
		})
	);
	return (
		<QueryClientProvider client={client}>
			<profileContext.Provider value={{ profile, setProfile }}>{children}</profileContext.Provider>
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}
