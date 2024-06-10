import { cva } from 'class-variance-authority';
import cn from 'classnames';

const menuItemVariants = cva(
  'text-textGray px-2 text-center flex cursor-pointer items-center justify-center text-[12px] font-normal h-[40px] w-full rounded-full',
  {
    variants: {
      theme: {
        yellow: 'bg-[#FFD966]',
        green: 'bg-[#C5E0B4]',
        blue: 'bg-[#DAE3F3]',
      },
    },
    defaultVariants: {
      theme: 'blue',
    },
  }
);

const CMenuItem = ({ title, theme, onClick }) => {
  return (
    <div className={cn(menuItemVariants({ theme }))} onClick={onClick}>
      {title}
    </div>
  );
};

export default CMenuItem;
