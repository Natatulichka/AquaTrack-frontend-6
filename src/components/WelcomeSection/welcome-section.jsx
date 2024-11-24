import Logo from "../../components/Logo/logo.jsx";
import styles from "../../components/WelcomeSection/welcom-section.module.css";

const WelcomeSection = () => {
  return (
    <section className={styles.WelcomeSection}>
      <div className={styles.container}>
        <Logo className={styles.logo} />
        <div className={styles.content}>
          <div className={styles.textWrapper}>

            <h3 className={styles.subtitle}>Record daily water intake and track</h3>

            <h1 className={styles.title}>Water consumption tracker</h1>

          </div>
          <div className={styles.links}>
            <button className={styles.button}>
              <a href="#" className={styles.tryTracker}>Try tracker</a>

            </button>
            <button className={styles.button}>
              <a href="#" className={styles.signIn}>Sign in</a>
            </button>

          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
