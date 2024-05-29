'use client';

import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const AutocompleteUsers = ({ onChange }) => {
  const [options, setOptions] = useState([]);

  const fetchData = async (query) => {
    try {
      // const search = await fetch(`localhost:8080/search/autocomplete/${query}/32.9/-67.0`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // });
      // const users = await response.json();

      // let option_data = []
      // if (typeof data !== 'undefined') {
      //   const processSection = (section, sectionName) => {
      //     return section.map(item => ({
      //       name: item.first_name,
      //       surname: item.last_name,
      //       section: sectionName,
      //       highlights: item.searchHighlights
      //     }));
      //   };

      //   const prescribers = processSection(input.prescribers, "Prescribers");
      //   const patients = processSection(input.patients, "Patients");

      //   const output = [...prescribers, ...patients];
      //   console.log(output)
      // }


      const token = 'TugvDS3bAux5krOG8LzcjzJBZllY0Zd9zEVMQI1WKvUY54QxRHNdTLBKpXLeTT52';
      const response = await fetch('https://us-east-1.aws.data.mongodb-api.com/app/data-jntjv/endpoint/search_patient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          search: query,
        }),
      });

      const data = await response.json();
      let option_data = []
      if (typeof data !== 'undefined') {
        option_data = data.map(item => ({
          label: `${item.first_name} ${item.last_name}`,
          first_name: item.first_name,
          last_name: item.last_name,
          value: item._id,
          section: 'Patients',
          highlights: item.highlights
        }));

      }

      const prescribers = await fetch('https://us-east-1.aws.data.mongodb-api.com/app/data-jntjv/endpoint/search_provider', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          search: query,
        }),
      });

      const prescribers_data = await prescribers.json();
      let prescribers_option_data = []
      if (typeof prescribers_data !== 'undefined') {
        prescribers_option_data = prescribers_data.map(item => ({
          label: `${item.first_name} ${item.last_name}`,
          first_name: item.first_name,
          last_name: item.last_name,
          value: item._id,
          section: 'Prescribers',
          highlights: item.highlights
        }));
      }

      if (prescribers_data.length > 0 && prescribers_option_data.length > 0) {
        setOptions(option_data.concat(prescribers_option_data));
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
    let isBold = highlights.some(highlight => highlight.path === valueToCheck);

    // console.log(highlights, valueToCheck, isBold)
    return {
      fontWeight: isBold ? 'bold' : 'normal',
    };
  };

  return (
    <Autocomplete
      sx={{ width: 300 }}
      options={options}
      groupBy={(option) => option.section}
      onInputChange={handleInputChange}
      renderInput={(params) => <TextField {...params} label="Users" variant="outlined" />}
      renderOption={(props, option) => {
        return (
          <li {...props}>
            <span style={getCustomStyle('first_name', option.highlights)}>{option.first_name}</span>
            &nbsp;
            <span style={getCustomStyle('last_name', option.highlights)}>{option.last_name}</span>
          </li>
        );
      }}
    />
  );
};

export default AutocompleteUsers;
