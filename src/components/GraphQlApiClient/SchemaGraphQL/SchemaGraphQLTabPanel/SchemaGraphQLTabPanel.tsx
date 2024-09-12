'use client';

import { useGraphQl } from '@/contexts';
import { GraphQlSchemaTypesItem } from '@/types';
import { Box, Divider, List, ListItem, ListItemText, Typography } from '@mui/material';

interface SchemaGraphQLTabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  content: string;
  description: string;
}

export default function SchemaGraphQLTabPanel({
  children,
  value,
  index,
  content,
  description,
  ...other
}: SchemaGraphQLTabPanelProps) {
  const { schemaGraphQL } = useGraphQl();
  const schemaObj = JSON.parse(schemaGraphQL);
  const schemaTypesArr: GraphQlSchemaTypesItem[] = schemaObj.data.__schema.types;
  const currentTabItem = schemaTypesArr.filter((item) => !item.name.includes('__'))[index];
  const currentTabItemField = currentTabItem.fields || currentTabItem.inputFields;

  return (
    <Box
      width="100%"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box display="flex" flexDirection="column" width="100%">
        <Typography variant="h6">{content}</Typography>
        <Divider />
        <Typography>{description}</Typography>
      </Box>
      <List>
        {currentTabItemField ?
          currentTabItemField.map((item) => (
            <ListItem key={item.name} alignItems="flex-start">
              <ListItemText
                primary={
                  <>
                    <Typography component="span" variant="body2" sx={{ color: 'text.primary', display: 'inline' }}>
                      {`${item.name}: `}
                    </Typography>
                    <Typography component="span" variant="body2" sx={{ color: 'text.', display: 'inline' }}>
                      {item.type.name}
                    </Typography>
                  </>
                }
                secondary={item.description}
              />
            </ListItem>
          ))
        : <></>}
      </List>
    </Box>
  );
}
