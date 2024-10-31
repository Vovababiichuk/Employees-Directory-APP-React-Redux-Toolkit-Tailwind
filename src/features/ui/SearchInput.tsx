import { FormControl, InputAdornment, InputBase } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../../store/EmployeesSlice';
import SearchIcon from '/icons/search.svg';
import SegmentIcon from '/icons/segment.svg';

const SearchInput = () => {
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(event.target.value));
  };

  return (
    <FormControl variant="standard" sx={{ width: '100%', marginBottom: '18px' }}>
      <InputBase
        id="my-input"
        aria-describedby="my-helper-text"
        placeholder="Search by name, tag, email..."
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
          >
            <img src={SegmentIcon} alt="Segment" className="w-7 h-5" />
          </InputAdornment>
        }
        onChange={handleChange}
      />
    </FormControl>
  );
};

export default SearchInput;
