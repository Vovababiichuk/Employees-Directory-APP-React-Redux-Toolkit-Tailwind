import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import React, { SyntheticEvent } from 'react';
import { useDispatch } from 'react-redux';
import { setPositionFilter } from '../../store/EmployeesSlice';
import EmployeeList from '../EmployeeList';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  const dispatch = useDispatch();

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    dispatch(setPositionFilter(newValue));
  };

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
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
          <Tab label="All" {...a11yProps(0)} />
          <Tab label="Designers" {...a11yProps(1)} />
          <Tab label="Analysts" {...a11yProps(2)} />
          <Tab label="Managers" {...a11yProps(3)} />
          <Tab label="iOS" {...a11yProps(4)} />
          <Tab label="Android" {...a11yProps(5)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        All
        <EmployeeList />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Designers
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Analysts
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        Managers
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        iOS
      </CustomTabPanel>
      <CustomTabPanel value={value} index={5}>
        Android
      </CustomTabPanel>
    </Box>
  );
}
