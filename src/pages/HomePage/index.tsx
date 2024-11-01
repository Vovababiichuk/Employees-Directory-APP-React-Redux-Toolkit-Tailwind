import EmployeeList from '@/features/EmployeeList';
import BasicTabs from '@/features/Filter/BasicTabs';
import SearchInput from '@/features/Filter/SearchInput';

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
