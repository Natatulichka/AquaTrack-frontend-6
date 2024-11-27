import { useTranslation } from 'react-i18next';
import {
  StyledPercentOfDrinkingWater,
  StyledProgressBarSpan,
  StyledProgressDot,
} from './styled';
import css from './WaterProgressBar.module.css';
import clsx from 'clsx';

const WaterProgressBar = () => {
  const { t } = useTranslation();
  const percentOfDrinkingWater = 50;

  return (
    <div className={css.progressBarWrapper}>
      <div className={css.progressBar}>
        <p className={css.progressBarText}>{t('chooseDate.today')}</p>
        <div className={css.progressLine}>
          <span className={css.progressBarBackground}></span>

          <StyledProgressBarSpan $percent={percentOfDrinkingWater}>
            <StyledPercentOfDrinkingWater>
              {percentOfDrinkingWater}%
            </StyledPercentOfDrinkingWater>
          </StyledProgressBarSpan>
          <StyledProgressDot $percent={percentOfDrinkingWater} />
        </div>
        <div className={css.progressBarPercentageWrapper}>
          <p className={css.progressBarPercentage}>0%</p>
          <p className={clsx(css.progressBarPercentage, css.centered)}>50%</p>
          <p className={css.progressBarPercentage}>100%</p>
        </div>
      </div>
    </div>
  );
};

export default WaterProgressBar;
