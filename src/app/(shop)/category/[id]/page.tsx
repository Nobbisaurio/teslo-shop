

interface Props {
  params: Promise<{
    id: string;
  }>;
}




export default async function ( { params }: Props ) {

  const { id } = await params;

  return (
    <div>
      <h1>Category Page { id }</h1>
    </div>
  );
}