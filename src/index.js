import React, { useEffect, useState } from 'react'
import fetchSocualwallSeed from './services/socialwall.service'
import SocialwallItem from './components/SocialwallItem'
import 'bootstrap/dist/css/bootstrap.min.css'

export const Socialwall = () => {
  const [socialwallItems, setSocialwallItems] = useState([])
  // eslint-disable-next-line no-unused-vars
  const [limit, setLimit] = useState(10)
  const [skip, setSkip] = useState(0)
  const [facebookScriptLoaded, setFacebookScriptLoaded] = useState(false)
  const [twitterScriptLoaded, setTwitterScriptLoaded] = useState(false)

  const handleFetchMore = () => {
    setSkip(skip + 10)
  }
  // Load Facebook script
  useEffect(() => {
    const fbScript =
      'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v6.0&appId=1670671936512008&autoLogAppEvents=1'
    const twitterScript = 'https://platform.twitter.com/widgets.js'
    const script = require('scriptjs')
    script(fbScript, 'facebook-embed', () => {
      setFacebookScriptLoaded(true)
      console.log('Facebook scripts loaded')
    })
    script(twitterScript, 'twitter-embed', () => {
      setTwitterScriptLoaded(true)
      console.log('Twitter scripts loaded')
    })
  }, [])

  useEffect(() => {
    async function fetchData(limit, skip) {
      const res = await fetchSocualwallSeed(limit, skip)
      const apiResponse = await res.json()
      if (apiResponse.status === 1) {
        setSocialwallItems([...socialwallItems, ...apiResponse.data])
        window.twttr.widgets.load()
        window.FB.init({
          appId: '1670671936512008',
          autoLogAppEvents: true,
          xfbml: true,
          version: 'v6.0'
        })
      } else console.log(apiResponse)
    }
    if (facebookScriptLoaded && twitterScriptLoaded) fetchData(limit, skip)
  }, [skip, facebookScriptLoaded, twitterScriptLoaded])

  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          {socialwallItems.map((item) => (
            <SocialwallItem key={item._id} item={item} />
          ))}
          {/* <SocialwallList feed={s}></SocialwallList> */}
        </div>
      </div>
      <div className='row mt-2 mb-2'>
        <div className='col text-center'>
          <button onClick={handleFetchMore} className='btn btn-success'>
            Load More...
          </button>
        </div>
      </div>
    </div>
  )
}
