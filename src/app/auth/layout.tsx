import { auth } from '@/authConfig';
import { redirect } from 'next/navigation';

export default async function ShopLayout({
 children
}: {
 children: React.ReactNode;
}) {

  const sesion = await auth();
  
  if(sesion?.user){
    redirect('/');
  }



  return (
    <main className='flex justify-center '>
      <div className='w-full sm:w-[350px] px-10 '>

      {children}
      </div>
    </main>
  );
}