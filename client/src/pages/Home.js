import React, { useContext, useState } from 'react'
import { useQuery } from '@apollo/client'
import { Grid, TransitionGroup } from 'semantic-ui-react'
import PostCard from '../components/PostCard'
import PostForm from '../components/PostForm'

import { AuthContext } from '../context/auth'
import { FETCH_POSTS_QUERY } from '../util/graphql'

import Filtering from '../components/Filtering'
import { useLocation } from '../util/hooks'

const Home = () => {
  const [categorySelected, setCategory] = useState()
  const { user } = useContext(AuthContext)
  const { loading, data } = useQuery(FETCH_POSTS_QUERY, {
    variables: { category: categorySelected },
  })

  if (!data) {
    return null
  }

  const location = useLocation()
  console.log(location)

  const { getPosts: posts } = data

  return (
    <div>
      <Grid>
        <Grid.Column floated='left' width={5}>
          <Grid.Row>
            {user && (
              <Grid.Column>
                <PostForm />
              </Grid.Column>
            )}
          </Grid.Row>
        </Grid.Column>
        <Grid.Row></Grid.Row>
      </Grid>

      <Grid columns={3}>
        <Grid.Row>
          <Grid.Column width={6}>
            <Filtering
              categorySelected={categorySelected}
              onFilterChange={setCategory}
            />
          </Grid.Column>
          <Grid.Column>
            <h1>Recents Posts</h1>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          {loading ? (
            <h2>Loading posts ...</h2>
          ) : (
            <TransitionGroup>
              {posts &&
                posts.map((post) => (
                  <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                    <PostCard post={post} />
                  </Grid.Column>
                ))}
            </TransitionGroup>
          )}
        </Grid.Row>
        <Grid.Row>
          {location.laoded
            ? JSON.stringify(location)
            : 'Location data not available'}
        </Grid.Row>
      </Grid>
    </div>
  )
}

export default Home
