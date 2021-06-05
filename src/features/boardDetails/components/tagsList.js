import React from 'react';
import PropTypes from 'prop-types';
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

TagsList.propTypes = {
  labels: PropTypes.array
}

export default TagsList;