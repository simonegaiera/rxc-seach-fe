import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

// Generate an array of numbers from 1 to 10,000
const facilities = Array.from({ length: 10000 }, (_, i) => i + 1);

export default function AutocompleteFacilities({ value, onSelect }) {
  return (
    <Box sx={{ width: 300, mr: 2  }}>
      <Autocomplete
        options={facilities}
        getOptionLabel={(option) => option.toString()}
        value={value}
        renderInput={(params) => <TextField {...params} label="Facility" variant="outlined" />}
        onChange={(event, newValue) => {
          onSelect(newValue);
        }}
      />
    </Box>
  );
}
