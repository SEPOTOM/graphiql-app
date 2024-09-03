import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { usePathname } from 'next/navigation';
import { Mock } from 'vitest';
import * as services from '@/services/index';

import { graphQLSchemaQuery, headersGraphQLSchema } from '@/utils/constants';

import EndpointsForm from './EndpointsForm';

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
      const user = userEvent.setup();
      await user.type(inputUrl, 'h');
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
    (usePathname as Mock).mockReturnValue('en/GRAPHQL/h');

    render(<EndpointsForm />);

    await waitFor(async () => {
      const mockMakeGraphQLRequest = vi.spyOn(services, 'makeGraphQLRequest');
      const inputSdl = screen.getByLabelText('SDL URL');
      const user = userEvent.setup();
      await user.type(inputSdl, 'h');
      expect(mockMakeGraphQLRequest).toHaveBeenCalledWith(graphQLSchemaQuery, 'h', headersGraphQLSchema);
    });
  });
});
