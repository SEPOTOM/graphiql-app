import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { usePathname, useSearchParams } from 'next/navigation';
import { Mock } from 'vitest';
import EditorTable from './EditorTable';
import { GraphQlHeadersEditor, HeadersAndVariablesEditorRowDataItem } from '@/types';
import EditorRow from './EditorRow/EditorRow';
import { SetStateAction } from 'react';

const mockSetData = vi.fn();

describe('Editors row', () => {
  it('should render editors row', async () => {
    (usePathname as Mock).mockReturnValue('en/GRAPHQL/https://rickandmortyapi.com/graphql');
    const mockSearchParams = new URLSearchParams();
    (useSearchParams as Mock).mockReturnValue(mockSearchParams);
    render(<EditorTable heading={GraphQlHeadersEditor.HeadersEditorEN} />);

    await waitFor(() => {
      const keyInput = screen.getByPlaceholderText('KEY');
      expect(keyInput).toBeInTheDocument();

      const valueInput = screen.getByPlaceholderText('VALUE');
      expect(valueInput).toBeInTheDocument();

      const checkBox = screen.getByRole('checkbox');
      expect(checkBox).toBeInTheDocument();
    });
  });
  it('should render correct with initial params', async () => {
    (usePathname as Mock).mockReturnValue('en/GRAPHQL/https://rickandmortyapi.com/graphql');
    const mockSearchParams = new URLSearchParams('?name=John&age=30');
    (useSearchParams as Mock).mockReturnValue(mockSearchParams);
    render(<EditorTable heading={GraphQlHeadersEditor.HeadersEditorEN} />);

    await waitFor(() => {
      expect(screen.getByDisplayValue('John')).toBeInTheDocument();
      expect(screen.getByDisplayValue('30')).toBeInTheDocument();
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
