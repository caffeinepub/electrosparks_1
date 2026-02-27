import React, { useState } from 'react';
import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RegistrationProvider } from './contexts/RegistrationContext';
import PhoenixIntro from './components/PhoenixIntro';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import TechnicalEvents from './pages/TechnicalEvents';
import NonTechnicalEvents from './pages/NonTechnicalEvents';
import Register from './pages/Register';
import Payment from './pages/Payment';
import Success from './pages/Success';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import Dashboard from './pages/Dashboard';

const queryClient = new QueryClient();

function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-site-bg">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function FullscreenLayout() {
  return <Outlet />;
}

const rootRoute = createRootRoute({ component: Layout });
const fullscreenRootRoute = createRootRoute({ component: FullscreenLayout });

const homeRoute = createRoute({ getParentRoute: () => rootRoute, path: '/', component: Home });
const technicalRoute = createRoute({ getParentRoute: () => rootRoute, path: '/technical', component: TechnicalEvents });
const nonTechnicalRoute = createRoute({ getParentRoute: () => rootRoute, path: '/non-technical', component: NonTechnicalEvents });
const registerRoute = createRoute({ getParentRoute: () => rootRoute, path: '/register', component: Register });
const paymentRoute = createRoute({ getParentRoute: () => rootRoute, path: '/payment', component: Payment });
const successRoute = createRoute({ getParentRoute: () => rootRoute, path: '/success', component: Success });
const contactRoute = createRoute({ getParentRoute: () => rootRoute, path: '/contact', component: Contact });
const adminRoute = createRoute({ getParentRoute: () => rootRoute, path: '/admin', component: Admin });
const dashboardRoute = createRoute({ getParentRoute: () => rootRoute, path: '/dashboard', component: Dashboard });

const routeTree = rootRoute.addChildren([
  homeRoute,
  technicalRoute,
  nonTechnicalRoute,
  registerRoute,
  paymentRoute,
  successRoute,
  contactRoute,
  adminRoute,
  dashboardRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  const [showIntro, setShowIntro] = useState(() => {
    return !sessionStorage.getItem('vibecx_intro_shown');
  });

  const handleIntroComplete = () => {
    sessionStorage.setItem('vibecx_intro_shown', 'true');
    setShowIntro(false);
  };

  if (showIntro) {
    return (
      <QueryClientProvider client={queryClient}>
        <RegistrationProvider>
          <PhoenixIntro onComplete={handleIntroComplete} />
        </RegistrationProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <RegistrationProvider>
        <RouterProvider router={router} />
      </RegistrationProvider>
    </QueryClientProvider>
  );
}
