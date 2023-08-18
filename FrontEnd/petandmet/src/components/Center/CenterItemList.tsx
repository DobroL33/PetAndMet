import { Grid, Box, Typography, Skeleton, Container } from '@mui/material'
import pay from 'images/kakaopay.png'
import { useNavigate } from 'react-router-dom'
import { ItemStore, ItemDetail } from 'hooks/Item/CenterItemStore'

function List() {
  const itemStore = ItemStore()
  const items = itemStore.centerItems
  // console.log(items)

  const navigate = useNavigate()

  const goToItemDetail = (item: ItemDetail) => {
    navigate(`/donate/item/${item.center_item_id}`, { state: item })
  }

  if (items.length !== 0) {
    return (
      <Box>
        <Container>
          <Grid container spacing={2}>
            {items.map((item, index) => (
              <Grid key={index} item xs={12} sm={6} m="0">
                <Box sx={{ width: '100%', my: 5 }}>
                  {item ? (
                    <img
                      style={{ width: '100%', height: 200, objectFit: 'cover' }}
                      alt={pay}
                      src={pay}
                      onClick={() => {
                        goToItemDetail(item)
                      }}
                    />
                  ) : (
                    <Skeleton variant="rectangular" width="100%" height={200} />
                  )}
                  {item ? (
                    <Box sx={{ pr: 2 }}>
                      <Typography gutterBottom variant="body2">
                        {item.item_name}
                      </Typography>
                      <Typography
                        display="block"
                        variant="caption"
                        color="text.secondary"
                      >
                        {item.item_target_price}
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
      </Box>
    )
  } else {
    return (
      <>
        <h1>등록된 후원 물품이 없습니다.</h1>
      </>
    )
  }
}

// function CenterItemList({ items }: CentersItemListProps) {
//   return (
//     <Box >
//       <List items={items} />
//     </Box>
//   )
// }
export default List
