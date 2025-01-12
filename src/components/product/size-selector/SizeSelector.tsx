import type { Sizes } from '@/interfaces';

interface Props {
  selectedSize: Sizes;
  availableSizes: Sizes[];
}


export const SizeSelector = ( { availableSizes, selectedSize }: Props ) => {
  return (
    <div className='my-5'>
      <h3 className='font-bold mb-4'>Tallas disponibles</h3>


      <div className='flex'>

        {
          availableSizes.map( ( size ) => (
            <button
              key={ size }
              className={`mx-2 hover:underline text-lg  ${size === selectedSize&&'underline'} `} 
            >
              { size }
            </button>
          ) )
        }


      </div>

    </div>
  );
};