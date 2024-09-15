import { screen } from '@testing-library/react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Mock } from 'vitest';
import EndpointInput from './EndpointInput';
import { encodeToBase64 } from '@/services';
import { renderWithLng, renderWithUserAndLng } from '@/tests';

const mockReplaceState = vi.fn();
window.history.replaceState = mockReplaceState;

describe('EndpointInput component', () => {
  it('renders correctly with the initial endpoint selected based on the current URL', () => {
    (usePathname as Mock).mockReturnValue('/en/PATCH/cXdlcnR5');

    renderWithLng(<EndpointInput />);

    expect(screen.getByLabelText('URL')).toHaveValue('qwerty');
  });

  it('updates URL when a new endpoint is entered', async () => {
    (usePathname as Mock).mockReturnValue('/en/GET');
    (useSearchParams as Mock).mockReturnValue(new URLSearchParams());

    const { user } = renderWithUserAndLng(<EndpointInput />);

    const input = screen.getByLabelText('URL');
    const endpoint = 'newEndpoint';

    await user.type(input, endpoint);

    endpoint.split('').forEach((letter) => {
      const encodedEndpoint = encodeToBase64(letter);
      const newPath = `/en/GET/${encodedEndpoint}?`;
      expect(mockReplaceState).toHaveBeenCalledWith(null, '', newPath);
    });
  });

  it('decodes base64 encoded endpoint and displays it', () => {
    const encodedSegment = btoa('encodedEndpoint');
    (usePathname as Mock).mockReturnValue(`/en/GET/${encodedSegment}`);

    renderWithLng(<EndpointInput />);

    expect(screen.getByLabelText('URL')).toHaveValue('encodedEndpoint');
  });
});
