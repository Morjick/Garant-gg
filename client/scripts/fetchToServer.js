function fetchToServer(url, method, data) {
  const res = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data)
  })

  return await res.json()
}

export default fetchToServer