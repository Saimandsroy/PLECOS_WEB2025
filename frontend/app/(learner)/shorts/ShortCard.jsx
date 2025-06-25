import React from 'react'
import { HeartIcon, ChatBubbleIcon, EyeOpenIcon, DotsHorizontalIcon } from '@radix-ui/react-icons'
import './ShortCard.css'

const ShortCard = ({ short, onCommentClick, animate, showComments }) => (
  <div
    className="short-card"
    style={{
      marginLeft: showComments ? 0 : 0,
      transition: 'margin-left 0.4s cubic-bezier(.4,0,.2,1), box-shadow 0.4s cubic-bezier(.4,0,.2,1)',
      boxShadow: animate
        ? '0 8px 32px rgba(30,41,59,0.12)'
        : '0 2px 16px rgba(30,41,59,0.06)'
    }}
  >
    <div className="short-card-preview">
      <span>Short Video Preview</span>
    </div>
    <div className="short-card-sidebar">
      <div className="short-card-action">
        <HeartIcon width={24} height={24} />
        <span>{short.likes}</span>
      </div>
      <div className="short-card-action" style={{ cursor: 'pointer' }} onClick={onCommentClick}>
        <ChatBubbleIcon width={24} height={24} />
        <span>{short.comments}</span>
      </div>
      <div className="short-card-action">
        <EyeOpenIcon width={24} height={24} />
        <span>{short.views}</span>
      </div>
      <div className="short-card-action short-card-action--bottom">
        <button className="short-card-more">
          <DotsHorizontalIcon width={24} height={24} color="#fff" />
        </button>
      </div>
    </div>
  </div>
)

export default ShortCard