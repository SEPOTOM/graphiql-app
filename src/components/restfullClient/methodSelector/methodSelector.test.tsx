import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { usePathname } from 'next/navigation';
import { Mock } from 'vitest';
import * as services from '@/services';
import { Method } from '@/types/enum';
import MethodSelector from './MethodSelector';

const mockReplaceState = vi.fn();
window.history.replaceState = mockReplaceState;

describe('MethodSelector component', () => {
  it('renders correctly with the initial method selected based on the current URL', () => {
    (usePathname as Mock).mockReturnValue('/restfullClient/ru/PATCH');

    render(<MethodSelector />);

    expect(screen.getByText(Method.Patch)).toBeInTheDocument();
  });

  it('component handles cases where the pathname does not contain a method segment', () => {
    (usePathname as Mock).mockReturnValue('/restfullClient/ru');

    render(<MethodSelector />);

    expect(screen.getByText(Method.Get)).toBeInTheDocument();
  });

  it('selecting a different method updates the state and URL', async () => {
    (usePathname as Mock).mockReturnValue('/restfullClient/ru/GET');
    const mockGetNewMethodPath = vi.spyOn(services, 'getNewMethodPath');
    const newMethod = Method.Post;
    const user = userEvent.setup();

    render(<MethodSelector />);

    expect(screen.getByText(Method.Get)).toBeInTheDocument();

    user.click(screen.getByLabelText('Method'));
    await waitFor(() => {
      user.click(screen.getByText(newMethod));
    });

    await waitFor(() => {
      expect(screen.getByText(newMethod)).toBeInTheDocument();
    });
    expect(mockReplaceState).toHaveBeenCalledWith(null, '', '/restfullClient/ru/POST');
    expect(mockGetNewMethodPath).toHaveBeenCalledWith('/restfullClient/ru/GET', newMethod, Object.values(Method));
    mockGetNewMethodPath.mockRestore();
  });
});
