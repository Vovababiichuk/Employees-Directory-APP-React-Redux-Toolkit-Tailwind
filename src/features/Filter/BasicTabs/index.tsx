import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import EmployeeList from '@/features/EmployeeList';

const positionsTabs = ['All', 'Designers', 'Analysts', 'Managers', 'iOS', 'Android'];

export const BasicTabs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const currentTab = params.get('tab') || 'All';

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    params.set('tab', newValue);
    navigate({ search: params.toString() }, { replace: true });
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={currentTab}
          onChange={handleChange}
          indicatorColor="primary"
          sx={{
            marginTop: '-6px',
            '& .MuiTab-root': {
              textTransform: 'capitalize',
              fontSize: '15px',
              fontFamily: '"Inter", sans-serif',
              color: '#97979B',
              padding: '12px 10px',
              minWidth: '54px',
              top: '6px',
            },
            '& .MuiTab-root.Mui-selected': { color: '#050510' },
            '& .MuiTabs-indicator': { backgroundColor: '#6534FF' },
          }}
        >
          {positionsTabs.map(positionTab => (
            <Tab
              key={positionTab}
              label={positionTab}
              value={positionTab}
              id={`simple-tab-${positionTab}`}
              aria-controls={`simple-tabpanel-${positionTab}`}
            />
          ))}
        </Tabs>
      </Box>
      <Box sx={{ paddingTop: 3 }}>
        <EmployeeList currentTab={currentTab.toLowerCase()} />
      </Box>
    </Box>
  );
};
