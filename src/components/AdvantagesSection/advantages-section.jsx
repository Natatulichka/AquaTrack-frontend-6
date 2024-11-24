import styles from "./advantages-section.module.css";
import { FaCircle } from "react-icons/fa";

const AdvantagesSection = () => {
  return (
    <section className={styles.AdvantagesSection}>
      <div className={styles.container}>
        <div className={styles.buttonCustomers}>
          <button className={styles.button}>
            <div className={styles.imageContainer}>
              <img src="src/assets/img/customers/customer_1_mob_1x.webp" alt="Customer 1" className={styles.image} />
              <img src="src/assets/img/customers/customer_2_mob_1x.webp" alt="Customer 2" className={styles.image} />
              <img src="src/assets/img/customers/customer_3_mob_1x.webp" alt="Customer 3" className={styles.image} />
  </div>
            <h3 className={styles.textCustomers}>Our <span className={styles.accent}>happy</span> customers</h3>
          </button>
        </div>
        <div className={styles.buttonsBenefits}>
          <button className={styles.buttonHabitDrive}>
            <FaCircle className={styles.icon} />
            <a href="#" className={styles.habitDrive}>Habit drive</a>
          </button>
          <button className={styles.buttonViewStatistics}>
            <a href="#" className={styles.viewStatistics}>View statistics</a>
          </button>
          <button className={styles.buttonPersonalRateSetting}>
            <a href="#" className={styles.personalRateSetting}>Personal rate setting</a>
          </button>

        </div>
      </div>

    </section>
  );
};

export default AdvantagesSection;