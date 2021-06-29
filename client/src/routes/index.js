import loadable from '@loadable/component';
import SMLoader from '../components/shared/SMLoader';

export const routes = [
    {
        path: '/',
        Component: loadable(() => import('../components/dashboard'), { fallback: <SMLoader /> }),
        redirectTo: '/home'
    },
    {
        path: '/auth',
        Component: loadable(() => import('../components/auth'), { fallback: <SMLoader /> })
    }
]