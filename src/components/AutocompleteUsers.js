'use client';

import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const AutocompleteUsers = ({ onChange }) => {
  const [options, setOptions] = useState([]);

  const fetchData = async (query) => {
    try {
      if (query.length > 0) {
        const response = await fetch(`http://localhost:8080/search/autocomplete/${query}/100`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();

        const processSection = (section, sectionName) => {
          return section.map(item => ({
            label: `${item.first_name} ${item.last_name}`,
            first_name: item.first_name,
            last_name: item.last_name,
            value: item._id,
            section: sectionName,
            searchHighlights: item.searchHighlights
          }));
        };

        const prescribers = processSection(data.prescribers, "Prescribers");
        const patients = processSection(data.patients, "Patients");

        const output = [...prescribers, ...patients];

        setOptions(output);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = (event, value) => {
    if (value) {
      fetchData(value);
      onChange(value);
    }
  };

  const getCustomStyle = (valueToCheck, highlights) => {
    let isBold = false
    if (highlights.length > 0) {
      isBold = highlights.some(highlight => highlight.path === valueToCheck);
    }

    return {
      fontWeight: isBold ? 'bold' : 'normal',
    };
  };

  return (
    <Box sx={{ width: 300}}>
    <Autocomplete
      options={options}
      groupBy={(option) => option.section}
      onInputChange={handleInputChange}
      renderInput={(params) => <TextField {...params} label="Users" variant="outlined" />}
      renderOption={(props, option) => {
        return (
          <li {...props}>
            <span style={getCustomStyle('first_name', option.searchHighlights)}>{option.first_name}</span>
            &nbsp;
            <span style={getCustomStyle('last_name', option.searchHighlights)}>{option.last_name}</span>
          </li>
        );
      }}
    />
    </Box>
  );
};

export default AutocompleteUsers;
