import React, { useState } from 'react';
import Question from '../components/question';
import Answer from '../components/answer';
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';
function PlaniLinkSupport() {
  const { t, i18n } = useTranslation();
  const palniLinkQ1 = active => (
    <span
      className={twMerge(
        'text-white text-[16px] font-normal leading-6 transition-all duration-200',
        active && 'text-[20px] font-semibold'
      )}
    >
      <span className='text-white'>{t('planiLinkSupport.q1')}</span>
      <span className='text-white font-normal font-serif'>Plani</span>
      <span className='text-red-500 font-normal font-serif'>Link</span>?
    </span>
  );

  const palniLinkQ1Mob = active => (
    <span
      className={twMerge(
        'text-white text-[14px] font-normal',
        active && 'text-[16px] font-semibold'
      )}
    >
      {t('planiLinkSupport.q1')}
      <span className=' font-serif font-normal text-white'>Plani</span>
      <span className='text-red-500  font-normal font-serif '>Link</span>?
    </span>
  );
  const palniLinkA1 = active => (
    <span
      className={twMerge(
        'text-white text-[16px] font-normal leading-6',
        active && ''
      )}
    >
      <span className='text-white text-20 font-normal leading-6 font-weight-400'>
        {i18n.language === 'en'
          ? 'At the moment, you can contact '
          : 'Por el momento la forma de ponerse en contacto con '}
      </span>
      <span className='text-white font-serif text-20 font-normal leading-6'>
        Plani
      </span>
      <span className='text-red-500 font-serif text-20 font-normal leading-6'>
        Link
      </span>
      {i18n.language === 'en'
        ? ' via email or via WEB Chat. In case of an urgent matter, one of our colleagues will contact you by telephone to the phone number provided. In either case, we will get back to you as soon as possible for the next 5 days. planilink@planilink.com'
        : ' es a través de correo electrónico o por Chat de la WEB. En el caso que exista algún asunto que lo requiera, uno de nuestros compañeros se pondrá en contacto telefónicamente contigo a través del contacto telefónico que has dejado en la web. En cualquiera de los dos casos, te contestaremos lo antes posible en un plazo máximo de 5 días. planilink@planilink.com'}
    </span>
  );

  const palniLinkA1Mob = active => (
    <span
      className={twMerge(
        'text-white text-[14px] font-normal leading-6',
        active && ''
      )}
    >
      {i18n.language === 'en'
        ? 'At the moment, you can contact '
        : 'Por el momento la forma de ponerse en contacto con '}

      <span className='text-white font-serif [14px] font-weight-400 font-normal leading-6'>
        Plani
      </span>
      <span className='text-red-500 font-serif text-[14px] font-weight-400 font-normal leading-6'>
        Link
      </span>
      {i18n.language === 'en'
        ? ' via email or via WEB Chat. In case of an urgent matter, one of our colleagues will contact you by telephone to the phone number provided. In either case, we will get back to you as soon as possible for the next 5 days. planilink@planilink.com'
        : ' es a través de correo electrónico o por Chat de la WEB. En el caso que exista algún asunto que lo requiera, uno de nuestros compañeros se pondrá en contacto telefónicamente contigo a través del contacto telefónico que has dejado en la web. En cualquiera de los dos casos, te contestaremos lo antes posible en un plazo máximo de 5 días. planilink@planilink.com'}
    </span>
  );

  const [activeTabs, setActiveTabs] = useState([]);

  const qAndAData = [
    {
      id: 1,
      question: palniLinkQ1,
      answer: palniLinkA1,
    },
  ];
  const qAndADataMob = [
    {
      id: 1,
      question: palniLinkQ1Mob,
      answer: palniLinkA1Mob,
    },
  ];

  const togglePair = id => {
    const index = activeTabs.findIndex(tab => tab === id);
    if (index !== -1) activeTabs.splice(index, 1);
    else activeTabs.push(id);
    setActiveTabs([...activeTabs]);
  };

  return (
    <div>
      <div className='web'>
        {qAndAData.map(pair => (
          <div className='web__query' key={pair.id}>
            <Answer
              question={pair.question(activeTabs.includes(pair.id))}
              answer={pair.answer(activeTabs.includes(pair.id))}
              active={activeTabs.includes(pair.id)}
              onClick={() => togglePair(pair.id)}
            />
          </div>
        ))}
      </div>
      <div className='webMob'>
        {qAndADataMob.map(pair => (
          <div key={pair.id}>
            <Answer
              question={pair.question(activeTabs.includes(pair.id))}
              answer={pair.answer(activeTabs.includes(pair.id))}
              active={activeTabs.includes(pair.id)}
              onClick={() => togglePair(pair.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlaniLinkSupport;
