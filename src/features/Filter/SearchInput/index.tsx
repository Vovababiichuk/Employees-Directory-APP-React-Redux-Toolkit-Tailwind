import { FormControl, InputAdornment, InputBase } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, setSortOption } from '@/common/store/EmployeesSlice';
import { AppDispatch, RootState } from '@/common/store/store';
import { SortOptions } from '@/common/utils/utils';
import SortDialog from './components/SortDialog';
import SearchIcon from '/icons/search.svg';
import SegmentIcon from '/icons/segment.svg';

const SearchInput = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { searchQuery, sortOption } = useSelector((state: RootState) => state.employees);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<'alphabetical' | 'birthdate'>(sortOption);

  useEffect(() => {
    const savedSearchQuery = localStorage.getItem('searchQuery');
    if (savedSearchQuery) {
      dispatch(setSearchQuery(savedSearchQuery));
    }
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    dispatch(setSearchQuery(searchValue));
    localStorage.setItem('searchQuery', searchValue);

    const url = new URL(window.location.href);
    if (searchValue) {
      url.searchParams.set('search', searchValue);
    } else {
      url.searchParams.delete('search');
    }
    window.history.pushState({}, '', url);
  };

  const handleSortClick = () => {
    setDialogOpen(true);
  };

  const handleSortClose = () => {
    setDialogOpen(false);
  };

  const handleSortOptionChange = (value: SortOptions) => {
    setSelectedOption(value);
    dispatch(setSortOption(value));
  };

  return (
    <FormControl variant="standard" sx={{ width: '100%', marginBottom: '18px' }}>
      <InputBase
        id="my-input"
        aria-describedby="my-helper-text"
        placeholder="Search by name, tag, email..."
        value={searchQuery}
        onChange={handleChange}
        sx={{
          py: '8px',
          px: '12px',
          borderRadius: '16px',
          backgroundColor: '#f7f7f8',
        }}
        startAdornment={
          <InputAdornment position="start">
            <img src={SearchIcon} alt="Search" className="w-7 h-6" />
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
        selectedOption={selectedOption}
        handleSortOptionChange={value => handleSortOptionChange(value as SortOptions)}
      />
    </FormControl>
  );
};

export default SearchInput;
