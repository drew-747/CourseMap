import React from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { Paper, Typography, Box, Chip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TimerIcon from '@mui/icons-material/Timer';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { motion } from 'framer-motion';

const getStatusColor = (status, isHighlighted, isPrerequisite) => {
  if (isHighlighted) {
    return {
      border: '#7B1113',
      background: '#FFFFFF',
      text: '#7B1113',
      shadow: '0 0 0 2px rgba(123, 17, 19, 0.2)'
    };
  }
  if (isPrerequisite) {
    return {
      border: '#F7B516',
      background: '#FFFFFF',
      text: '#946200',
      shadow: '0 0 0 2px rgba(247, 181, 22, 0.2)'
    };
  }
  switch (status) {
    case 'completed':
      return {
        border: '#16A34A',
        background: '#FFFFFF',
        text: '#166534',
        shadow: '0 0 0 2px rgba(22, 163, 74, 0.2)'
      };
    case 'in_progress':
      return {
        border: '#EA580C',
        background: '#FFFFFF',
        text: '#9A3412',
        shadow: '0 0 0 2px rgba(234, 88, 12, 0.2)'
      };
    default:
      return {
        border: '#6B7280',
        background: '#FFFFFF',
        text: '#374151',
        shadow: '0 0 0 2px rgba(107, 114, 128, 0.2)'
      };
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case 'completed':
      return <CheckCircleIcon sx={{ fontSize: 16 }} />;
    case 'in_progress':
      return <TimerIcon sx={{ fontSize: 16 }} />;
    default:
      return <RadioButtonUncheckedIcon sx={{ fontSize: 16 }} />;
  }
};

function CourseNode({ data, isHighlighted, isPrerequisite }) {
  const colors = getStatusColor(data.status, isHighlighted, isPrerequisite);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <Paper
        elevation={0}
        sx={{
          padding: 1.5,
          minWidth: 140,
          maxWidth: 180,
          border: `2px solid ${colors.border}`,
          backgroundColor: colors.background,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: colors.shadow,
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: `0 12px 24px -10px ${colors.border}40`,
          },
          borderRadius: '12px',
        }}
      >
        <Handle 
          type="target" 
          position={Position.Top} 
          style={{ 
            background: colors.border,
            width: 8,
            height: 8,
            top: -4,
          }} 
        />
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: colors.text,
              fontSize: '1rem',
              mb: 1,
              fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
            }}
          >
            {data.label}
          </Typography>
          <Chip
            icon={getStatusIcon(data.status)}
            label={data.status ? data.status.replace('_', ' ').toUpperCase() : 'NOT TAKEN'}
            size="small"
            sx={{
              backgroundColor: `${colors.border}15`,
              color: colors.text,
              fontWeight: 500,
              fontSize: '0.7rem',
              '& .MuiChip-icon': {
                color: colors.text,
              },
            }}
          />
        </Box>
        <Handle 
          type="source" 
          position={Position.Bottom} 
          style={{ 
            background: colors.border,
            width: 8,
            height: 8,
            bottom: -4,
          }} 
        />
      </Paper>
    </motion.div>
  );
}

export default CourseNode; 