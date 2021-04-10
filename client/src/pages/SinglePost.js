import React, { useContext, useState, useRef, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { Button, Card, Grid, Icon, Image, Label, Form } from 'semantic-ui-react'
import moment from 'moment'
import { useForm } from '../util/hooks'
import { FETCH_POST_QUERY } from '../util/queries'
import LikeButton from '../components/LikeButton'
import Comments from '../components/Comments'
import { AuthContext } from '../context/auth'
import NewPopup from '../util/NewPopup'
import {
  SUBMIT_COMMENT_MUTATION,
  UPDATE_POST_MUTATION,
} from '../util/mutations'

const SinglePost = (props) => {
  const [toggle, setToggle] = useState(false)
  const postId = props.match.params.postId
  const { user } = useContext(AuthContext)
  const commentInputRef = useRef(null)
  const [comment, setComment] = useState('')
  const { data } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  })
  const { values, onChange, onSubmit, setValues } = useForm(
    updatePostCallback,
    {
      body: '',
      postId,
    }
  )
  const [updatePost] = useMutation(UPDATE_POST_MUTATION, {
    variables: values,

    update(proxy, result) {
      setToggle(false)
    },
    onError(err) {
      console.log(err && err.graphQLErrors[0] ? err.graphQLErrors[0] : err)
    },
  })

  function updatePostCallback() {
    updatePost()
  }

  useEffect(() => {
    if (!data) {
      return
    }
    setValues((prevState) => ({ ...prevState, body: data.getPost.body }))
  }, [data, postId])
  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION)

  function handleCommentSubmit() {
    submitComment({
      update() {
        setComment('')
        commentInputRef.current.blur()
      },
      variables: {
        postId,
        body: comment,
      },
    })
  }

  if (!data) {
    return null
  }

  const { getPost: post } = data

  let postMarkup

  if (!post) {
    postMarkup = <p>Loading...</p>
  } else {
    const {
      id,
      body,
      category,
      createdAt,
      author: { username: authorName, imageUrl: authorImg },
      comments,
      likes,
      likeCount,
      commentCount,
    } = post

    postMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image floated='right' size='small' src={authorImg} />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{authorName}</Card.Header>
                <div className='floated'>
                  <Card.Meta>
                    {moment(createdAt).fromNow()}
                    {`-${category}`}
                  </Card.Meta>
                  <Card.Meta>
                    {user && user.username === authorName && (
                      <Icon
                        onClick={() => setToggle(true)}
                        name='pencil alternate'
                      ></Icon>
                    )}
                  </Card.Meta>
                </div>
                {!toggle ? (
                  <Card.Description>{body}</Card.Description>
                ) : (
                  <Form onSubmit={onSubmit}>
                    <Form.Field>
                      <Form.Input
                        className='EditInput'
                        placeholder={body}
                        name='body'
                        onChange={onChange}
                        value={values.body}
                      />
                      <Button color='teal' type='submit'>
                        Save
                      </Button>
                    </Form.Field>
                  </Form>
                )}
              </Card.Content>
              <hr />
              <Card.Content extra>
                <LikeButton user={user} post={{ id, likeCount, likes }} />
                <NewPopup content='Comments'>
                  <Button
                    as='div'
                    labelPosition='right'
                    onClick={() => console.log('Comment')}
                  >
                    <Button basic color='blue'>
                      <Icon name='comments' />
                    </Button>
                    <Label basic color='blue' pointing='left'>
                      {commentCount}
                    </Label>
                  </Button>
                </NewPopup>
              </Card.Content>
            </Card>
            {user && (
              <Card fluid>
                <Card.Content>
                  <p>Post a comment</p>
                  <Form>
                    <div className='ui action input fluid'>
                      <input
                        type='text'
                        name='comment'
                        placeholder='Left comment'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        ref={commentInputRef}
                      />
                      <button
                        type='submit'
                        className='ui button teal'
                        disabled={comment.trim() === ''}
                        onClick={handleCommentSubmit}
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
                </Card.Content>
              </Card>
            )}
            <Comments postId={postId} comments={comments} user={user} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }

  return postMarkup
}

export default SinglePost
