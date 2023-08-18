import * as React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
interface CommentListProps {
  commentList: string[]
}
function CommentList(props: CommentListProps) {
  return (
    <List sx={{ width: '80%', bgcolor: 'background.paper' }}>
      {props.commentList.map((comment, index) => (
        <React.Fragment key={index}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="User" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="User ID"
              secondary={
                <>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {comment} {/* 각각의 댓글을 표시 */}
                  </Typography>
                </>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </React.Fragment>
      ))}
    </List>
  )
}

export default CommentList
export {}
