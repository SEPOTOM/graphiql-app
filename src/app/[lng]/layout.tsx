import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import CssBaseline from '@mui/material/CssBaseline';
import { dir } from 'i18next';
import './layout.scss';

import { MUIThemeProvider, Footer, Header } from '@/components';
import { AuthProvider } from '@/contexts';

import { LngParam } from '@/types';
import './layout.scss';

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
          <AuthProvider>
            <MUIThemeProvider lng={lng}>
              <Header />
              {children}
              <Footer lng={lng} />
            </MUIThemeProvider>
          </AuthProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
};

export default RootLayout;
