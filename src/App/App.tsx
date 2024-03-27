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
                        params: {
                            series_id: 'GNPCA',
                        },
                    },
                    type: LinearChartType.LINE,
                },
                {
                    name: 'Amount',
                    source: {
                        url: '/fred/series/observations',
                        params: {
                            series_id: 'MSIALLP',
                        },
                    },
                    type: LinearChartType.AREA,
                    field: 'amt',
                },
                {
                    name: 'PV',
                    source: {
                        url: '/fred/series/observations',
                        params: {
                            series_id: 'MSIMZMP',
                        },
                    },
                    type: LinearChartType.COLUMNS,
                    field: 'pv',
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
