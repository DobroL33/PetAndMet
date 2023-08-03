import {Grid, Box, Typography, Skeleton, Container} from '@mui/material'
import pay from '../../images/kakaopay.png'

const data = [
  {
    src: pay,
    title: 'Don Diablo @ Tomorrowland Main Stage 2019 | Official…',
    price: 'Don Diablo',
    Center: '396k Center'
  },
  {
    src: pay,
    title: 'Queen - Greatest Hits',
    price: 'Queen Official',
    Center: '40M Center',
  },
  {
    src: pay,
    title: 'Calvin Harris, Sam Smith - Promises (Official Video)',
    price: 'Calvin Harris',
    Center: '130M Center',
  },

];

interface LoadProps {
  loading?: boolean;
}

function List(props: LoadProps) {
  const { loading = false } = props;

  return (
    <Container>
      <div style={{ padding: 20 }}>
        <Typography variant="h4" style={{ color: '#FFA629', fontWeight: 'bold' }}>
          후원 물품 목록
        </Typography>
      </div>
    <Grid container spacing={2}>
      {(loading ? Array.from(new Array(3)) : data).map((item, index) => (
          <Grid key={index} item xs={12} sm={6} md={3}>
          <Box sx={{ width: '100%', my: 5 }}>
            {item ? (
                <img
                style={{ width: '100%', height: 200, objectFit: 'cover' }}
                alt={item.title}
                src={item.src}
                />
                ) : (
                    <Skeleton variant="rectangular" width="100%" height={200} />
                    )}
            {item ? (
                <Box sx={{ pr: 2 }}>
                <Typography gutterBottom variant="body2">
                  {item.title}
                </Typography>
                <Typography display="block" variant="caption" color="text.secondary">
                  {item.price}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {`${item.Center}`}
                </Typography>
              </Box>
            ) : (
                <Box sx={{ pt: 0.5 }}>
                <Skeleton />
                <Skeleton width="60%" />
              </Box>
            )}
          </Box>
        </Grid>
      ))}
    </Grid>
    </Container>
  );
}

function ItemList() {
    return (
        <Box sx={{ overflow: 'hidden' }}>
            <List />
        </Box>
  );
}
export default ItemList
export{}