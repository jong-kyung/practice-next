"use client";

import { useContext } from "react";

import { TabContext } from "./TabProvider";
import FollowingPosts from "./FollowingPosts";
import PostRecommends from "./PostRecommneds";

export default function TabDecider() {
  const { tab } = useContext(TabContext);

  if (tab === "rec") {
    return <PostRecommends />;
  }

  return <FollowingPosts />;
}
