import React, { useState, useEffect } from 'react'
import SingleComment from './SingleComment'

function ReplyComment(props) {

    const [ChildCommentNumber, setChildCommentNumber] = useState(0)
    const [OpenReplyComments, setOpenReplyComments] = useState(false)
    console.log("number" , ChildCommentNumber)
    useEffect(() => {
        
        let commentNumber = 0;

        props.commentLists.map((comment) => {
            if(comment.responseTo === props.parentCommentId) {
                commentNumber++
                console.log("commentLists??:", props.commentLists)
                console.log("number는??:", ChildCommentNumber)
            }
        })

        setChildCommentNumber(commentNumber)
        
    }, [props.commentLists, props.parentCommentId])

    let renderReplyComment = (parentCommentId) => 
        props.commentLists.map((comment, index) => (
            <React.Fragment>
                {comment.responseTo === parentCommentId &&
                    <div style={{ width: '80%', marginLeft: '3%' }}>
                        <SingleComment refreshFunction={props.refreshFunction} comment={comment} postId={props.postId}/>
                        <ReplyComment refreshFunction={props.refreshFunction} commentLists={props.commentLists} postId={props.postId}  parentCommentId={comment._id}/>
                    </div>
                }
            </React.Fragment>
        ))

    const onHandleChange = () => {
        setOpenReplyComments(!OpenReplyComments)
    }

    return (
        <div>

            {ChildCommentNumber > 0 && 
                <p style={{ fontSize: '14px', margin: 0, color: 'gray'}} onClick={onHandleChange}>
                    View {ChildCommentNumber} more comment(s)
                </p>
            }

            {OpenReplyComments &&
                renderReplyComment(props.parentCommentId)
            }

        </div>
    )
}

export default ReplyComment
