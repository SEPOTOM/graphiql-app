import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { usePathname } from 'next/navigation';
import { Mock } from 'vitest';
import * as services from '@/services';
import EndpointInput from './EndpointInput';

const mockReplaceState = vi.fn();
window.history.replaceState = mockReplaceState;

describe('EndpointInput component', () => {
  it('renders correctly with the initial endpoint selected based on the current URL', () => {
    (usePathname as Mock).mockReturnValue('/restfullClient/ru/PATCH/cXdlcnR5');

    render(<EndpointInput />);

    expect(screen.getByLabelText('URL')).toHaveValue('qwerty');
  });

  it('updates URL when a new endpoint is entered', async () => {
    (usePathname as Mock).mockReturnValue('/restfullClient/ru/GET');
    const mockGetNewURLPath = vi.spyOn(services, 'getNewURLPath');
    const user = userEvent.setup();

    render(<EndpointInput />);

    const input = screen.getByLabelText('URL');
    const endpoint = 'newEndpoint';
    await user.type(input, endpoint);

    endpoint.split('').forEach((letter) => {
      const encodedEndpoint = btoa(letter);
      const newPath = `/restfullClient/ru/GET/${encodedEndpoint}`;
      expect(mockReplaceState).toHaveBeenCalledWith(null, '', newPath);
      expect(mockGetNewURLPath).toHaveBeenCalledWith('/restfullClient/ru/GET', encodedEndpoint);
    });

    mockGetNewURLPath.mockRestore();
  });

  it('decodes base64 encoded endpoint and displays it', () => {
    const encodedSegment = btoa('encodedEndpoint');
    (usePathname as Mock).mockReturnValue(`/restfullClient/ru/GET/${encodedSegment}`);

    render(<EndpointInput />);

    expect(screen.getByLabelText('URL')).toHaveValue('encodedEndpoint');
  });
});
