import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import React from 'react';

type SortDialogType = {
  dialogOpen: boolean;
  handleSortClose: () => void;
  selectedOption: string;
  handleSortOptionChange: (value: string) => void;
};

const SortDialog = ({
  dialogOpen,
  handleSortClose,
  selectedOption,
  handleSortOptionChange,
}: SortDialogType) => {
  const onOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleSortOptionChange(event.target.value);
    handleSortClose();
  };

  return (
    <Dialog
      open={dialogOpen}
      onClose={handleSortClose}
      sx={{
        '& .MuiPaper-root': {
          borderRadius: 4,
          padding: '6px',
          maxWidth: '500px',
          width: '300px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: 'Inter, sans-serif',
          fontWeight: 'bold',
        }}
      >
        Sorting
        <IconButton onClick={handleSortClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <FormControl component="fieldset">
          <RadioGroup value={selectedOption} onChange={onOptionChange}>
            <FormControlLabel
              value="alphabetical"
              control={<Radio sx={{ color: '#8a2be2', '&.Mui-checked': { color: '#8a2be2' } }} />}
              label="Alphabetical Order"
            />
            <FormControlLabel
              value="birthdate"
              control={<Radio sx={{ color: '#8a2be2', '&.Mui-checked': { color: '#8a2be2' } }} />}
              label="Birthdate Order"
            />
          </RadioGroup>
        </FormControl>
      </DialogContent>
    </Dialog>
  );
};

export default SortDialog;
