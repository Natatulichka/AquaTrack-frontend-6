import SharedLayout from 'components/SharedLayout/SharedLayout.jsx';
import { lazy } from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const SignInPage = lazy(() => import('./pages/SignInPage/SignInPage'));
const SignUpPage = lazy(() => import('./pages/SignUpPage/SignUpPage'));
const TrackerPage = lazy(() => import('./pages/TrackerPage/TrackerPage'));

const TestPage = lazy(() => import('./pages/TestPage/TestPage'));

function App() {
  return (
    <SharedLayout>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/test" element={<TestPage />} />
        {/* <Route path="/tracker" element={<TrackerPage />} /> */}
        <Route
          path="/tracker"
          element={
            <PrivateRoute>
              <TrackerPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </SharedLayout>
  );
}

export default App;
