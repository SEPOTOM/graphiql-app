'use client';

import { Box, Tab, Tabs, Typography } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import { GraphQlSchemaTypesItem } from '@/types';
import { useGraphQl } from '@/contexts';
import SchemaGraphQLTabPanel from '../SchemaGraphQLTabPanel/SchemaGraphQLTabPanel';

interface SchemaGraphQlTabProps {
  heading: string;
}

export default function SchemaGraphQlTab({ heading }: SchemaGraphQlTabProps) {
  const { schemaGraphQL } = useGraphQl();
  const schemaObj = JSON.parse(schemaGraphQL);
  const schemaTypesArr: GraphQlSchemaTypesItem[] = schemaObj.data.__schema.types;
  const tabItems = schemaTypesArr.filter((item) => !item.name.includes('__'));

  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="flex-start" width="100%" gap={1} paddingLeft={2}>
      <Typography variant="h6">{heading}</Typography>
      <Box display="flex" width="100%" gap={2}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} orientation="vertical" onChange={handleChange}>
            {tabItems.map((tab) => (
              <Tab sx={{ textTransform: 'none' }} key={tab.name} label={tab.name} />
            ))}
          </Tabs>
        </Box>
        {tabItems.map((tab, index) => (
          <SchemaGraphQLTabPanel
            key={`${tab.name}-${index}`}
            value={value}
            index={index}
            content={tab.name}
            description={tab.description}
          />
        ))}
      </Box>
    </Box>
  );
}
