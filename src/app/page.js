'use client';

import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Copyright from '@/components/Copyright';
import PatientTable from '@/components/PatientTable';
import AutocompleteUsers from '@/components/AutocompleteUsers';
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AutocompleteFacilities from '@/components/AutocompleteFacilities';


export default function Home() {
  const defaultFacility = 7; 
  const [selectedFacility, setSelectedFacility] = useState(defaultFacility);

  const [value, setValue] = useState('');

  const handleAutocompleteChange = (newValue) => {
    setValue(newValue);
  };

  const handleSelectFacility = (value) => {
    setSelectedFacility(value);
  };

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >

        <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid  mb={5} container xs={12}>
            <AutocompleteFacilities value={selectedFacility} onSelect={handleSelectFacility} />
            <AutocompleteUsers onChange={handleAutocompleteChange} facility={selectedFacility} />
          </Grid>
          <Grid container xs={6}>
            <Box width="100%" >
              <Typography variant="h6" component="h1" align="center" sx={{ mb: 2 }}>
                Patients
              </Typography>

              <PatientTable type={'patients'} search={value} facility={selectedFacility} />
            </Box>
          </Grid>
          <Grid container spacing={1} xs={6}>
            <Box width="100%">
              <Typography variant="h6" component="h1" align="center" sx={{ mb: 2 }}>
                Prescribers
              </Typography>

              <PatientTable type={'prescribers'} search={value} facility={selectedFacility} />
            </Box>
          </Grid>
        </Grid>
        <Copyright />
      </Box>
    </Container>
  );
}
