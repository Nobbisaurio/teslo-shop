import { Title } from '@/components';
import Image from 'next/image';

export default function ProfilePage() {
  return (
    <div className='mb-48' >
      <Title title='Perfil' />

      <div className='flex flex-col sm:flex-row '>
        <div className='w-1/3  flex justify-center'>

          <Image
            src='https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg'
            alt='profile image' className='rounded-md' width={ 250 } height={ 200 }
          />
        </div>
        
        <form
          action=""
          className=' w-2/3 py-10  ml-0 '
        >
          <input type="text"  className='w-2/3 bg-gray-200 rounded h-8 my-2'/>
          <input type="text"  className='w-2/3 bg-gray-200 rounded h-8 my-2'/>
          <input type="text"  className='w-2/3 bg-gray-200 rounded h-8 my-2'/>
          <input type="text"  className='w-2/3 bg-gray-200 rounded h-8 my-2'/>
        </form>
      </div>
    </div>
  );
}