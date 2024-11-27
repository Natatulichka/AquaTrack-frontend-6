import AdvantagesSection from 'components/AdvantagesSection/advantages-section';
import SignUpForm from 'components/SignUpForm/SignUpForm';
import css from './SignUpPage.module.css';

function SignUpPage() {
  return (
    <div className={css.signUpContainer}>
      <SignUpForm></SignUpForm>
      <div className={css.advantageContainer}>
        <AdvantagesSection></AdvantagesSection>
      </div>
    </div>
  );
}

export default SignUpPage;
