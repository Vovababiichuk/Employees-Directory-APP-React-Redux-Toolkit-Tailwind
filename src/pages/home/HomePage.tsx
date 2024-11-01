import EmployeeList from '../../features/employees/EmployeeList';
import SearchInput from '../../features/employees/ui/SearchInput';
import BasicTabs from '../../features/employees/ui/Tabs';

const HomePage = () => {
  return (
    <div className="max-w-6xl mx-auto bg-white pt-8 p-4">
      <SearchInput />
      <BasicTabs />
      <EmployeeList />
    </div>
  );
};

export default HomePage;
