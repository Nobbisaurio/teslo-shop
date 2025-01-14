export const revalidate = 604800; // 7 dias


import { getProductBySlug } from '@/actions';
import { ProductMobileSlideShow, ProductSlideShow, QuantitySelector, SizeSelector, StockLabel } from '@/components';
import { titleFont } from '@/config/fonts';
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = ( await params ).slug;

  // fetch data
  const product = await getProductBySlug( slug );

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  return {
    title: product?.title ?? 'Producto no encontrado' + 'Teslo | Shop',
    description: product?.description ?? '',
    openGraph: {
      title: product?.title ?? 'Producto no encontrado',
      description: product?.description ?? '',
      images: [`/products/${product?.images[1]}`],
    },
  };
}






export default async function ( { params }: Props ) {

  const { slug } = await params;
  const product = await getProductBySlug( slug );
  console.log( !product );

  if ( !product ) return notFound();


  return (
    <div className='mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3'>

      {/* sliceshow */ }
      <div className='col-span-1 md:col-span-2'>


        {/* mobile slideshow */ }

        <ProductMobileSlideShow
          images={ product.images }
          title={ product.title }
          className='block md:hidden'
        />
        {/* Desktop slideshow */ }
        <ProductSlideShow
          images={ product.images }
          title={ product.title }
          className='hidden md:block'
        />


      </div>

      {/* product details */ }
      <div className='col-span-1 px-5'>
        <StockLabel slug={ product.slug } />

        <h1 className={ `${ titleFont.className } antialiased font-bold text-xl` }>
          { product.title }
        </h1>
        <p className='text-lg mb-5'>{ product.price }</p>

        {/* selector de tallas  */ }

        <SizeSelector
          selectedSize={ product.sizes[ 0 ] }
          availableSizes={ product.sizes }
        />

        {/* selector de cantidad */ }

        <QuantitySelector
          selectedQuantity={ 1 }
          availableQuantity={ 5 }
        />

        {/* boton agregar al carrito */ }

        <button className='btn-primary my-5'>
          Agregar al carrito
        </button>

        {/* Descripcion */ }
        <h3 className='font-bold text-sm'>Descripcion</h3>
        <p className='font-light'>
          { product.description }
        </p>
      </div>

    </div>
  );
}