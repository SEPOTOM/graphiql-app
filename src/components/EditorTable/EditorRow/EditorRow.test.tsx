import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { usePathname } from 'next/navigation';
import { Mock } from 'vitest';
import EditorRow from './EditorRow';

const mockSetData = vi.fn();

describe('Editors row', () => {
  it('should render editors row', async () => {
    (usePathname as Mock).mockReturnValue('en/GRAPHQL/https://rickandmortyapi.com/graphql');
    render(<EditorRow rowId={0} currentEditorData={[]} setCurrentEditorData={mockSetData} />);

    await waitFor(() => {
      const keyInput = screen.getByPlaceholderText('KEY');
      expect(keyInput).toBeInTheDocument();

      const valueInput = screen.getByPlaceholderText('VALUE');
      expect(valueInput).toBeInTheDocument();

      const checkBox = screen.getByRole('checkbox');
      expect(checkBox).toBeInTheDocument();
    });
  });

  it('Inputs should be worked good', async () => {
    (usePathname as Mock).mockReturnValue('en/GRAPHQL/https://rickandmortyapi.com/graphql');
    render(<EditorRow rowId={0} currentEditorData={[]} setCurrentEditorData={mockSetData} />);
    await waitFor(async () => {
      const user = userEvent.setup();
      const keyInput = screen.getByPlaceholderText('KEY');
      await user.type(keyInput, 'h');
      await waitFor(async () => {
        expect(mockSetData).toHaveBeenCalled();
      });
      const valueInput = screen.getByPlaceholderText('VALUE');
      await user.type(valueInput, 'h');
      await waitFor(async () => {
        expect(mockSetData).toHaveBeenCalled();
      });
    });
  });

  it('Checkbox should be worked good', async () => {
    (usePathname as Mock).mockReturnValue('en/GRAPHQL/https://rickandmortyapi.com/graphql');
    render(<EditorRow rowId={0} currentEditorData={[]} setCurrentEditorData={mockSetData} />);
    await waitFor(async () => {
      const user = userEvent.setup();
      const checkBox = screen.getByRole('checkbox');
      await user.click(checkBox);
      await waitFor(async () => {
        expect(mockSetData).toHaveBeenCalled();
      });
    });
  });
});
