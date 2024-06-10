import React from 'react';
import SmButton from '../form/SmButton';
import arrowLeftActive from '../../assets/arrowLeftActive.svg';
import arrowRightInactive from '../../assets/arrowRightInactive.svg';

const Pagination = ({ pageNumber, totalPages = 10, limit, setSkip }) => {
  const nextPage = () => {
    if (pageNumber < totalPages) {
      setSkip(pageNumber * limit);
    }
  };
  const prevPage = () => {
    if (pageNumber > 1) {
      setSkip((pageNumber - 2) * limit);
    }
  };

  const Pages = () => {
    const selectPage = page => {
      if (pageNumber === page) return;
      setSkip((page - 1) * limit);
    };

    if (totalPages < 5)
      return Array.from({ length: totalPages }).map((page, index) => (
        <SmButton
          titleComplete={index + 1}
          variant={index + 1 === pageNumber ? 'glassSelected' : 'glass'}
          onClick={() => selectPage(index + 1)}
        />
      ));
    else
      return (
        <>
          {[
            pageNumber < totalPages - 1 ? pageNumber : 1,
            pageNumber < totalPages - 1 ? pageNumber + 1 : 2,
          ].map((page, index) => (
            <SmButton
              titleComplete={page}
              variant={pageNumber === page ? 'glassSelected' : 'glass'}
              onClick={() => selectPage(page)}
            />
          ))}
          <div className='cTable__footer__pages__dots'>...</div>
          {[totalPages - 1, totalPages].map((page, index) => (
            <SmButton
              titleComplete={page}
              variant={pageNumber === page ? 'glassSelected' : 'glass'}
              onClick={() => selectPage(page)}
            />
          ))}
        </>
      );
  };

  return (
    <div className='cTable__footer'>
      <div className='cTable__footer__nav cursor-pointer' onClick={prevPage}>
        <img src={arrowLeftActive} alt='' />
        Prev
      </div>
      <div className='cTable__footer__pages'>
        <Pages />
      </div>
      <div className='cTable__footer__nav cursor-pointer' onClick={nextPage}>
        Next
        <img src={arrowRightInactive} alt='' />
      </div>
    </div>
  );
};

export default Pagination;
