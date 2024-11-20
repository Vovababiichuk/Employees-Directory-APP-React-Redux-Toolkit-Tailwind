import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import React, { SyntheticEvent, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPositionFilter } from '@/common/store/EmployeesSlice';
import { AppDispatch } from '@/common/store/store';
import EmployeeList from '@/features/EmployeeList';

type TabPanelProps = {
  children?: React.ReactNode;
  tabName: string;
  value: string;
};

const CustomTabPanel = React.memo(({ children, value, tabName, ...other }: TabPanelProps) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== tabName}
      id={`simple-tabpanel-${tabName}`}
      aria-labelledby={`simple-tab-${tabName}`}
      {...other}
    >
      {value === tabName && <Box sx={{ paddingTop: 3 }}>{children}</Box>}
    </div>
  );
});

export const BasicTabs = () => {
  const [value, setValue] = React.useState(() => {
    return localStorage.getItem('activeTab') || 'All';
  });
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    localStorage.setItem('activeTab', value);
  }, [value]);

  const positionsTabs = ['All', 'Designers', 'Analysts', 'Managers', 'iOS', 'Android'];

  const handleChange = (_: SyntheticEvent, newValue: string) => {
    setValue(newValue);
    dispatch(setPositionFilter(newValue));

    const url = new URL(window.location.href);
    if (newValue !== 'All') {
      url.searchParams.set('tab', newValue);
    } else {
      url.searchParams.delete('tab');
    }
    window.history.pushState({}, '', url);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
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
      {positionsTabs.map(positionTab => (
        <CustomTabPanel key={positionTab} value={value} tabName={positionTab}>
          <EmployeeList />
        </CustomTabPanel>
      ))}
    </Box>
  );
};
