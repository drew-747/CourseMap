import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Button, Grid, Paper } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

function Dashboard() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h4" gutterBottom>
              Welcome, {currentUser?.email}
            </Typography>
            <Typography variant="body1" paragraph>
              CourseMap helps you visualize and track your academic progress in the UP Computer Science curriculum.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240 }}>
            <Typography variant="h6" gutterBottom>
              Course Flow
            </Typography>
            <Typography variant="body1" paragraph>
              View the interactive flowchart of your curriculum and track your progress.
            </Typography>
            <Box sx={{ mt: 'auto' }}>
              <Button
                variant="contained"
                onClick={() => navigate('/flow')}
                fullWidth
              >
                View Course Flow
              </Button>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240 }}>
            <Typography variant="h6" gutterBottom>
              Course Information
            </Typography>
            <Typography variant="body1" paragraph>
              Access detailed information about each course, including prerequisites and advice from seniors.
            </Typography>
            <Box sx={{ mt: 'auto' }}>
              <Button
                variant="contained"
                onClick={() => navigate('/flow')}
                fullWidth
              >
                Browse Courses
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard; 