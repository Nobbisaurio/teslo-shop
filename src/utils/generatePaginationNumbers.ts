export const generatePaginationNumbers = (currentPage: number, totalPages: number) => {
  //si el numero de paginas es 7 o menor
  // vamos a mostrar todas las paginas sin puntos suspensivos

  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // si la pagina actual esta entre las primeras 3 paginas
  // vamos a mostrar las primeras 3 paginas y los puntos suspensivos
  // y las ultimas 2 paginas

  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }


  // si la pagina actual esta entre las ultimas 3 paginas
  // vamos a mostrar las primeras 2 paginas y los puntos suspensivos 
  // y las ultimas 3 paginas

  if(currentPage >= totalPages - 2){
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // si la pagina actual esta en el medio
  // vamos a mostrar las primeras 1 paginas y los puntos suspensivos
  // la pagina actual y las ultimas 2 paginas


  return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];


};
