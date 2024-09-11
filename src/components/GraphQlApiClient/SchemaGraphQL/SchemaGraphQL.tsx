'use client';

import { Box, Tab, Tabs, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { SchemaTabs, SchemaTypes } from '@/types';
import { usePathname } from 'next/navigation';
import { useTranslation } from '@/hooks';
import { useGraphQl } from '@/contexts';
import SchemaGraphQlTab from './SchemaGraphQLTab/SchemaGraphQlTab';

export default function SchemaGraphQL() {
  const schemaItemsTypes = Object.values(SchemaTypes) as string[];
  let schemaItems: string[] = [];
  const { schemaGraphQL } = useGraphQl();

  useEffect(() => {
    if (schemaGraphQL !== 'Schema not found') {
      const schemaObj = JSON.parse(schemaGraphQL);
      console.log(schemaObj);
      // console.log(schemaObj.data);
      // console.log(schemaObj.data.__schema);
      // if (schemaObj.data.__schema[SchemaTypes.queryType]) {
      //   console.log(schemaObj.data.__schema[SchemaTypes.queryType].name);
      // }
      // schemaItemsTypes.forEach((item) => schemaObj.data.__schema[item].name ? schemaItems.push(schemaObj.data.__schema[item].name))
      // schemaItems = schemaItemsTypes.map((item))
      // console.log(schemaObj.data.__schema.types);
    } else {
      console.log('Schema not found');
    }
  }, [schemaGraphQL]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" width="100%" gap={1}>
      {schemaGraphQL === 'Schema not found' ?
        <Typography>Schema is not available</Typography>
      : <SchemaGraphQlTab heading="Schema" />}
    </Box>
  );
}
