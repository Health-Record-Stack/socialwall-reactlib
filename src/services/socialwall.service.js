export default function fetchSocualwallSeed(limit, skip) {
  // eslint-disable-next-line no-undef
  return fetch(
    `http://localhost:44556/api/socialwalls?limit=${limit}&skip=${skip}`
  )
}
