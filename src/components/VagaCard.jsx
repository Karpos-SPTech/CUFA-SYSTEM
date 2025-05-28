import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Avatar,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Divider,
} from '@mui/material';

const JobListing = ({ company, location, time }) => (
  <Box
    sx={{
      py: 1.5,
      '&:not(:last-child)': {
        borderBottom: '1px solid #E0E0E0',
      },
    }}
  >
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        '&:hover': {
          backgroundColor: '#e8f5e9',
        },
        borderRadius: '8px',
        p: 1,
        cursor: 'pointer',
      }}
    >
      <Avatar
        sx={{
          width: 32,
          height: 32,
          bgcolor: '#E3EEE5',
        }}
      />
      <Box>
        <Typography
          sx={{
            fontSize: '14px',
            color: '#1e1e1e',
            fontWeight: 500,
            mb: 0.5,
          }}
        >
          Vaga
        </Typography>
        <Typography
          sx={{
            fontSize: '12px',
            color: '#666',
            lineHeight: 1.2,
          }}
        >
          {location}
        </Typography>
      </Box>
    </Box>
  </Box>
);

const VagaCard = () => {
  const [selectedTypes, setSelectedTypes] = useState({
    CLT: false,
    PJ: false,
    Freelancer: false,
    Estagio: false,
  });

  const handleCheckboxChange = (event) => {
    setSelectedTypes({
      ...selectedTypes,
      [event.target.name]: event.target.checked,
    });
  };

  // Sample job listings data
  const jobListings = [
    {
      id: 1,
      location: 'Tempo Integral - CLT',
    },
    {
      id: 2,
      location: 'Tempo Integral - PJ',
    },
  ];

  return (
    <Paper
      elevation={1}
      sx={{
        backgroundColor: '#fff',
        borderRadius: '15px',
        p: 2,
        width: '100%',
        minWidth: '400px',
        boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.08)',
      }}
    >
      <Typography
        sx={{
          fontSize: '16px',
          fontWeight: 600,
          color: '#1e1e1e',
          mb: 2,
        }}
      >
        Vagas
      </Typography>

      <FormGroup
        row
        sx={{
          mb: 2,
          display: 'flex',
          flexWrap: 'nowrap',
          gap: 1,
          justifyContent: 'space-between',
          px: 1,
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedTypes.CLT}
              onChange={handleCheckboxChange}
              name="CLT"
              size="small"
              sx={{
                color: '#006916',
                '&.Mui-checked': {
                  color: '#006916',
                },
              }}
            />
          }
          label={<Typography sx={{ fontSize: '12px' }}>CLT</Typography>}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedTypes.PJ}
              onChange={handleCheckboxChange}
              name="PJ"
              size="small"
              sx={{
                color: '#006916',
                '&.Mui-checked': {
                  color: '#006916',
                },
              }}
            />
          }
          label={<Typography sx={{ fontSize: '12px' }}>PJ</Typography>}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedTypes.Freelancer}
              onChange={handleCheckboxChange}
              name="Freelancer"
              size="small"
              sx={{
                color: '#006916',
                '&.Mui-checked': {
                  color: '#006916',
                },
              }}
            />
          }
          label={
            <Typography sx={{ fontSize: '12px' }}>Freelancer</Typography>
          }
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedTypes.Estagio}
              onChange={handleCheckboxChange}
              name="Estagio"
              size="small"
              sx={{
                color: '#006916',
                '&.Mui-checked': {
                  color: '#006916',
                },
              }}
            />
          }
          label={<Typography sx={{ fontSize: '12px' }}>Estágio</Typography>}
        />
      </FormGroup>

      <Divider />

      <Box sx={{ mt: 1 }}>
        {jobListings.map((job) => (
          <JobListing key={job.id} location={job.location} />
        ))}
      </Box>
    </Paper>
  );
};

export default VagaCard;
