import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import CssBaseline from '@mui/material/CssBaseline';
import { dir } from 'i18next';
import './layout.scss';

import { MUIThemeProvider, Footer, Header } from '@/components';
import { AuthProvider, LanguageProvider } from '@/contexts';

import { LngParam } from '@/types';
import './layout.scss';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rest & GraphQL App',
  description: 'Rest and GraphQL App',
  icons: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      sizes: '32x32',
      url: '/logo.svg',
    },
  ],
};

const RootLayout = ({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: LngParam;
}>) => {
  const { lng } = params;

  return (
    <html lang={lng} dir={dir(lng)}>
      <body>
        <CssBaseline />
        <AppRouterCacheProvider>
          {/* <AuthProvider> */}
          <MUIThemeProvider lng={lng}>
            <LanguageProvider lang={lng}>
              <Header lng={lng} />
              {children}
              <Footer lng={lng} />
            </LanguageProvider>
          </MUIThemeProvider>
          {/* </AuthProvider> */}
        </AppRouterCacheProvider>
      </body>
    </html>
  );
};

export default RootLayout;
