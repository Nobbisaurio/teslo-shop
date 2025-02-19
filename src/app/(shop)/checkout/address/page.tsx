import { Title } from '@/components';
import { AddressForm } from './ui/AddressForm';
import { getCountries, getUserAddress } from '@/actions';
import { auth } from '@/authConfig';

export default async function () {

  const countries = await getCountries();

  const user = await auth();

  const userAddressDB  = await getUserAddress(user?.user.id!); 

  console.log(userAddressDB);


  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">



      <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
        
        <Title title="Dirección" subtitle="Dirección de entrega" />

        <AddressForm countries={countries} userId={user?.user.id!} userAddress={userAddressDB} />

      </div>




    </div>
  );
}