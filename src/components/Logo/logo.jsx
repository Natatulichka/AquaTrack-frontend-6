
import PropTypes from 'prop-types';
import styles from './logo.module.css';

const Logo = ({className}) => {
  return (
    <div className={`${styles.logoWrapper} ${className}`}>
      <span className={styles.logoText}>AQUATRACK</span>
    </div>

  );
};

Logo.propTypes = {
  className: PropTypes.string,
};

export default Logo;