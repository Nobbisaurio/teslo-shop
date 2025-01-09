import { getPaginatedProductsWithImages } from '@/actions';
import { Pagination, ProductGrid, Title } from '@/components';
import { Gender } from '@/interfaces';
import { initialData } from '@/seed/seed';
import { notFound, redirect } from 'next/navigation';


interface Props {
  params: Promise<{
    gender: string
  }>;
  searchParams: Promise<{
    page: string
  }>
}




export default async function ( { params, searchParams }: Props ) {

  const {gender}= await params;
  const page = (await searchParams).page ? parseInt( (await searchParams).page ) : 1;
  
  const { products,totalPages,currentPage } = await getPaginatedProductsWithImages( { page , gender:gender as Gender } );

  if(products.length === 0){
    return redirect(`/category/${gender}`)
  }



  const labels:Record<string, string> = {
    'men': 'para hombres',
    'women': 'para mujeres',
    'kid': 'para niños',
    'unisex': 'para todos',
    
  }


  if(gender !== Object.keys(labels).find(key => key === gender)){
    return notFound()
  }





  return (
   <>
         <Title 
           title={`Articulos  ${labels[gender]}`}
           subtitle={`${gender} products`} 
           className='mb=2'
         />
   
         <ProductGrid products={products} />

         <Pagination totalPages={totalPages} />
       </>
  );
}