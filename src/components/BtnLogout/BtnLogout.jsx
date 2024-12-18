import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { logout } from "../../redux/auth/operations";
import css from "./BtnLogout.module.css";
import { useNavigate } from "react-router-dom";

const BtnLogout = ({ handleClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()).then(({ error }) => {
      if (!error) {
        navigate("/");
        handleClose();
      }
    });
  };

  return (
    <>
      <button type="button" onClick={handleLogout} className={css.btnLogout}>
        {t("logOutModal.logOut")}
      </button>
    </>
  );
};

export default BtnLogout;