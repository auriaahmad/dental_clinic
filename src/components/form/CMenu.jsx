import { Menu, Popover, Transition } from '@headlessui/react';
import { Fragment, useRef, useState } from 'react';
import chevronDownGray from '../../assets/chevronDownGray.svg';
import CMenuItem from './CMenuItem';
import { useTranslation } from 'react-i18next';
import useClickAway from '../../hooks/useClickaway';

const CMenu = ({
  style,
  value,
  setValue,
  label,
  options,
  translation,
  noCustomInput,
  panelStyle,
}) => {
  const { t } = useTranslation();
  const ref = useRef();
  const [isOpen, setIsOpen] = useState(false);

  useClickAway(ref, () => setIsOpen(false));

  return (
    <Popover
      as='div'
      className='relative inline-block text-left w-full z-100 '
      style={{ ...style }}
      ref={ref}
    >
      {label && (
        <label className='text-grayish text-[0.8rem] p-0'>{label}</label>
      )}
      <Popover.Button
        className='cMenu flex h-8 w-full cursor-pointer items-center gap-2 self-stretch rounded-[7px] border border-solid border-gray300 bg-white px-[11px] py-[9px] pr-[6px] shadow-3 mt-3'
        onClick={() => setIsOpen(true)}
      >
        <span className={'text-sm font-normal not-italic leading-[14px]'}>
          {options?.find(op => op._id === value)?.name || value}
        </span>
        <img src={chevronDownGray} alt='' />
      </Popover.Button>

      <Transition
        as={Fragment}
        show={isOpen}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Popover.Panel
          className='rounded-[1rem] absolute  left-1/2 z-20 mt-1  w-full origin-top-right -translate-x-2/4 bg-white shadow-container focus:outline-none py-3 px-2'
          style={{ ...panelStyle }}
        >
          <div className={' px-1 py-[5px]  flex flex-col gap-2'}>
            {options?.map(item => (
              <CMenuItem
                title={
                  translation
                    ? t(`${translation}.${item['title'] || item['name']}`)
                    : item.title || item.name
                }
                theme={item.theme}
                onClick={() => {
                  setValue(item._id || item.title);
                  setIsOpen(false);
                }}
                key={item._id || item.title}
              />
            ))}
          </div>
          {!noCustomInput && (
            <input
              type='text'
              placeholder='Write Manually'
              className='w-full h-10 shadow-container rounded-full text-center text-[12px]'
              onChange={e => setValue(e.target.value)}
              value={value}
            />
          )}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default CMenu;
