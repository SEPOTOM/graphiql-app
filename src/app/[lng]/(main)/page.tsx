import { Box, Container, Link, Typography } from '@mui/material';
import { AuthBanner } from '@/components';

const MainPage = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" flexGrow={1}>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <AuthBanner />

        <Box display="flex" gap={4}>
          <Box
            sx={{
              border: '1px solid',
              borderColor: 'grey.300',
              borderRadius: '8px',
              padding: '16px',
              marginTop: '24px',
              textAlign: 'left',
              flexGrow: 1,
            }}
          >
            <Typography variant="h4" gutterBottom>
              Course Information
            </Typography>
            <Typography variant="body1">
              The React Course is designed for students with strong JavaScript, TypeScript, and frontend skills. It
              includes free online education with publicly available materials. After successfully completing the course
              and projects, students receive an electronic certificate.{' '}
              <Link href="https://rs.school/react" target="_blank" rel="noopener noreferrer">
                Learn more
              </Link>
            </Typography>
          </Box>

          <Box
            sx={{
              border: '1px solid',
              borderColor: 'grey.300',
              borderRadius: '8px',
              padding: '16px',
              marginTop: '24px',
              textAlign: 'left',
              flexGrow: 1,
            }}
          >
            <Typography variant="h4" gutterBottom>
              About the Project
            </Typography>
            <Typography variant="body1">
              This project is a web tool that combines functionalities of Postman and GraphiQL. It enables users to test
              and explore RESTful APIs and GraphQL endpoints with ease. Secure access is provided through authentication
              options, and users can revisit previously executed requests via the History page.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default MainPage;
