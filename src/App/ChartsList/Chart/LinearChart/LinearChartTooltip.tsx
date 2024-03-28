import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Card, Divider, Typography } from '@mui/material';
import { TooltipProps } from 'recharts/types/component/Tooltip';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

export const renderTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
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
