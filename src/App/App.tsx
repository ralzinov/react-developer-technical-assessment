import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import Container from '@mui/material/Container';
import { LinearChartType } from './ChartsList/Chart/LinearChart';
import { ChartsList, IChartConfig } from './ChartsList';
import { WhiteButton } from './components/WhiteButton.tsx';
import { Header } from './Header.tsx';

const MOCK_CONFIG: IChartConfig[] = [
    {
        id: 'chart2',
        name: 'Chart 2',
        config: {
            field: 'name',
            layers: [],
        },
    },
    {
        id: 'chart1',
        name: 'Chart 1',
        config: {
            field: 'name',
            layers: [
                {
                    field: 'uv',
                    name: 'UV',
                    source: {
                        url: '/fred/series/observations',
                        name: 'Source 1',
                        params: {
                            series_id: 'GNPCA',
                        },
                    },
                    type: LinearChartType.LINE,
                    color: '#1d8a1d'
                },
                {
                    name: 'Amount',
                    source: {
                        url: '/fred/series/observations',
                        name: 'Source 2',
                        params: {
                            series_id: 'MSIALLP',
                        },
                    },
                    type: LinearChartType.AREA,
                    field: 'amt',
                    color: '#d23a3a'
                },
                {
                    name: 'PV',
                    source: {
                        url: '/fred/series/observations',
                        name: 'Source 1',
                        params: {
                            series_id: 'MSIMZMP',
                        },
                    },
                    type: LinearChartType.AREA,
                    field: 'pv',
                    color: '#4e3db9'
                },
            ],
        },
    },
];

export const App: React.FC = () => {
    const [charts, setCharts] = useState<IChartConfig[]>(MOCK_CONFIG);

    const addChart = () => {
        const newChart = {
            id: crypto.randomUUID(),
            name: `Chart ${charts.length + 1}`,
            config: {
                field: 'name',
                layers: [],
            },
        };
        setCharts([newChart, ...charts]);
    };

    return (
        <Stack width={'100vw'} height={'100vh'} spacing={3} alignItems={'center'}>
            <Header>
                <Container maxWidth="lg">
                    <Stack justifyContent={'space-between'} direction={'row'} alignItems={'center'}>
                        <Typography variant={'subtitle2'}>FRED</Typography>
                        <WhiteButton variant={'outlined'} onClick={addChart}>
                            Add chart
                        </WhiteButton>
                    </Stack>
                </Container>
            </Header>
            <Container maxWidth="lg">
                <ChartsList charts={charts} onChange={setCharts} onCreate={addChart} />
            </Container>
        </Stack>
    );
};
