import { useState } from 'react';
type TUsePaginationState<T> = {
  sliceData: T[];
  handleClickNext: () => void;
  handleClickPrev: () => void;
  canSelectNext: boolean;
  canSelectPrev: boolean;
};

export const usePagination = <T>(
  data:T[],
  perPage: number
): TUsePaginationState<T> => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / perPage);

  const handleClickNext = () => {
    if (currentPage < totalPages) setCurrentPage(prevPage => prevPage + 1);
    console.log(totalPages);
    
  };

  const handleClickPrev = () => {
    if (currentPage > 1) setCurrentPage(prevPage => prevPage - 1);
  };

  const canSelectNext = currentPage < totalPages;
  const canSelectPrev = currentPage > 1;

  const sliceData = data?.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  return {
    sliceData,
    handleClickNext,
    handleClickPrev,
    canSelectNext,
    canSelectPrev,
  };
};
