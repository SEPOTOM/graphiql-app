import { render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import { Mock } from 'vitest';
import * as services from '@/services/index';
import EndpointsForm from './EndpointsForm';
import { graphQLSchemaQuery, headersGraphQLSchema } from '@/constants/constants';
import userEvent from '@testing-library/user-event';

const mockReplaceState = vi.fn();
window.history.replaceState = mockReplaceState;

describe('GraphQlClient component', () => {
  it('renders correctly with the initial endpoint on the current URL', () => {
    (usePathname as Mock).mockReturnValue('/GRAPHQL/aHR0cHM6Ly8=');
    render(<EndpointsForm />);

    expect(screen.getByLabelText('Endpoint URL')).toHaveValue('https://');
  });

  it('selecting another endpoint updates URL', async () => {
    (usePathname as Mock).mockReturnValue('/GRAPHQL');
    const mockGetNewURLPath = vi.spyOn(services, 'getNewURLPath');
    const mockMakeGraphQLRequest = vi.spyOn(services, 'makeGraphQLRequest');

    render(<EndpointsForm />);

    const inputUrl = screen.getByLabelText('Endpoint URL');
    await userEvent.type(inputUrl, 'h');

    const encodedEndpoint = btoa('h');
    const newPath = `/GRAPHQL/${encodedEndpoint}`;

    expect(mockGetNewURLPath).toHaveBeenCalledWith('/GRAPHQL', encodedEndpoint);
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

  it('decodes base64 encoded endpoint and displays it', () => {
    const encodedSegment = btoa('https://');
    (usePathname as Mock).mockReturnValue(`/GRAPHQL/${encodedSegment}`);
    render(<EndpointsForm />);
    expect(screen.getByLabelText('Endpoint URL')).toHaveValue('https://');
  });
});
