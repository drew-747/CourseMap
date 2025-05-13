import React from 'react';
import { Handle, Position } from 'reactflow';
import { motion } from 'framer-motion';
import { FaExclamationCircle } from 'react-icons/fa';

const getStatusColor = (status, isHighlighted, isPrerequisite) => {
  if (isHighlighted) {
    return {
      border: '#8B0000',
      background: '#FFFFFF',
      text: '#8B0000',
      shadow: '0 0 0 2px rgba(139, 0, 0, 0.2)'
    };
  }
  if (isPrerequisite) {
    return {
      border: '#8B0000',
      background: '#FEF2F2',
      text: '#8B0000',
      shadow: '0 0 0 2px rgba(139, 0, 0, 0.1)'
    };
  }
  switch (status) {
    case 'completed':
      return {
        border: '#16A34A',
        background: '#F0FDF4',
        text: '#166534',
        shadow: '0 0 0 2px rgba(22, 163, 74, 0.1)'
      };
    case 'in_progress':
      return {
        border: '#EA580C',
        background: '#FFF7ED',
        text: '#9A3412',
        shadow: '0 0 0 2px rgba(234, 88, 12, 0.1)'
      };
    default:
      return {
        border: '#6B7280',
        background: '#FFFFFF',
        text: '#374151',
        shadow: '0 0 0 2px rgba(107, 114, 128, 0.1)'
      };
  }
};

const getStatusLabel = (status) => {
  switch (status) {
    case 'completed':
      return 'Completed';
    case 'in_progress':
      return 'In Progress';
    default:
      return 'Not Taken';
  }
};

function CourseNode({ data, isConnectable }) {
  const colors = getStatusColor(data.status, data.isHighlighted, data.isPrerequisite);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        className="!bg-transparent !border-0 !w-full !h-2 !min-w-[100px] !top-[-8px]"
        style={{ zIndex: 1 }}
      />
      
      <div
        className="relative rounded-lg p-3 min-w-[140px] transition-all duration-200 cursor-pointer"
        style={{
          border: `2px solid ${colors.border}`,
          backgroundColor: colors.background,
          boxShadow: colors.shadow,
        }}
      >
        {/* Exclamation icon for unmet prerequisites */}
        {data.hasUnmetPrereqs && (
          <div className="absolute top-1 right-1 text-red-600" title="Prerequisites not met">
            <FaExclamationCircle size={18} />
          </div>
        )}
        <div className="text-center">
          <div
            className="font-semibold mb-1"
            style={{ color: colors.text }}
          >
            {data.label}
          </div>
          <div className="text-xs opacity-70" style={{ color: colors.text }}>
            {getStatusLabel(data.status)}
          </div>
        </div>

        {/* Hover tooltip */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-10 bg-neutral-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
          {data.name} ({data.units} units)
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        className="!bg-transparent !border-0 !w-full !h-2 !min-w-[100px] !bottom-[-8px]"
        style={{ zIndex: 1 }}
      />
    </motion.div>
  );
}

export default CourseNode; 