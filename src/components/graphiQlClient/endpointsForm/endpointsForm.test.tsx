import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter, usePathname } from 'next/navigation';
import { Mock } from 'vitest';
import * as services from '@/services/index';
import EndpointsForm from './EndpointsForm';
import { graphQLSchemaQuery, headersGraphQLSchema } from '@/constants/constants';

const mockReplaceState = vi.fn();
window.history.replaceState = mockReplaceState;

describe('GraphQlClient component', () => {
  it('renders correctly with the initial endpoint on the current URL', () => {
    (usePathname as Mock).mockReturnValue('/GRAPHQL/aHR0cHM6Ly8=');
    render(<EndpointsForm />);

    expect(screen.getByLabelText('Endpoint URL')).toHaveValue('https://');
  });

  it('selecting another endpoint updates URL', () => {
    (usePathname as Mock).mockReturnValue('/GRAPHQL');
    const mockGetNewURLPath = vi.spyOn(services, 'getNewURLPath');
    const mockMakeGraphQLRequest = vi.spyOn(services, 'makeGraphQLRequest');

    render(<EndpointsForm />);

    const inputUrl = screen.getByLabelText('Endpoint URL');
    fireEvent.change(inputUrl, { target: { value: 'https://rickandmortyapi.com/graphql' } });

    const encodedEndpoint = btoa('https://rickandmortyapi.com/graphql');
    const newPath = `/GRAPHQL/${encodedEndpoint}`;

    expect(mockGetNewURLPath).toHaveBeenCalledWith('/GRAPHQL', encodedEndpoint);
    expect(mockReplaceState).toHaveBeenCalledWith(null, '', newPath);
    expect(mockMakeGraphQLRequest).toHaveBeenCalledWith(
      graphQLSchemaQuery,
      'https://rickandmortyapi.com/graphql',
      headersGraphQLSchema
    );
  });

  it('selecting another SDL endpoint gets schema', () => {
    (usePathname as Mock).mockReturnValue('/GRAPHQL');
    const mockMakeGraphQLRequest = vi.spyOn(services, 'makeGraphQLRequest');

    render(<EndpointsForm />);

    const inputSdl = screen.getByLabelText('SDL URL');
    fireEvent.change(inputSdl, { target: { value: 'https://rickandmortyapi.com/graphql' } });

    expect(mockMakeGraphQLRequest).toHaveBeenCalledWith(
      graphQLSchemaQuery,
      'https://rickandmortyapi.com/graphql',
      headersGraphQLSchema
    );
  });

  it('decodes base64 encoded endpoint and displays it', () => {
    const encodedSegment = btoa('https://');
    (usePathname as Mock).mockReturnValue(`/GRAPHQL/${encodedSegment}`);
    render(<EndpointsForm />);
    expect(screen.getByLabelText('Endpoint URL')).toHaveValue('https://');
  });
});
