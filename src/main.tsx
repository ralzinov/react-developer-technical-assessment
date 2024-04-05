import ReactDOM from 'react-dom/client';
import { CssBaseline } from '@mui/material';
import { Theme } from './Theme.tsx';
import { App } from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Theme>
        <CssBaseline>
            <App />
        </CssBaseline>
    </Theme>,
);
