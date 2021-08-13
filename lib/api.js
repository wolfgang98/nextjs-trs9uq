const API_URL = 'http://94.16.111.141:1337';

async function fetchAPI(query, { variables } = {}) {
  const res = await fetch(`${API_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }

  return json.data;
}

export async function getBucketById(id) {
  const data = await fetchAPI(`
    query BucketById($where: JSON) {
      buckets(where: $where) {
        id
        title
        nodes {
          id
          x
          y
          w
          h
          drop {
            id
            type
            title
          }
        }
      }
    }
  `,
    {
      variables: {
        where: {
          id,
        },
      },
    }
  )
  return data?.buckets[0];
}