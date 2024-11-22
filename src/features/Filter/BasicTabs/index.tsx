import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import React from 'react';
import EmployeeList from '@/features/EmployeeList';
import { useURLParams } from '@/common/hooks/useURLParams';

const positionsTabs = ['All', 'Designers', 'Analysts', 'Managers', 'iOS', 'Android'];

export const BasicTabs = () => {
  const [currentTab, setCurrentTab] = useURLParams('tab', 'All');

  console.log('currentTab', currentTab);

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
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
            '& .MuiTab-root.Mui-selected': { color: '#050510', fontWeight: 600 },
            '& .MuiTabs-scroller': {
              display: 'flex',
              justifyContent: 'flex-start',
            },
          }}
        >
          {positionsTabs.map((tab, idx) => (
            <Tab label={tab} value={tab} key={idx} />
          ))}
        </Tabs>
      </Box>
      <EmployeeList currentTab={currentTab.toLowerCase()} />
    </Box>
  );
};
