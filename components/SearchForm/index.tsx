import { useState } from 'react';
import { StyledButton, StyledForm, StyledInput, StyledSelect } from './styles';
import {useSearchParams} from "next/navigation";

export type OnSearchPayload = {
  term: string;
  status: 'OPEN' | 'CLOSED';
}

type SearchFormProps = {
  onSearch: (payload: OnSearchPayload) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get('query');
  const statusParam = searchParams.get('status');
  const properStatusParam = statusParam === 'OPEN' || statusParam === 'CLOSED' ? statusParam : 'OPEN';

  const [term, setTerm] = useState(queryParam || '');
  const [status, setStatus] = useState<'OPEN' | 'CLOSED'>(properStatusParam);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ term, status });
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledInput
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Search term"
        data-testid="search-input"
        required
        minLength={3}
      />
      <StyledSelect data-testid="status-select" value={status} onChange={(e) => setStatus(e.target.value as 'OPEN' | 'CLOSED')}>
        <option value="OPEN" data-testid="status-select-item-open">Open</option>
        <option value="CLOSED" data-testid="status-select-item-closed">Closed</option>
      </StyledSelect>
      <StyledButton type="submit" data-testid="search-button">Search</StyledButton>
    </StyledForm>
  );
};

export default SearchForm;
