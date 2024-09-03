import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import { Mock } from 'vitest';
import * as services from '@/services/index';
import EditorRow from './EditorRow';
import { graphQLSchemaQuery, headersGraphQLSchema } from '@/utils/constants';

import userEvent from '@testing-library/user-event';
import { DataItem } from '@/contexts/GraphQLContext/types';
import { SetStateAction } from 'react';

describe('Editor row', () => {
  it('should  render editor row correctly', async () => {
    (usePathname as Mock).mockReturnValue('en/GRAPHQL/https://rickandmortyapi.com/graphql');

    render(
      <EditorRow
        addRows={function (value: SetStateAction<number[]>): void {
          throw new Error('Function not implemented.');
        }}
        rowId={0}
        data={[]}
        setData={function (value: SetStateAction<DataItem[]>): void {
          throw new Error('Function not implemented.');
        }}
      />
    );
  });
});
