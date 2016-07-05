import React, { PropTypes } from 'react'
import less from './style.less'
import IconButton from '../IconButton'

const PATH = 'http://www.pixiv.net/member_illust.php'

const renderTag = (tag) => (<a
  key={tag.text}
  href={tag.url}
  className={less.tag}
>{tag.text}</a>)

const Profile = ({ hidden, illust = { tags: [] }, actions }) => {
  const visibal = !!illust.illustId

  const {
    illustId, illustTitle,
    userId, userName, profileImg
  } = illust

  return (
    <div className={less.profile} hidden={hidden}>
      <header className={less.header} hidden={!visibal}>
        <div className={less.action}>
          <IconButton
            title="ブックマーク(B)"
            active={illust.isBookmarked}
            onClick={actions.onBookmarkClick}
          >bookmark</IconButton>
          <IconButton
            active={illust.isRated}
            title="評価[10点](L)"
            onClick={actions.onRateClick}
          >star</IconButton>
          <IconButton
            title="画像をローカルに保存(D)"
          >file_download</IconButton>
          <IconButton
            title="Twitterでシェアする(S)"
          >share</IconButton>
        </div>
        <h1 className={less.title}>
          <a href={`${PATH}?id=${userId}`} title={userName}>
            <img src={profileImg} alt={userName} width="40" height="40" />
            <span>{userName}</span>
          </a>
          <span className={less.divider} />
          <a href={`${PATH}?mode=medium&illust_id=${illustId}`} title={illustTitle}>
            {illustTitle}
          </a>
        </h1>
      </header>
      <div className={less.body} hidden={!visibal}>
        <div className={less.item}>
          <span>{illust.date}</span>
          <span className={less.divider} />
          <span>{`${illust.illustPageCount}p`}</span>
        </div>
        <div className={less.item} dangerouslySetInnerHTML={{ __html: illust.caption }} />
        <div className={less.item}>{illust.tags.map(renderTag)}</div>
      </div>
    </div>
  )
}

Profile.propTypes = {
  hidden: PropTypes.bool.isRequired,
  // from react-redux
  illust: PropTypes.object,
  actions: PropTypes.shape({
    onBookmarkClick: PropTypes.func.isRequired,
    onRateClick: PropTypes.func.isRequired
  }).isRequired
}

export default Profile
