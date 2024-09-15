import { screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import { Mock } from 'vitest';
import { ResponseSection } from '@/components';
import mockRequestData from '@/tests/mocks/responseData';
import { renderWithLng } from '@/tests';

describe('ResponseSection component', () => {
  it('renders the component correctly with given props', () => {
    (usePathname as Mock).mockReturnValue('/restfullClient/');

    renderWithLng(
      <ResponseSection responseBody={JSON.stringify(mockRequestData)} responseCode={200} responseStatus={'ok'} />
    );

    expect(screen.getByText('Status: 200 ok')).toBeInTheDocument();
  });
});
