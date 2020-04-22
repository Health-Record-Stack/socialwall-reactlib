import React from 'react'
import decode from 'decode-html'

const SocialwallItem = ({ item }) => {
  return (
    <div>
      <div
        className='content'
        dangerouslySetInnerHTML={{
          __html: decode(item.html)
        }}
      />
    </div>
  )
}

export default SocialwallItem
