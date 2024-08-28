import Image from 'next/image';
import { Box, Container, Link, List, ListItem, Typography } from '@mui/material';
import { GitHub as GitHubIcon } from '@mui/icons-material';

import { authors } from '@/components/Footer/consts';

const Footer = () => {
  return (
    <Box component="footer" sx={{ borderTop: '1px solid black' }}>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: {
            xs: 'flex-start',
            sm: 'center',
          },
          padding: 2,
        }}
      >
        <List
          sx={{
            display: 'flex',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            gap: 2,
          }}
        >
          {authors.map((author, index) => (
            <ListItem key={index} sx={{ width: 'auto', padding: 0 }}>
              <Link
                component="a"
                href={author.github}
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
                aria-label={`GitHub profile of ${author.name}`}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: 1,
                }}
              >
                <GitHubIcon />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  {author.name}
                </Typography>
              </Link>
            </ListItem>
          ))}
        </List>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="body1">©2024</Typography>

          <Link href="https://rs.school/courses/reactjs" target="_blank" rel="noopener noreferrer">
            <Image src="/rss-logo.svg" alt="RSSchool logo" width={50} height={50} />
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
