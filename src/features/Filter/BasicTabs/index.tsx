import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import React, { SyntheticEvent, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPositionFilter } from '@/common/store/EmployeesSlice';
import { AppDispatch } from '@/common/store/store';
import EmployeeList from '@/features/EmployeeList';

interface TabPanelProps {
  children?: React.ReactNode;
  index: string;
  value: string;
}

const CustomTabPanel = React.memo((props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ paddingTop: 3 }}>{children}</Box>}
    </div>
  );
});

function a11yProps(name: string) {
  return {
    id: `simple-tab-${name}`,
    'aria-controls': `simple-tabpanel-${name}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(() => {
    return localStorage.getItem('activeTab') || 'All';
  });
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    localStorage.setItem('activeTab', value);
  }, [value]);

  const positionsTabs = ['All', 'Designer', 'Analyst', 'Manager', 'iOS', 'Android'];

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
          aria-label="basic tabs example"
          indicatorColor="primary"
          sx={{
            '& .MuiTab-root': {
              textTransform: 'capitalize',
              fontSize: '16px',
              fontFamily: '"Inter", sans-serif',
              color: '#97979B',
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
              {...a11yProps(positionTab)}
            />
          ))}
        </Tabs>
      </Box>
      {positionsTabs.map(positionTab => (
        <CustomTabPanel key={positionTab} value={value} index={positionTab}>
          <EmployeeList />
        </CustomTabPanel>
      ))}
    </Box>
  );
}
