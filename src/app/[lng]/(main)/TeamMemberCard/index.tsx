import { Card, CardContent, Divider, Link, List, ListItem, Typography } from '@mui/material';
import { TeamMemberCardProps } from './types';

const TeamMemberCard = ({ name, role, githubName, githubLink, description, contributions }: TeamMemberCardProps) => {
  return (
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
  );
};

export default TeamMemberCard;
