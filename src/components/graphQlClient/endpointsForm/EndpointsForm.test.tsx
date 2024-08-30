import { render, screen, waitFor } from '@testing-library/react';
import { usePathname, useRouter } from 'next/navigation';
import { Mock } from 'vitest';
import * as services from '@/services/index';
import EndpointsForm from './EndpointsForm';
import { graphQLSchemaQuery, headersGraphQLSchema } from '@/utils/constants/constants';
import userEvent from '@testing-library/user-event';

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
    const mockGetNewGraphQlURLPath = vi.spyOn(services, 'getNewGraphQlURLPath');
    const mockMakeGraphQLRequest = vi.spyOn(services, 'makeGraphQLRequest');

    render(<EndpointsForm />);

    const inputUrl = screen.getByLabelText('Endpoint URL');
    await userEvent.type(inputUrl, 'h');

    const encodedEndpoint = btoa('h');
    const newPath = `en/GRAPHQL/${encodedEndpoint}`;

    expect(mockGetNewGraphQlURLPath).toHaveBeenCalledWith('en/GRAPHQL', encodedEndpoint);
    expect(mockReplaceState).toHaveBeenCalledWith(null, '', newPath);
    expect(mockMakeGraphQLRequest).toHaveBeenCalledWith(graphQLSchemaQuery, 'h', headersGraphQLSchema);
  });

  it('selecting another SDL endpoint gets schema', async () => {
    (usePathname as Mock).mockReturnValue('/GRAPHQL');
    const mockMakeGraphQLRequest = vi.spyOn(services, 'makeGraphQLRequest');

    render(<EndpointsForm />);

    const inputSdl = screen.getByLabelText('SDL URL');
    await userEvent.type(inputSdl, 'h');

    expect(mockMakeGraphQLRequest).toHaveBeenCalledWith(graphQLSchemaQuery, 'h', headersGraphQLSchema);
  });
});
