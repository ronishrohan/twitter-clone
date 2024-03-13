import { faEnvelope, faUser } from "@fortawesome/free-regular-svg-icons";
import {   faEllipsisH, faFeatherPointed, faHouse, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export const icons = {
    home: <FontAwesomeIcon icon={faHouse}></FontAwesomeIcon>,
    search: <FontAwesomeIcon icon={faSearch} ></FontAwesomeIcon>,
    messages: <FontAwesomeIcon icon={faEnvelope} ></FontAwesomeIcon>,
    profile: <FontAwesomeIcon icon={faUser} ></FontAwesomeIcon>,
    feather: <FontAwesomeIcon icon={faFeatherPointed} ></FontAwesomeIcon>,
    ellipsis: <FontAwesomeIcon icon={faEllipsisH} ></FontAwesomeIcon>

}