import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { usePathname } from 'next/navigation';
import { Mock } from 'vitest';
import * as services from '@/services';

import EndpointsForm from './EndpointsForm';
import { encodeToBase64 } from '@/services';

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
      const inputUrl = screen.getByLabelText('Endpoint URL');
      const user = userEvent.setup();
      await user.type(inputUrl, 'h');
      const encodedEndpoint = encodeToBase64('h');
      await waitFor(() => {
        expect(mockGetNewGraphQlURLPath).toHaveBeenCalledWith('en/GRAPHQL', encodedEndpoint);
      });
      const newPath = `en/GRAPHQL/${encodedEndpoint}`;
      expect(mockReplaceState).toHaveBeenCalledWith(null, '', newPath);
    });
  });
});
