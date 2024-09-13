import { Box, Container, Link, List, ListItem, Typography } from '@mui/material';

import { AuthBanner } from '@/components';
import { getTranslation, reactCourseUrl } from '@/utils';
import { LngParam } from '@/types';

import ContentBlock from './ContentBlock';
import TeamMemberCard from './TeamMemberCard';
import { teamMembers } from './consts';

const MainPage = async ({ params }: { params: LngParam }) => {
  const { lng } = params;
  const { t } = await getTranslation(lng);

  console.log(t('main_page.course_title'));

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
              {t('main_page.course_title')}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {t('main_page.course_info')}
            </Typography>
            <Link href={reactCourseUrl} target="_blank" rel="noopener noreferrer">
              {t('main_page.course_link')}
            </Link>
          </ContentBlock>

          <ContentBlock>
            <Typography variant="h4" gutterBottom>
              {t('main_page.project_title')}
            </Typography>
            <Typography variant="body1">{t('main_page.project_info')}</Typography>
          </ContentBlock>
        </Box>

        <Box mt={10}>
          <Typography variant="h3" gutterBottom>
            {t('main_page.devs_title')}
          </Typography>

          <List sx={{ display: 'flex', alignItems: 'stretch', gap: 4 }}>
            {teamMembers.map((teamMember) => (
              <ListItem key={teamMember.devTKey} sx={{ minWidth: 350, p: 0 }}>
                <TeamMemberCard {...teamMember} lng={lng} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Container>
    </Box>
  );
};

export default MainPage;
