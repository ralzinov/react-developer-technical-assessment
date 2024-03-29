import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import Container from '@mui/material/Container';
import { ChartsList, IChartConfig } from './ChartsList';
import { WhiteButton } from './components/WhiteButton.tsx';
import { Header } from './Header.tsx';
import { getInitialLayerConfig } from './utils.ts';

export const App: React.FC = () => {
    const [charts, setCharts] = useState<IChartConfig[]>([]);

    const addChart = () => {
        const newChart = {
            id: crypto.randomUUID(),
            name: `Chart ${charts.length + 1}`,
            config: {
                field: 'name',
                layers: [getInitialLayerConfig()],
            },
        };
        setCharts([newChart, ...charts]);
    };

    return (
        <Stack height={'100vh'} spacing={3} alignItems={'center'}>
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
                <ChartsList
                    charts={charts}
                    onChange={(v) => {
                        setCharts(v);
                    }}
                    onCreate={addChart}
                />
            </Container>
        </Stack>
    );
};
