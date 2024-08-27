import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import { Mock } from 'vitest';
import * as services from '@/services';
import EndpointInput from './endpointInput';

const mockReplaceState = vi.fn();
window.history.replaceState = mockReplaceState;

describe('EndpointInput component', () => {
  it('renders correctly with the initial endpoint selected based on the current URL', () => {
    (usePathname as Mock).mockReturnValue('/restfullClient/PATCH/cXdlcnR5');
    render(<EndpointInput />);
    expect(screen.getByLabelText('URL')).toHaveValue('qwerty');
  });

  it('selecting a different method updates URL', async () => {
    (usePathname as Mock).mockReturnValue('/restfullClient/GET');
    const mockGetNewURLPath = vi.spyOn(services, 'getNewURLPath');
    render(<EndpointInput />);
    const input = screen.getByLabelText('URL');
    fireEvent.change(input, { target: { value: 'newEndpoint' } });
    const encodedEndpoint = btoa('newEndpoint');
    const newPath = `/restfullClient/GET/${encodedEndpoint}`;
    expect(mockReplaceState).toHaveBeenCalledWith(null, '', newPath);
    expect(mockGetNewURLPath).toHaveBeenCalledWith('/restfullClient/GET', encodedEndpoint);
    mockGetNewURLPath.mockRestore();
  });

  it('decodes base64 encoded endpoint and displays it', () => {
    const encodedSegment = btoa('encodedEndpoint');
    (usePathname as Mock).mockReturnValue(`/restfullClient/GET/${encodedSegment}`);
    render(<EndpointInput />);
    expect(screen.getByLabelText('URL')).toHaveValue('encodedEndpoint');
  });
});
