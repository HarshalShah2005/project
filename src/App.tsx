import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Layout from './components/Layout';
import LoadingScreen from './components/LoadingScreen';

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/HomePage'));
const TopicsPage = lazy(() => import('./pages/TopicsPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const Test = lazy(() => import('./pages/Test'));
const Landing = lazy(() => import('./pages/Landing'));

function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/test" element={<Test />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="topics" element={<TopicsPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;