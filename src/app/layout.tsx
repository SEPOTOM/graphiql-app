import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import CssBaseline from '@mui/material/CssBaseline';

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <CssBaseline />
      <html lang="en">
        <body>
          <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
        </body>
      </html>
    </>
  );
};

export default RootLayout;
