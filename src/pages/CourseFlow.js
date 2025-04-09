import React, { useState, useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'react-flow-renderer';
import { Box, Paper, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';

const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'CS 11', status: 'not_taken' },
    position: { x: 250, y: 0 },
  },
  {
    id: '2',
    data: { label: 'CS 12', status: 'not_taken' },
    position: { x: 100, y: 100 },
  },
  {
    id: '3',
    data: { label: 'CS 21', status: 'not_taken' },
    position: { x: 400, y: 100 },
  },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '1', target: '3' },
];

function CourseFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const { currentUser } = useAuth();

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleNodeClick = (event, node) => {
    setSelectedNode(node);
    setOpenDialog(true);
  };

  const handleStatusChange = async (status) => {
    if (!currentUser || !selectedNode) return;

    const userDocRef = doc(db, 'users', currentUser.uid);
    const userDoc = await getDoc(userDocRef);
    
    if (!userDoc.exists()) {
      await updateDoc(userDocRef, {
        courseStatus: { [selectedNode.id]: status }
      });
    } else {
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
  };

  return (
    <Box sx={{ height: 'calc(100vh - 64px)' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={handleNodeClick}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{selectedNode?.data?.label}</DialogTitle>
        <DialogContent>
          <Typography>Select course status:</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleStatusChange('not_taken')}>Not Taken</Button>
          <Button onClick={() => handleStatusChange('in_progress')}>In Progress</Button>
          <Button onClick={() => handleStatusChange('completed')}>Completed</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default CourseFlow; 