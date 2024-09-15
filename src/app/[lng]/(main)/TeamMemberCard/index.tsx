import { Card, CardContent, Divider, Link, List, ListItem, Typography } from '@mui/material';

import { getTranslation } from '@/utils';

import { TeamMemberCardProps } from './types';

const TeamMemberCard = async ({ devTKey, githubName, githubLink, contributionsTKeys, lng }: TeamMemberCardProps) => {
  const { t } = await getTranslation(lng);

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {t(`devs.${devTKey}.name`)}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {t(`devs.${devTKey}.role`)}
        </Typography>
        <Link href={githubLink} target="_blank" rel="noopener noreferrer">
          @{githubName}
        </Link>
        <Typography variant="body2" mt={2}>
          {t(`devs.${devTKey}.description`)}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body1" fontWeight="bold">
          {t('main_page.contributions')}:
        </Typography>
        <List>
          {contributionsTKeys.map((contributionTKey, index) => (
            <ListItem key={index}>
              <Typography variant="body2">{t(`devs.${devTKey}.contributions.${contributionTKey}`)}</Typography>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default TeamMemberCard;
