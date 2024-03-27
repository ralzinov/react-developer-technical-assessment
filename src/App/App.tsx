import Box from '@mui/material/Box';
import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import { LinearChartType } from './ChartsList/Chart/LinearChart';
import { ChartsList, IChartConfig } from './ChartsList';
import { Header } from './Header.tsx';

const MOCK_CONFIG: IChartConfig[] = [
    {
        id: 'a',
        name: 'Chart 1',
        config: {
            field: 'name',
            layers: [
                {
                    field: 'uv',
                    name: 'UV',
                    source: {
                        url: '/fred/series/observations',
                        params: {
                            series_id: 'GNPCA'
                        }
                    },
                    type: LinearChartType.LINE
                },
                {
                    name: 'Amount',
                    source: {
                        url: '/fred/series/observations',
                        params: {
                            series_id: 'MSIALLP'
                        }
                    },
                    type: LinearChartType.AREA,
                    field: 'amt'
                },
                {
                    name: 'PV',
                    source: {
                        url: '/fred/series/observations',
                        params: {
                            series_id: 'MSIMZMP'
                        }
                    },
                    type: LinearChartType.COLUMNS,
                    field: 'pv'
                }
            ]
        }

    }
];

export const App: React.FC = () => {
    const [charts, setCharts] = useState<IChartConfig[]>(MOCK_CONFIG);

    return (
        <Box width={'100vw'} height={'100vh'}>
            <Container maxWidth="lg">
                <Stack spacing={2}>
                    <Header />
                    <ChartsList charts={charts} />
                </Stack>
            </Container>
        </Box>
    );
};
