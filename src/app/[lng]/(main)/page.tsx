import { ReactNode } from 'react';
import { Box, Card, CardContent, Container, Divider, Link, List, ListItem, Typography } from '@mui/material';

import { AuthBanner } from '@/components';

import { teamMembers } from './consts';

const ContentBlock = ({ children }: { children: ReactNode }) => {
  return (
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
      {children}
    </Box>
  );
};

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
          py: 6,
        }}
      >
        <AuthBanner />

        <Box display="flex" gap={4}>
          <ContentBlock>
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
          </ContentBlock>

          <ContentBlock>
            <Typography variant="h4" gutterBottom>
              About the Project
            </Typography>
            <Typography variant="body1">
              This project is a web tool that combines functionalities of Postman and GraphiQL. It enables users to test
              and explore RESTful APIs and GraphQL endpoints with ease. Secure access is provided through authentication
              options, and users can revisit previously executed requests via the History page.
            </Typography>
          </ContentBlock>
        </Box>

        <Box mt={10}>
          <Typography variant="h3" gutterBottom>
            About the developers
          </Typography>

          <List sx={{ display: 'flex', alignItems: 'stretch', gap: 4 }}>
            {teamMembers.map(({ name, role, githubName, githubLink, description, contributions }) => (
              <ListItem key={name} sx={{ minWidth: 350, p: 0 }}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      {role}
                    </Typography>
                    <Link href={githubLink} target="_blank" rel="noopener noreferrer">
                      @{githubName}
                    </Link>
                    <Typography variant="body2" mt={2}>
                      {description}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="body1" fontWeight="bold">
                      Contributions:
                    </Typography>
                    <List>
                      {contributions.map((contribution, index) => (
                        <ListItem key={index}>
                          <Typography variant="body2">{contribution}</Typography>
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </ListItem>
            ))}
          </List>
        </Box>
      </Container>
    </Box>
  );
};

export default MainPage;
