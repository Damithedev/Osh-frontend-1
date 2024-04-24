import React, { useState } from "react";
import PostFourMedia from "./PostFourMedia";
import PostThreeMedia from "./PostThreeMedia";
import PostTwoMedia from "./PostTwoMedia";
import PostOneMedia from "./PostOneMedia";
import PostNoMedia from "./PostNoMedia";

const SinglePost = (item) => {
  console.log("ittem", item);
  if (item?.data?.keyMessage?.files?.length == 4) {
    return <PostFourMedia item={item} />;
  } else if (item?.data?.keyMessage?.files?.length == 3) {
    return <PostThreeMedia item={item} />;
  } else if (item?.data?.keyMessage?.files?.length == 2) {
    return <PostTwoMedia item={item} />;
  } else if (item?.data?.keyMessage?.files?.length == 1) {
    return <PostOneMedia item={item} />;
  } else if (item?.data?.keyMessage?.files?.length == 0) {
    return <PostNoMedia item={item} />;
  }
};

export default SinglePost;
