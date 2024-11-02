import BasicTabs from '@/features/Filter/BasicTabs';
import SearchInput from '@/features/Filter/SearchInput';

const HomePage = () => {
  return (
    <div className="max-w-6xl mx-auto bg-white pt-8 p-4 h-screen">
      <SearchInput />
      <BasicTabs />
    </div>
  );
};

export default HomePage;
