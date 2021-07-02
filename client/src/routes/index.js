/**
 * @file index.js
 * @author K Sai Charan
*/

import loadable from '@loadable/component';
import SMLoader from '../components/shared/SMLoader';

export const routes = [
    {
        path: '/home',
        Component: loadable(() => import('../components/home'), { fallback: <SMLoader /> }),
    }
]