import { FormControl, InputAdornment, InputBase, InputLabel } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SortDialog from './components/SortDialog';
import SearchIcon from '/icons/search.svg';
import SegmentIcon from '/icons/segment.svg';

const SearchInput = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(() => {
    const params = new URLSearchParams(location.search);
    return params.get('search') || '';
  });
  const [selectedSortOption, setSelectedSortOption] = useState(() => {
    const params = new URLSearchParams(location.search);
    return params.get('sort') || 'alphabetical';
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchQuery(params.get('search') || '');
    setSelectedSortOption(params.get('sort') || 'alphabetical');
  }, [location.search]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setSearchQuery(newQuery);

    const params = new URLSearchParams(location.search);
    if (newQuery) {
      params.set('search', newQuery);
    } else {
      params.delete('search');
    }
    navigate({ search: params.toString() }, { replace: true });
  };

  const handleSortClick = () => {
    setDialogOpen(true);
  };

  const handleSortClose = () => {
    setDialogOpen(false);
  };

  const handleSortOptionChange = (value: string) => {
    setSelectedSortOption(value);
    const params = new URLSearchParams(location.search);
    params.set('sort', value);
    navigate({ search: params.toString() }, { replace: true });
  };

  return (
    <FormControl variant="standard" sx={{ width: '100%', marginBottom: '8px' }}>
      <InputLabel
        htmlFor="search-input"
        sx={{ fontSize: '30px', fontWeight: 500, color: '#050510', marginLeft: '8px' }}
      >
        Search
      </InputLabel>
      <InputBase
        id="my-input"
        aria-describedby="my-helper-text"
        placeholder="Enter by name, tag, email..."
        value={searchQuery}
        onChange={handleChange}
        sx={{
          mt: '43px',
          py: '6px',
          px: '12px',
          borderRadius: '16px',
          backgroundColor: '#f7f7f8',
          fontSize: '15px',
        }}
        startAdornment={
          <InputAdornment position="start">
            <img src={SearchIcon} alt="Search" className="w-6 h-5" />
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment
            position="end"
            className="cursor-pointer transition-transform duration-300 hover:scale-110"
            onClick={handleSortClick}
          >
            <img src={SegmentIcon} alt="Segment" className="w-7 h-5" />
          </InputAdornment>
        }
      />
      <SortDialog
        dialogOpen={dialogOpen}
        handleSortClose={handleSortClose}
        selectedOption={selectedSortOption}
        handleSortOptionChange={handleSortOptionChange}
      />
    </FormControl>
  );
};

export default SearchInput;
