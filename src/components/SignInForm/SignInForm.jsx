import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import css from './SignInForm.module.css';
import { Input } from 'antd';
import Logo from 'components/Logo/logo';
import { useTranslation } from 'react-i18next';
import Section from 'components/Section/Section.jsx';
import { Link, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/auth/operations';
import { selectAuthIsLoggedIn } from '../../redux/auth/selector';
import { useEffect } from 'react';
import { clearError } from '../../redux/auth/slice';

const SignInForm = () => {
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required(t('validation.requiredEmail'))
      .email(t('validation.validEmail')),
    password: Yup.string()
      .required(t('validation.requiredPassword'))
      .min(6, t('validation.passwordMessage')),
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
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loggedIn = useSelector(selectAuthIsLoggedIn);
  const error = useSelector(state => state.auth.error);

  useEffect(() => {
    if (loggedIn) {
      navigate('/tracker');
    }

    dispatch(clearError());
  }, [loggedIn, dispatch, clearError]);

  const onSubmit = data => {
    dispatch(login(data));
  };

  const getErrorMessage = () => {
    if (!error) return null;

    switch (error.status) {
      case 400:
        return error.message || 'Invalid request';
      case 401:
        return t('signIn.unauthorized');
      case 500:
        return 'Server error. Please try again later';
      default:
        return error.message || 'Something went wrong';
    }
  };

  const serverErrorMessage = getErrorMessage();

  {
    !errors.email && !errors.password && error && (
      <p className={`${css.error} ${css.lastError}`}>{serverErrorMessage}</p>
    );
  }

  return (
    <Section>
      <div className={css.backgroundContainer}>
        <Logo></Logo>
        <form className={css.formContainer} onSubmit={handleSubmit(onSubmit)}>
          <h2 className={css.formTitle}>{t('signIn.title')}</h2>

          <label className={css.label}>{t('signIn.email')}</label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                className={css.input}
                type="text"
                placeholder={t('signIn.placeholderEmail')}
                variant="borderless"
                autoComplete="off"
                onChange={e => {
                  field.onChange(e);
                  dispatch(clearError());
                }}
              />
            )}
          />

          {errors.email && <p className={css.error}>{errors.email.message}</p>}
          {error && <p className={css.error}>{serverErrorMessage}</p>}

          <label className={css.label}>{t('signIn.password')}</label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input.Password
                {...field}
                className={`${css.input} ${css.lastInput}`}
                type="password"
                placeholder={t('signIn.placeholderPassword')}
                variant="borderless"
                onChange={e => {
                  field.onChange(e);
                  dispatch(clearError());
                }}
              />
            )}
          />
          {errors.password && (
            <p className={`${css.error} ${css.lastError}`}>
              {errors.password.message}
            </p>
          )}
          {error && (
            <p className={`${css.error} ${css.lastError}`}>
              {serverErrorMessage}
            </p>
          )}

          <button type="submit" className={css.btn}>
            {t('signIn.title')}
          </button>

          <div className={css.linkContainer}>
            <p className={css.text}>
              {t('signIn.account')}
              <Link className={css.link} to="/signup">
                {t('signIn.signUp')}
              </Link>
            </p>
          </div>
        </form>
      </div>
    </Section>
  );
};

export default SignInForm;
