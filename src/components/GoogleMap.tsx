import React from 'react'

const GoogleMap = ({ location }: { location: string }): JSX.Element => {
  let params = `key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}&q=${location.replace(' ', '+')}`

  return (
    <iframe
      title='Map'
      width='525'
      height='400'
      style={{ border: '0' }}
      loading='lazy'
      allowFullScreen
      src={`https://www.google.com/maps/embed/v1/place?${params}`}
    ></iframe>
  )
}

export default GoogleMap
