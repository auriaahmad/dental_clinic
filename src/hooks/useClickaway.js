import { useEffect } from 'react';

const useClickAway = (ref, onClickAway) => {
  useEffect(() => {
    const handleClickAway = event => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickAway();
      }
    };

    document.addEventListener('mousedown', handleClickAway);
    return () => {
      document.removeEventListener('mousedown', handleClickAway);
    };
  }, [ref, onClickAway]);
};

export default useClickAway;
