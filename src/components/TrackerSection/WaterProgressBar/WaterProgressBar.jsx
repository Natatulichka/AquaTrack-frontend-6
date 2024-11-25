import {
  StyledPercentOfDrinkingWater,
  StyledProgressBarSpan,
  StyledProgressDot,
} from './styled';
import css from './WaterProgressBar.module.css';
import clsx from 'clsx';

const WaterProgressBar = () => {
  const percentOfDrinkingWater = 1000;

  return (
    <div className={css.progressBarWrapper}>
      <div className={css.progressBar}>
        <p className={css.progressBarText}>Today</p>
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
