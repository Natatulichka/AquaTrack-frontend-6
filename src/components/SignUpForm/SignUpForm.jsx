import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import css from './SignUpForm.module.css';
import { Input } from 'antd';
import Logo from 'components/Logo/logo';
import { useTranslation } from 'react-i18next';
import Section from 'components/Section/Section.jsx';
import { Link, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/auth/operations';
import { useEffect } from 'react';
import { selectAuthIsLoggedIn } from '../../redux/auth/selector';
import { clearError } from '../../redux/auth/slice';
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
    trigger,
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: '',
      password: '',
      repeatPassword: '',
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedIn = useSelector(selectAuthIsLoggedIn);
  const error = useSelector(state => state.auth.error);

  const getErrorMessage = () => {
    if (!error) return null;

    switch (error.status) {
      case 400:
        return error.message || 'Invalid registration details.';
      case 409:
        return t('signUp.notuniquemail');
      case 500:
        return 'Server error. Please try again later.';
      default:
        return error.message || 'Something went wrong.';
    }
  };

  useEffect(() => {
    if (loggedIn) {
      navigate('/tracker');
    }
  });

  const onSubmit = data => {
    const { email, password } = data;
    dispatch(register({ email, password }));
  };

  const serverErrorMessage = getErrorMessage();

  return (
    <Section>
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
                onChange={e => {
                  field.onChange(e);
                  dispatch(clearError());
                  trigger('email');
                }}
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
                onChange={e => {
                  field.onChange(e);
                  dispatch(clearError());
                  trigger('password');
                }}
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
                onChange={e => {
                  field.onChange(e);
                  dispatch(clearError());
                  trigger('password');
                }}
              />
            )}
          />
          {errors.repeatPassword && (
            <p className={`${css.error} ${css.lastError}`}>
              {errors.repeatPassword.message}
            </p>
          )}

          {/* Отображение только одной ошибки */}
          {!errors.repeatPassword && !errors.password && error && (
            <p className={`${css.error} ${css.lastError}`}>
              {serverErrorMessage}
            </p>
          )}

          <button type="submit" className={css.btn}>
            {t('signUp.title')}
          </button>

          <div className={css.linkContainer}>
            <p className={css.text}>
              {t('signUp.account')}
              <Link className={css.link} to="/signin">
                {t('signUp.signIn')}
              </Link>
            </p>
          </div>
        </form>
      </div>
    </Section>
  );
};

export default SignUpForm;
