import { cva } from 'class-variance-authority';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import useScreenSize from '../../hooks/useResize';

const smButtonVariants = cva('cursor-pointer overflow-hidden', {
  variants: {
    variant: {
      small: 'smButton_small',
      small2: 'smButton_small2',
      medium: 'smButton_medium',
      glass: 'smButton_glass',
      glassSelected: 'smButton_glass_selected',
    },
    theme: {
      white: 'bg-white',
      danger: 'danger-item',
      dangerBordered: 'danger-border-item',
      primary: 'primary-item',
      secondary: 'bg-[#EDF2F6] text-[#95A4B7]',
      yellow: 'bg-[#FFD966] text-black',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
  },
  defaultVariants: {
    variant: 'small',
    theme: 'primary',
    weight: 'medium',
  },
});

const SmButton = ({
  title,
  variant,
  theme,
  weight,
  onClick,
  type,
  style,
  titleComplete,
}) => {
  const { t } = useTranslation();

  const { width: screenWidth } = useScreenSize();
  return (
    <button
      className={cn(smButtonVariants({ variant, weight, theme }))}
      onClick={onClick}
      type={type}
      style={
        screenWidth < 600 ? { fontSize: '0.65rem', ...style } : { ...style }
      }
    >
      {titleComplete ? titleComplete : t(`buttons.${title}`)}
      {/* {title} */}
    </button>
  );
};

export default SmButton;
