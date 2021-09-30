import React, { useEffect, useState } from 'react';
import { Tooltip, Icon } from 'antd';
import Axios from 'axios';
function LikeDislikes(props) {
    
    const [Likes, setLikes] = useState(0)
    const [Dislikes, setDislikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(null)
    const [DisLikeAction, setDisLikeAction] = useState(null)
    let variable = {}

    if(props.video) {
        variable = { videoId: props.videoId , userId: props.userId }
    } else {
        variable = { commentId: props.commentId, userId: props.userId }
    }

    useEffect(() => {
        Axios.post('/api/like/getLikes', variable)
        .then(response => {
            if(response.data.success) {

                // 좋아요 숫자
                setLikes(response.data.likes.length)

                // 이미 좋아요를 눌렀는지
                response.data.likes.map(like => {
                    if(like.userId === props.userId) {
                        setLikeAction('liked')
                    }
                })

            } else {
                alert('Likes에 대한 정보를 가져오지 못했습니다.')
            }
        })

        Axios.post('/api/like/getDislikes', variable)
        .then(response => {
            if(response.data.success) {

                // 싫어요 숫자
                setDislikes(response.data.dislikes.length)

                // 이미 싫어요를 눌렀는지
                response.data.dislikes.map(dislike => {
                    if(dislike.userId === props.userId) {
                        setDisLikeAction('disliked')
                    }
                })

            } else {
                alert('DisLike에 대한 정보를 가져오지 못했습니다.')
            }
        })
    }, [])

    const onLike = () => {

        if(LikeAction === null) {
            Axios.post('/api/like/upLike', variable)
                .then(response => {
                    if(response.data.success) {
                        setLikes(Likes + 1)
                        setLikeAction('liked')

                        if(DisLikeAction !== null) {
                            setDisLikeAction(null)
                            setDislikes(Dislikes - 1)
                        }
                    } else {
                        alert('Like를 올리지 못했습니다.')
                    }
                })
        } else {
            Axios.post('/api/like/unLike', variable)
                .then(response => {
                    if(response.data.success) {
                        setLikes(Likes - 1)
                        setLikeAction(null)
                    } else {
                        alert('Like를 내리지 못했습니다.')
                    }
                })
        }

    }

    const onDislike = () => {
        console.log(variable)
        if(DisLikeAction !== null) {
            Axios.post('/api/like/unDislike', variable)
            .then(response => {
                if(response.data.success) {
                    setDislikes(Dislikes - 1)
                    setDisLikeAction(null)

                } else {
                    alert('dislike를 내리지 못했습니다.')
                }
            })
        } else {
            Axios.post('/api/like/upDislike', variable)
            .then(response => {
                if(response.data.success) {
                    setDislikes(Dislikes + 1)
                    setDisLikeAction('disliked')
                    
                    if(LikeAction !== null) {
                        setLikeAction(null)
                        setLikes(Likes - 1)
                    }
                } else {
                    alert('dislike를 올리지 못했습니다.')
                }
            })
        }
    }

    return (
        <div>
            <span key ="comment-basic-like">
                <Tooltip title="Like">
                    <Icon type="like"
                        thme={LikeAction === 'liked' ? 'filled' : 'outlined'}
                        onClick={onLike}
                    />
                </Tooltip>
            <span style={{ paddingLeft:'8px', cursor:'auto' }}> {Likes} </span>
            </span>&nbsp;&nbsp;

            <span key ="comment-basic-dislike">
                <Tooltip title="Dislike">
                    <Icon type="dislike"
                        thme={DisLikeAction === 'disliked' ? 'filled' : 'outlined'}
                        onClick={onDislike}
                    />
                </Tooltip>
            <span style={{ paddingLeft:'8px', cursor:'auto' }}> {Dislikes} </span>
            </span>&nbsp;&nbsp;
        </div>
    )
}

export default LikeDislikes
