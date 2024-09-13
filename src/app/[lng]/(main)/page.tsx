import { Box, Container, Link, List, ListItem, Typography } from '@mui/material';

import { AuthBanner } from '@/components';
import { reactCourseUrl } from '@/utils';

import ContentBlock from './ContentBlock';
import TeamMemberCard from './TeamMemberCard';
import { teamMembers } from './consts';

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
            <Typography variant="body1" gutterBottom>
              The React Course is designed for students with strong JavaScript, TypeScript, and frontend skills. It
              includes free online education with publicly available materials. After successfully completing the course
              and projects, students receive an electronic certificate.
            </Typography>
            <Link href={reactCourseUrl} target="_blank" rel="noopener noreferrer">
              Learn more
            </Link>
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
            {teamMembers.map((teamMember) => (
              <ListItem key={teamMember.name} sx={{ minWidth: 350, p: 0 }}>
                <TeamMemberCard {...teamMember} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Container>
    </Box>
  );
};

export default MainPage;
