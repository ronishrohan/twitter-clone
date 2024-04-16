import { faBookmark, faEnvelope, faHeart, faImage, faMessage, faPaperPlane, faUser } from "@fortawesome/free-regular-svg-icons";
import {   faEllipsisH, faFeatherPointed, faHouse, faPlus, faRetweet, faSearch,faUser as faUser_filled,faWandMagicSparkles, faHeart as faHeartFilled, faBookmark as faBookmarkFilled, faSpinner, faArrowLeft, faArrowsSplitUpAndLeft, faPen, faCheck, faRightFromBracket, faArrowRightFromBracket, faEnvelope as faEnvelope_filled } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export const icons = {
    home: <FontAwesomeIcon icon={faHouse}></FontAwesomeIcon>,
    search: <FontAwesomeIcon icon={faSearch} ></FontAwesomeIcon>,
    messages: <FontAwesomeIcon icon={faEnvelope} ></FontAwesomeIcon>,
    messages_filled: <FontAwesomeIcon icon={faEnvelope_filled}></FontAwesomeIcon>,
    profile: <FontAwesomeIcon icon={faUser} ></FontAwesomeIcon>,
    profile_filled: <FontAwesomeIcon icon={faUser_filled}></FontAwesomeIcon>,
    feather: <FontAwesomeIcon icon={faFeatherPointed} ></FontAwesomeIcon>,
    ellipsis: <FontAwesomeIcon icon={faEllipsisH} ></FontAwesomeIcon>,
    plus : <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>,
    wand: <FontAwesomeIcon icon={faWandMagicSparkles}></FontAwesomeIcon>,
    media: <FontAwesomeIcon icon={faImage} ></FontAwesomeIcon>,
    comments: <FontAwesomeIcon icon={faMessage}></FontAwesomeIcon>,
    retweet: <FontAwesomeIcon icon={faRetweet}></FontAwesomeIcon>,
    heart: <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>,
    heart_filled: <FontAwesomeIcon icon={faHeartFilled}></FontAwesomeIcon>,
    bookmark : <FontAwesomeIcon icon={faBookmark}></FontAwesomeIcon>,
    bookmark_filled: <FontAwesomeIcon icon={faBookmarkFilled}></FontAwesomeIcon>,
    spinner: <FontAwesomeIcon icon={faSpinner}></FontAwesomeIcon>,
    plane: <FontAwesomeIcon icon={faPaperPlane}></FontAwesomeIcon>,
    arrow: <FontAwesomeIcon icon={faArrowLeft} ></FontAwesomeIcon>,
    spinner: <FontAwesomeIcon icon={faSpinner}></FontAwesomeIcon>,
    arrow_up_left: <FontAwesomeIcon icon={faArrowsSplitUpAndLeft}></FontAwesomeIcon>,
    pen: <FontAwesomeIcon icon={faPen} ></FontAwesomeIcon>,
    check: <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>,
    logout: <FontAwesomeIcon icon={faArrowRightFromBracket}></FontAwesomeIcon>

}