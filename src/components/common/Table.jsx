import { useTranslation } from 'react-i18next';
import arrowLeftActive from '../../assets/arrowLeftActive.svg';
import arrowRightInactive from '../../assets/arrowRightInactive.svg';
import SmButton from '../form/SmButton';

const Table = ({ headings, data, actions }) => {
  const { t } = useTranslation();

  return (
    <div className='cTable'>
      <table className='cTable--table'>
        <thead>
          <tr>
            {headings.map(heading => (
              <th key={heading.value}>
                {heading.value && t(`table.${heading.key}`)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={row.id || rowIndex}>
              {headings.map(heading => (
                <td key={`${heading.key}_${rowIndex}`}>
                  {heading.key === 'actions' ? actions : row[heading.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className='cTable__footer'>
        <div className='cTable__footer__nav'>
          <img src={arrowLeftActive} alt='' />
          Prev
        </div>
        <div className='cTable__footer__pages'>
          <SmButton title='1' variant='glassSelected' />
          <SmButton title='2' variant='glass' />
          <div className='cTable__footer__pages__dots'>...</div>
          <SmButton title='4' variant='glass' />
          <SmButton title='5' variant='glass' />
        </div>
        <div className='cTable__footer__nav'>
          Next
          <img src={arrowRightInactive} alt='' />
        </div>
      </div>
    </div>
  );
};

export default Table;
