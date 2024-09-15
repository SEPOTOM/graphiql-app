import { screen } from '@testing-library/react';
import { savedRequests } from '@/tests/mocks';
import HistorySection from './HistorySection';
import { useLocalStorage } from '@/hooks';
import { Mock } from 'vitest';
import { renderWithLng } from '@/tests';

vi.mock('@/hooks', async (importOriginal) => {
  const actual: typeof import('@/hooks') = await importOriginal();
  return {
    ...actual,
    useLocalStorage: vi.fn(),
  };
});

describe('HistorySection', () => {
  it('renders a list of saved requests', () => {
    (useLocalStorage as Mock).mockReturnValue([savedRequests]);

    renderWithLng(<HistorySection />);

    expect(screen.getByText('Request History')).toBeInTheDocument();
    expect(screen.getByText('restfullClient/GET http://api/data/{}?header1=value1')).toBeInTheDocument();
    expect(
      screen.getByText('restfullClient/POST http://api/submit/{"key":"value"}?header2=value2')
    ).toBeInTheDocument();
  });

  it('renders EmptyRequestHistory when there are no saved requests', () => {
    (useLocalStorage as Mock).mockReturnValue([[]]);

    renderWithLng(<HistorySection />);

    expect(screen.getByText("You haven't executed any requests. Try:")).toBeInTheDocument();
    expect(screen.getAllByRole('link')).toHaveLength(2);
  });
});
