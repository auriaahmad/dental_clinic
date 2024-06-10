import plus from '../../../../assets/plus.svg';
function Question({ question }) {
  return (
    <div>
      <div className='question'>
        <div className='question__inner'>
          <div>{question}</div>
          <img src={plus} alt='plus' />
        </div>
      </div>

      <div className='questionMob'>
        <div className='questionMob__inner'>
          <div>{question}</div>
          <img src={plus} alt='plus' />
        </div>
      </div>
    </div>
  );
}

export default Question;
