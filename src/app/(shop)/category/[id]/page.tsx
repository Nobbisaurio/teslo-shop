import { ProductGrid, Title } from '@/components';
import { Category } from '@/interfaces';
import { initialData } from '@/seed/seed';
import { notFound } from 'next/navigation';


interface Props {
  params: Promise<{
    id: Category;
  }>;
}

const products = initialData.products;



export default async function ( { params }: Props ) {

  const { id } = await params;

  const categoryProducts = products.filter(product => product.gender === id )

  const labels:Record<Category, string> = {
    'men': 'para hombres',
    'women': 'para mujeres',
    'kid': 'para niños',
    'unisex': 'para todos',
    
  }


  if(id !== 'men'||'women'||'kid'){
    notFound()
  }



  return (
   <>
         <Title 
           title={`Articulos  ${labels[id]}`}
           subtitle={`${id} products`} 
           className='mb=2'
         />
   
         <ProductGrid products={categoryProducts} />
       </>
  );
}