import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import FavoriteIcon from '@mui/icons-material/Favorite'
import logo from 'images/logo.png'

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}))

const AnimalInfo = ['이름', '나이', '성별', '보호일']

function CardInfoLive() {
  // const [expanded, setExpanded] = React.useState(false);

  // const handleExpandClick = () => {
  //     setExpanded(!expanded);
  // };

  return (
    <Card sx={{ maxWidth: 250, borderRadius: 5 }}>
      <CardMedia
        component="img"
        image={logo}
        style={{ width: '100%' }}
        alt="Paella dish"
      />
      <CardContent sx={{ padding: '0 !important', textAlign: 'left' }}>
        <Typography variant="body2" color="text.secondary">
          {AnimalInfo.map((info, idx) => (
            <>
              <span>{info} : </span>
              <span>000</span>
              <br />
            </>
          ))}
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
        </Typography>
      </CardContent>
      {/* <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>  
      </CardActions> */}
    </Card>
  )
}

export default CardInfoLive
export {}
