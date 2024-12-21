'use client';

import { useUIStore } from '@/store/ui/ui-store';

export const MenuButton = () => {

  const toggleSidebar =useUIStore( state => state.toggleSidebar)
  



  return (
    <button
    onClick={toggleSidebar}
      className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'>
      Menu
    </button>
  );
};