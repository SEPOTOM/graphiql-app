import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import { Mock } from 'vitest';
import * as services from '@/services/index';

import { graphQLSchemaQuery, headersGraphQLSchema } from '@/utils/constants';

import { server } from '@/tests/mocks/server';
import userEvent from '@testing-library/user-event';
import EndpointsForm from './EndpointsForm';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const mockReplaceState = vi.fn();
window.history.replaceState = mockReplaceState;

describe('GraphQl endpoints form', () => {
  it('should  render form correctly', async () => {
    (usePathname as Mock).mockReturnValue('en/GRAPHQL');

    render(<EndpointsForm />);
    await waitFor(() => {
      expect(screen.getByLabelText('Endpoint URL')).toHaveValue('');
    });
  });

  it('selecting another endpoint updates URL', async () => {
    (usePathname as Mock).mockReturnValue('en/GRAPHQL');

    render(<EndpointsForm />);

    await waitFor(async () => {
      const mockGetNewGraphQlURLPath = vi.spyOn(services, 'getNewGraphQlURLPath');
      const mockMakeGraphQLRequest = vi.spyOn(services, 'makeGraphQLRequest');
      const inputUrl = screen.getByLabelText('Endpoint URL');
      fireEvent.change(inputUrl, { target: { value: 'h' } });

      const encodedEndpoint = btoa('h');
      const newPath = `en/GRAPHQL/${encodedEndpoint}`;
      await waitFor(() => {
        expect(mockGetNewGraphQlURLPath).toHaveBeenCalledWith('en/GRAPHQL', encodedEndpoint);
      });
      expect(mockReplaceState).toHaveBeenCalledWith(
        {
          as: newPath,
          url: newPath,
        },
        '',
        newPath
      );
      expect(mockMakeGraphQLRequest).toHaveBeenCalledWith(graphQLSchemaQuery, 'h', headersGraphQLSchema);
    });
  });

  it('selecting another SDL endpoint gets schema', async () => {
    (usePathname as Mock).mockReturnValue('en/GRAPHQL');

    render(<EndpointsForm />);

    await waitFor(() => {
      const mockMakeGraphQLRequest = vi.spyOn(services, 'makeGraphQLRequest');
      const inputSdl = screen.getByLabelText('SDL URL');
      fireEvent.change(inputSdl, { target: { value: 'https://rickandmortyapi.com/graphql' } });
      expect(mockMakeGraphQLRequest).toHaveBeenCalledWith(
        graphQLSchemaQuery,
        'https://rickandmortyapi.com/graphql',
        headersGraphQLSchema
      );
    });
  });
});
