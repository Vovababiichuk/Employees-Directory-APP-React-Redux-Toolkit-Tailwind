import { FormControl, InputAdornment, InputBase, InputLabel } from '@mui/material';
import { useState } from 'react';
import { useURLParams } from '@/common/hooks/useURLParams';
import SortDialog from './components/SortDialog';
import SearchIcon from '/icons/search.svg';
import SegmentIcon from '/icons/segment.svg';

const SearchInput = () => {
  const [search, setSearch] = useURLParams('search', '');
  const [sort, setSort] = useURLParams('sort', 'alphabetical');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <FormControl variant="standard" sx={{ width: '100%', marginBottom: '8px' }}>
      <InputLabel
        htmlFor="search-input"
        sx={{ fontSize: '30px', fontWeight: 500, color: '#050510', marginLeft: '8px' }}
      >
        Search
      </InputLabel>
      <InputBase
        id="search-input"
        placeholder="Enter by name, tag, email..."
        value={search}
        onChange={e => setSearch(e.target.value)}
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
            onClick={() => setIsDialogOpen(true)}
          >
            <img src={SegmentIcon} alt="Segment" className="w-7 h-5" />
          </InputAdornment>
        }
      />
      <SortDialog
        dialogOpen={isDialogOpen}
        handleSortClose={() => setIsDialogOpen(false)}
        selectedOption={sort}
        handleSortOptionChange={setSort}
      />
    </FormControl>
  );
};

export default SearchInput;
