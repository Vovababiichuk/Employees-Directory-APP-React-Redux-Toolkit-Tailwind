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
    const newSortOption = event.target.value;
    handleSortOptionChange(newSortOption);
    handleSortClose();
  };

  return (
    <Dialog
      open={dialogOpen}
      onClose={handleSortClose}
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: '16px',
          maxWidth: '373px',
          width: '373px',
          height: '192px',
          margin: '56px 16px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
          overflowY: 'visible',
          marginTop: '76px',
          marginLeft: '2px',
        },
        '& .MuiDialogContent-root': {
          padding: '0 24px 24px',
          overflowY: 'visible',
        },
      }}
    >
      <DialogTitle
        sx={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 'bold',
          marginBottom: '6px',
          textAlign: 'center',
          position: 'relative',
          paddingTop: '22px',
        }}
      >
        Sorting
        <IconButton onClick={handleSortClose} aria-label="close">
          <CloseIcon
            sx={{ fontSize: '1.2rem', position: 'absolute', left: '111px', top: '-3px' }}
          />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <FormControl component="fieldset">
          <RadioGroup
            value={selectedOption}
            onChange={onOptionChange}
            sx={{
              '& .MuiFormControlLabel-root': {
                marginLeft: '-18px',
              },
            }}
          >
            <FormControlLabel
              sx={{
                padding: '0px',
                marginBottom: '18px',
              }}
              value="alphabetical"
              control={<Radio sx={{ color: '#8a2be2', '&.Mui-checked': { color: '#8a2be2' } }} />}
              label="Alphabetical Order"
            />
            <FormControlLabel
              sx={{
                padding: '0px',
              }}
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
