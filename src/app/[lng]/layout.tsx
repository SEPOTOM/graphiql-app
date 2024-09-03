import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import CssBaseline from '@mui/material/CssBaseline';
import { dir } from 'i18next';

import { MUIThemeProvider } from '@/components';
import { AuthProvider } from '@/contexts';

import { LngParam } from '@/types';

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
          <MUIThemeProvider lng={lng}>{children}</MUIThemeProvider>
          {/* </AuthProvider> */}
        </AppRouterCacheProvider>
      </body>
    </html>
  );
};

export default RootLayout;
