import { useState } from 'react';
import { StyledButton, StyledForm, StyledInput, StyledSelect } from './styles';

interface SearchFormProps {
  onSearch: (query: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [term, setTerm] = useState('');
  const [status, setStatus] = useState('OPEN');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(`repo:facebook/react is:issue is:${status.toLowerCase()} ${term}`);
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
      <StyledSelect data-testid="status-select" value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="OPEN" data-testid="status-select-item-open">Open</option>
        <option value="CLOSED" data-testid="status-select-item-closed">Closed</option>
      </StyledSelect>
      <StyledButton type="submit" data-testid="search-button">Search</StyledButton>
    </StyledForm>
  );
};

export default SearchForm;
