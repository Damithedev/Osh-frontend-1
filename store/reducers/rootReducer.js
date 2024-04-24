import { combineReducers } from "redux";
import authReducer from "./authReducer";
import profileReducer from "./profileReducer";
import channelReducer from "./channelReducer";
import groupReducer from "./groupReducer";
import facetReducer from "./facetReducer";
import timelineReducer from "./timelineReducer";
import starPostReducer from "./starPostReducer";
import postReducer from "./postReducer";
import swiftNotifyReducer from "./swiftNotifyReducer";
import commentReducer from "./commentReducer";
import parentReducer from "./parentReducer";
import facetsReducer from "./facetsReducer";
import chatsReducer from "./chatsReducer";
import activeFacetReducer from "./activeFacetReducer";
import suggestedGroupReducer from "./suggestedGroupsReducer";
import reelTimelineReducer from "./reelTimelineReducer";
import statusTimelineReducer from "./statusTimelineReducer";
import reelCommentReducer from "./reelCommentReducer";
import singleStatusReducer from "./singleStatusReducer";
import suggestedFriendReducer from "./suggestedFriendsReducer";
import callReducer from "./callReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  group: groupReducer,
  channel: channelReducer,
  facet: facetReducer,
  facets: facetsReducer,
  timeline: timelineReducer,
  starredPost: starPostReducer,
  post: postReducer,
  swiftNotify: swiftNotifyReducer,
  comment: commentReducer,
  reelComment: reelCommentReducer,
  parent: parentReducer,
  chats: chatsReducer,
  activeFacet: activeFacetReducer,
  suggestedGroup: suggestedGroupReducer,
  suggestedFriend: suggestedFriendReducer,
  reelTimeline: reelTimelineReducer,
  statusTimeline: statusTimelineReducer,
  singleStatus: singleStatusReducer,
  calls: callReducer,
});

export default rootReducer;
