import React from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { Paper, Typography } from '@mui/material';

const getStatusColor = (status) => {
  switch (status) {
    case 'completed':
      return '#4caf50';
    case 'in_progress':
      return '#ff9800';
    case 'not_taken':
      return '#f44336';
    default:
      return '#9e9e9e';
  }
};

function CourseNode({ data }) {
  return (
    <Paper
      sx={{
        padding: 2,
        minWidth: 150,
        backgroundColor: getStatusColor(data.status),
        color: 'white',
      }}
    >
      <Handle type="target" position={Position.Top} />
      <Typography variant="subtitle1" align="center">
        {data.label}
      </Typography>
      <Handle type="source" position={Position.Bottom} />
    </Paper>
  );
}

export default CourseNode; 