import React from 'react';
import { NameType, Payload, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { Card, Divider, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

export const LinearChartTooltip: React.FC<{
    label: string;
    active: boolean;
    payload: Payload<ValueType, NameType>[];
}> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <Card>
                <Stack spacing={2} padding={'8px 16px'}>
                    <Typography variant={'subtitle2'}>Date: {label}</Typography>
                    <Divider />
                    {payload.map((item) => (
                        <Stack direction={'row'} key={item.dataKey} alignItems={'center'} spacing={1}>
                            <Box sx={{ backgroundColor: item.color }} display={'flex'} height={'4px'} width={'20px'} />
                            <Typography>
                                {item.value} {item.unit}
                            </Typography>
                        </Stack>
                    ))}
                </Stack>
            </Card>
        );
    }

    return null;
};
