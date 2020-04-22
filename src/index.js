import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import fetchSocualwallSeed from './services/socialwall.service'
import SocialwallItem from './components/SocialwallItem'
// import styles from './styles.module.css'

export const Socialwall = () => {
  const [socialwallItems, setSocialwallItems] = useState([])
  // eslint-disable-next-line no-unused-vars
  const [limit, setLimit] = useState(10)
  const [skip, setSkip] = useState(0)

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
      script(twitterScript, 'twitter-embed', () => {
        async function fetchData(limit, skip) {
          const res = await fetchSocualwallSeed(limit, skip)
          const apiResponse = await res.json()
          if (apiResponse.status === 1) {
            setSocialwallItems([...socialwallItems, ...apiResponse.data])
            window.twttr.widgets.load()
            window.FB.init({
              appId: 'your-app-id',
              autoLogAppEvents: true,
              xfbml: true,
              version: 'v6.0'
            })
          } else console.log(apiResponse)
        }
        fetchData(limit, skip)
      })
    })
  }, [skip])

  return (
    <Container fluid='md'>
      <Row>
        <Col>
          {socialwallItems.map((item) => (
            <SocialwallItem key={item._id} item={item} />
          ))}
          {/* <SocialwallList feed={s}></SocialwallList> */}
        </Col>
        <Col>
          <Button onClick={handleFetchMore}>Fetch More...</Button>
        </Col>
      </Row>
    </Container>
  )
}
