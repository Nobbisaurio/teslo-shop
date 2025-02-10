import { auth } from '@/authConfig';
import { Title } from '@/components';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {

  const sesion = await auth();
  const user = sesion?.user;

  if(!user){
     redirect('/auth/login?callbackUrl=/profile')
  }


  return (
    <div className='mb-48' >
      <Title title='Perfil' />

      <div className='flex flex-col sm:flex-row '>
        <div className='w-1/3  flex justify-end'>

          <Image
            src={user?.image?user.image:'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg'}
            alt='profile image' className='rounded-md' width={ 250 } height={ 150 }
          />
        </div>
        
        <form
          action=""
          className=' w-2/3 py-10  pl-10 '
        >
          <input  type="text"  className='w-2/3 bg-gray-200 rounded h-12 my-2 pl-5 text-xl' value={user?.name!} disabled />
          <input  type="text"  className='w-2/3 bg-gray-200 rounded h-12 my-2 pl-5 text-xl' value={user?.email!} disabled />
        </form>
      </div>
    </div>
  );
}