import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import MethodSelector from './methodSelector';
import { usePathname } from 'next/navigation';
import { Mock } from 'vitest';
import * as services from '@/services';
import { Method } from '@/types/enum';

const mockReplaceState = vi.fn();
window.history.replaceState = mockReplaceState;

describe('MethodSelector component', () => {
  it('renders correctly with the initial method selected based on the current URL', () => {
    (usePathname as Mock).mockReturnValue('/restfullClient/PATCH');
    render(<MethodSelector />);
    expect(screen.getByText(Method.Patch)).toBeInTheDocument();
  });

  it('component handles cases where the pathname does not contain a method segment', () => {
    (usePathname as Mock).mockReturnValue('/restfullClient');
    render(<MethodSelector />);
    expect(screen.getByText(Method.Get)).toBeInTheDocument();
  });

  it('selecting a different method updates the state and URL', async () => {
    (usePathname as Mock).mockReturnValue('/restfullClient/GET');
    const mockGetNewMethodPath = vi.spyOn(services, 'getNewMethodPath');
    const newMethod = Method.Post;
    render(<MethodSelector />);
    expect(screen.getByText(Method.Get)).toBeInTheDocument();
    fireEvent.mouseDown(screen.getByLabelText('Method'));
    fireEvent.click(screen.getByText(newMethod));
    await waitFor(() => {
      expect(screen.getByText(newMethod)).toBeInTheDocument();
    });
    expect(mockReplaceState).toHaveBeenCalledWith(null, '', '/restfullClient/POST');
    expect(mockGetNewMethodPath).toHaveBeenCalledWith('/restfullClient/GET', newMethod, Object.values(Method));
    mockGetNewMethodPath.mockRestore();
  });
});
