import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputAdornment,
  InputBase,
  Radio,
  RadioGroup,
} from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchQuery, setSortOption } from '@/store/EmployeesSlice';
import SearchIcon from '/icons/search.svg';
import SegmentIcon from '/icons/segment.svg';

const SearchInput = () => {
  const dispatch = useDispatch();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<'alphabetical' | 'birthdate'>(
    'alphabetical',
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleSortClick = () => {
    setDialogOpen(true);
  };

  const handleSortClose = () => {
    setDialogOpen(false);
  };

  const handleSortOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value as 'alphabetical' | 'birthdate');
  };

  const handleSortConfirm = () => {
    dispatch(setSortOption(selectedOption));
    handleSortClose();
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
            onClick={handleSortClick}
          >
            <img src={SegmentIcon} alt="Segment" className="w-7 h-5" />
          </InputAdornment>
        }
        onChange={handleChange}
      />

      <Dialog open={dialogOpen} onClose={handleSortClose}>
        <DialogTitle>Sort Options</DialogTitle>
        <DialogContent>
          <RadioGroup value={selectedOption} onChange={handleSortOptionChange}>
            <FormControlLabel
              value="alphabetical"
              control={<Radio />}
              label="Sort by Alphabetical"
            />
            <FormControlLabel value="birthdate" control={<Radio />} label="Sort by Birthdate" />
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSortClose}>Cancel</Button>
          <Button onClick={handleSortConfirm} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </FormControl>
  );
};

export default SearchInput;
