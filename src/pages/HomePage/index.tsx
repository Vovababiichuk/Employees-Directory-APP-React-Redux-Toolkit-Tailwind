import { BasicTabs } from '@/features/Filter/BasicTabs';
import SearchInput from '@/features/Filter/SearchInput';

const HomePage = () => {
  return (
    <div className="max-w-7xl mx-auto bg-white pt-4 p-4 min-h-screen">
      <SearchInput />
      <BasicTabs />
    </div>
  );
};

export default HomePage;
