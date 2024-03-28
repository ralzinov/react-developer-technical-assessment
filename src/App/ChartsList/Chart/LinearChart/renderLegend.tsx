import { Props } from 'recharts/types/component/DefaultLegendContent';
import Box from '@mui/material/Box';
import { List, ListItem, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';

export const renderLegend = ({ payload }: Props) => {
    return (
        <Box display={'flex'} justifyContent={'center'}>
            <List>
                {payload?.map((entry, index) => (
                    <ListItem key={`item-${index}`}>
                        <Stack direction={'row'} spacing={1} alignItems={'center'}>
                            <Box
                                sx={{ backgroundColor: entry.color, minWidth: '8px' }}
                                display={'flex'}
                                height={'8px'}
                                width={'8px'}
                                borderRadius={'8px'}
                            />
                            <Typography variant={'body2'}>{entry.value}</Typography>
                        </Stack>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};
