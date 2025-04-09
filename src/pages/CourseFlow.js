import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
} from 'react-flow-renderer';
import { 
  Box, 
  Paper, 
  Typography, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Divider,
  IconButton,
  Chip,
  Stack
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import { db } from '../firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import CourseNode from '../components/CourseNode';
import { courseData, getNodePosition, generateEdges } from '../data/courseData';

const nodeTypes = {
  courseNode: CourseNode,
};

const semesterLabels = {
  1: 'First Semester',
  2: 'Second Semester',
  3: 'Midyear',
};

function CourseFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [highlightedNodes, setHighlightedNodes] = useState(new Set());
  const [prerequisiteNodes, setPrerequisiteNodes] = useState(new Set());
  const { currentUser } = useAuth();

  const initializeNodes = useCallback(() => {
    const initialNodes = courseData.nodes.map((node) => {
      const position = getNodePosition(node.data.semester, node.data.year);
      const verticalOffset = courseData.nodes
        .filter(n => n.data.semester === node.data.semester && n.data.year === node.data.year)
        .indexOf(node) * 80;

      return {
        ...node,
        type: 'courseNode',
        position: {
          x: position.x,
          y: position.baseY + verticalOffset,
        },
        data: {
          ...node.data,
          status: 'not_taken',
          isHighlighted: false,
          isPrerequisite: false,
        },
      };
    });

    setNodes(initialNodes);
    setEdges(generateEdges(initialNodes));
  }, [setNodes, setEdges]);

  useEffect(() => {
    initializeNodes();
  }, [initializeNodes]);

  useEffect(() => {
    const loadUserProgress = async () => {
      if (!currentUser) return;

      const userDocRef = doc(db, 'users', currentUser.uid);
      try {
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const courseStatus = userDoc.data().courseStatus || {};
          setNodes((nds) =>
            nds.map((node) => ({
              ...node,
              data: {
                ...node.data,
                status: courseStatus[node.id] || 'not_taken',
              },
            }))
          );
        } else {
          // Create the user document if it doesn't exist
          await setDoc(userDocRef, { courseStatus: {} });
        }
      } catch (error) {
        console.error('Error loading user progress:', error);
      }
    };

    loadUserProgress();
  }, [currentUser, setNodes]);

  const handleNodeClick = (event, node) => {
    setSelectedNode(node);
    setOpenDialog(true);

    // Highlight prerequisites
    const prerequisites = new Set();
    const findPrerequisites = (nodeId) => {
      const node = courseData.nodes.find(n => n.id === nodeId);
      if (node) {
        node.data.prerequisites.forEach(prereq => {
          prerequisites.add(prereq);
          findPrerequisites(prereq);
        });
      }
    };
    findPrerequisites(node.id);
    setPrerequisiteNodes(prerequisites);
    setHighlightedNodes(new Set([node.id]));
  };

  const canChangeStatus = (nodeId, newStatus) => {
    if (newStatus === 'not_taken') return true;
    
    const node = courseData.nodes.find(n => n.id === nodeId);
    if (!node) return false;

    return node.data.prerequisites.every(prereqId => {
      const prereqNode = nodes.find(n => n.id === prereqId);
      return prereqNode && prereqNode.data.status === 'completed';
    });
  };

  const handleStatusChange = async (status) => {
    if (!currentUser || !selectedNode) return;

    if (!canChangeStatus(selectedNode.id, status)) {
      alert('You must complete all prerequisites first!');
      return;
    }

    try {
      const userDocRef = doc(db, 'users', currentUser.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (!userDoc.exists()) {
        // Create new document with initial course status
        await setDoc(userDocRef, {
          courseStatus: { [selectedNode.id]: status }
        });
      } else {
        // Update existing document
        const currentStatus = userDoc.data().courseStatus || {};
        await updateDoc(userDocRef, {
          courseStatus: { ...currentStatus, [selectedNode.id]: status }
        });
      }

      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === selectedNode.id) {
            return {
              ...node,
              data: { ...node.data, status },
            };
          }
          return node;
        })
      );

      setOpenDialog(false);
      setHighlightedNodes(new Set());
      setPrerequisiteNodes(new Set());
    } catch (error) {
      console.error('Error updating course status:', error);
      alert('Error updating course status. Please try again.');
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setHighlightedNodes(new Set());
    setPrerequisiteNodes(new Set());
  };

  return (
    <Box sx={{ 
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#F9FAFB'
    }}>
      <Paper 
        elevation={0}
        sx={{ 
          p: 3,
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #E5E7EB'
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <SchoolOutlinedIcon sx={{ color: '#7B1113', fontSize: 32 }} />
          <Box>
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 600,
                color: '#111827',
                fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
              }}
            >
              UP Computer Science Curriculum
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#6B7280',
                fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
              }}
            >
              Track your academic progress through an interactive flowchart
            </Typography>
          </Box>
        </Stack>
      </Paper>

      <Box sx={{ flex: 1, position: 'relative' }}>
        <ReactFlow
          nodes={nodes.map(node => ({
            ...node,
            data: {
              ...node.data,
              isHighlighted: highlightedNodes.has(node.id),
              isPrerequisite: prerequisiteNodes.has(node.id),
            },
          }))}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={handleNodeClick}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background color="#E5E7EB" gap={24} />
          <Controls />
          <MiniMap style={{ backgroundColor: '#FFFFFF' }} />
        </ReactFlow>
      </Box>

      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          elevation: 0,
          sx: {
            borderRadius: '16px',
            backgroundColor: '#FFFFFF'
          }
        }}
      >
        <DialogTitle 
          sx={{ 
            p: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid #E5E7EB'
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <InfoOutlinedIcon sx={{ color: '#7B1113' }} />
            <Typography 
              variant="h6"
              sx={{ 
                fontWeight: 600,
                color: '#111827',
                fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
              }}
            >
              {selectedNode?.data?.label}
            </Typography>
          </Stack>
          <IconButton onClick={handleCloseDialog} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: 3 }}>
          <Stack spacing={3}>
            <Box>
              <Typography 
                variant="subtitle2" 
                sx={{ 
                  mb: 1,
                  color: '#374151',
                  fontWeight: 600,
                  fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                }}
              >
                Course Information
              </Typography>
              <Typography 
                variant="body2"
                sx={{ 
                  color: '#6B7280',
                  fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                }}
              >
                {selectedNode?.data?.description}
              </Typography>
            </Box>

            <Box>
              <Typography 
                variant="subtitle2" 
                sx={{ 
                  mb: 1,
                  color: '#374151',
                  fontWeight: 600,
                  fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                }}
              >
                Prerequisites
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {selectedNode?.data?.prerequisites.length > 0 ? (
                  selectedNode.data.prerequisites.map(prereq => (
                    <Chip 
                      key={prereq} 
                      label={prereq}
                      size="small"
                      sx={{
                        backgroundColor: '#F3F4F6',
                        color: '#374151',
                        fontWeight: 500,
                        mb: 1
                      }}
                    />
                  ))
                ) : (
                  <Typography 
                    variant="body2"
                    sx={{ 
                      color: '#6B7280',
                      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                    }}
                  >
                    No prerequisites
                  </Typography>
                )}
              </Stack>
            </Box>

            <Box>
              <Typography 
                variant="subtitle2" 
                sx={{ 
                  mb: 1,
                  color: '#374151',
                  fontWeight: 600,
                  fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                }}
              >
                Current Status
              </Typography>
              <Chip
                label={selectedNode?.data?.status?.replace('_', ' ').toUpperCase() || 'NOT TAKEN'}
                sx={{
                  backgroundColor: '#F3F4F6',
                  color: '#374151',
                  fontWeight: 500
                }}
              />
            </Box>
          </Stack>
        </DialogContent>

        <DialogActions 
          sx={{ 
            p: 3,
            borderTop: '1px solid #E5E7EB'
          }}
        >
          <Button 
            onClick={() => handleStatusChange('not_taken')}
            variant="outlined"
            sx={{
              borderRadius: '8px',
              textTransform: 'none',
              fontWeight: 500
            }}
          >
            Not Taken
          </Button>
          <Button 
            onClick={() => handleStatusChange('in_progress')}
            variant="outlined"
            color="warning"
            sx={{
              borderRadius: '8px',
              textTransform: 'none',
              fontWeight: 500
            }}
          >
            In Progress
          </Button>
          <Button 
            onClick={() => handleStatusChange('completed')}
            variant="contained"
            color="success"
            sx={{
              borderRadius: '8px',
              textTransform: 'none',
              fontWeight: 500,
              boxShadow: 'none'
            }}
          >
            Completed
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default CourseFlow; 