import { render, screen, fireEvent } from '@testing-library/react';
import RequestBody from './RequestBody';
import userEvent from '@testing-library/user-event';

const user = userEvent.setup();

describe('RequestBody Component', () => {
  it('displays the RequestModeSelector when bodyType is set to "raw"', async () => {
    render(<RequestBody />);

    await user.click(screen.getByLabelText('raw request body'));

    expect(screen.getByLabelText('Reques body mode')).toBeInTheDocument();
  });
});
