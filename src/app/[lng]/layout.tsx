import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import CssBaseline from '@mui/material/CssBaseline';
import { dir } from 'i18next';

import { MUIThemeProvider } from '@/components';

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
          <MUIThemeProvider lng={lng}>{children}</MUIThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
};

export default RootLayout;
