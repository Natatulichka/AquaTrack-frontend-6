import css from './WaterDailyNorma.module.css';

const WaterDailyNorma = () => {
  const dayliNorma = 1.5;

  return (
    <div className={css.dayliNorma}>
      <p className={css.dayliNormaLiters}>{dayliNorma}L</p>
      <p className={css.dayliNormaText}>My daily norma</p>
    </div>
  );
};

export default WaterDailyNorma;
