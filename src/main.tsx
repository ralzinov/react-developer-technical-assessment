import ReactDOM from 'react-dom/client';
import { CssBaseline } from '@mui/material';
import { Theme } from './Theme.tsx';
import { App } from './App';
import { SWRConfig, SWRConfiguration } from 'swr';

const swrConfig: SWRConfiguration = {
    fetcher: (resource, init) => fetch(resource, init).then((res) => res.json()),
};

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Theme>
        <CssBaseline>
            <SWRConfig value={swrConfig}>
                <App />
            </SWRConfig>
        </CssBaseline>
    </Theme>,
);
