function Border({ content, isRight, number }) {
  return (
    <div>
      {isRight ? (
        <div className='big scale-x-[-1]'>
          <div className='big__number'>
            <div className='scale-x-[-1]'>{number}</div>
          </div>
          <div className='big__container'>
            <div className='big__container__inner'>
              <div className='big__container__inner__inner'>
                <div className='big__container__inner__inner__inner'>
                  <div className='scale-x-[-1]'>{content}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='big'>
          <div className='big__number'>
            <div>{number}</div>
          </div>
          <div className='big__container'>
            <div className='big__container__inner'>
              <div className='big__container__inner__inner'>
                <div className='big__container__inner__inner__inner'>
                  <div>{content}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {isRight ? (
        <div className='bigMob scale-x-[-1]'>
          <div className='bigMob__number'>
            <div className='scale-x-[-1]'>{number}</div>
          </div>
          <div className='bigMob__container'>
            <div className='bigMob__container__inner'>
              <div className='bigMob__container__inner__inner'>
                <div className='bigMob__container__inner__inner__inner'>
                  <div className='scale-x-[-1]'>{content}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='bigMob'>
          <div className='bigMob__number'>
            <div>{number}</div>
          </div>
          <div className='bigMob__container'>
            <div className='bigMob__container__inner'>
              <div className='bigMob__container__inner__inner'>
                <div className='bigMob__container__inner__inner__inner'>
                  <div>{content}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Border;
