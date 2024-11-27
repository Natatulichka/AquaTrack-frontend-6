import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import css from './SignUpForm.module.css';
import { Input } from 'antd';
import Logo from 'components/Logo/logo';
import { useTranslation } from 'react-i18next';

const SignUpForm = () => {
  const { t } = useTranslation();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required(t('validation.requiredEmail'))
      .email(t('validation.validEmail')),
    password: Yup.string()
      .required(t('validation.requiredPassword'))
      .min(6, t('validation.passwordMessage')),
    repeatPassword: Yup.string()
      .required(t('validation.repeatPasswordMessage'))
      .oneOf([Yup.ref('password')], t('validation.oneOf')),
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: '',
      password: '',
      repeatPassword: '',
    },
  });

  const onSubmit = data => {
    console.log(data);
  };
  return (
    <>
      <div className={css.backgroundContainer}>
        <Logo></Logo>
        <form className={css.formContainer} onSubmit={handleSubmit(onSubmit)}>
          <h2 className={css.formTitle}>{t('signUp.title')}</h2>

          <label className={css.label}>{t('signUp.email')}</label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                className={css.input}
                type="text"
                placeholder={t('signUp.placeholderEmail')}
                variant="borderless"
                autoComplete="off"
              />
            )}
          />
          {errors.email && <p className={css.error}>{errors.email.message}</p>}

          <label className={css.label}>{t('signUp.password')}</label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input.Password
                {...field}
                className={css.input}
                type="password"
                placeholder={t('signUp.placeholderPassword')}
                variant="borderless"
              />
            )}
          />
          {errors.password && (
            <p className={css.error}>{errors.password.message}</p>
          )}

          <label className={css.label}>
            {t('signUp.placeholderRepeatPassword')}
          </label>
          <Controller
            name="repeatPassword"
            control={control}
            render={({ field }) => (
              <Input.Password
                {...field}
                className={`${css.input} ${css.lastInput}`}
                type="password"
                placeholder={t('signUp.placeholderRepeatPassword')}
                variant="borderless"
              />
            )}
          />
          {errors.repeatPassword && (
            <p className={`${css.error} ${css.lastError}`}>
              {errors.repeatPassword.message}
            </p>
          )}

          <button type="submit" className={css.btn}>
            {t('signUp.title')}
          </button>

          <div className={css.linkContainer}>
            <p className={css.text}>
              {t('signUp.account')}
              <a className={css.link} href="#">
                {t('signUp.signIn')}
              </a>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUpForm;
