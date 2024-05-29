import * as React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/theme';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function RootLayout(props) {
  return (
    <html lang="en">
      <body>
        <Grid container mt={1}>
          <Grid xs={2} />
          <Grid xs={8}>
            <Grid container>
              <Grid xs={2}>
                <Card sx={{ width: 80 }} style={{ border: "none", boxShadow: "none" }}>
                  <CardMedia
                    sx={{ height: 80 }}
                    image="/static/images/cvs.jpeg"
                    title="Mongo"
                  />
                </Card>
              </Grid>
              <Grid xs={8}>
                <Box width="100%" mt={2}>
                  <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
                    Autocomplete Patients and Prescribers
                  </Typography>
                </Box>
              </Grid>
              <Grid xs={2}>
                <Card sx={{ width: 80 }} style={{ border: "none", boxShadow: "none" }}>
                  <CardMedia
                    sx={{ height: 80 }}
                    image="/static/images/mongodb-logo.png"
                    title="Mongo"
                  />
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid xs={2} />

          <Grid xs={12}>
            <AppRouterCacheProvider options={{ enableCssLayer: true }}>
              <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                {props.children}
              </ThemeProvider>
            </AppRouterCacheProvider>
          </Grid>
        </Grid>
      </body>
    </html>
  );
}
