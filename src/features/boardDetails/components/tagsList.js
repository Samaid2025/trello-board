import React from 'react';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';


const TagsList = ({labels}) => {
  const getAvatar = (name) => {
    return name.charAt(0).toUpperCase()
  }
  return (
    <>
    {
      labels.map(label => <Chip
        avatar={<Avatar>{getAvatar(label)}</Avatar>}
        label={label}
        color="primary"
        variant="outlined"
      />)
    }
    </>
  )
}

export default TagsList;