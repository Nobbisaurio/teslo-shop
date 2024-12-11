import { ProductGrid, Title } from '@/components';
import { initialData } from '@/seed/seed';


import products = initialData.products


export default function Home() {
  return (
    <>
      <Title 
        title='tienda'
        subtitle='todos los productos'
        className='mb=2'
      />

      <ProductGrid products={products} />
    </>
  );
}
