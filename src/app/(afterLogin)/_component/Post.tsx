import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

import ActionButtons from "./ActionButtons";
import style from "./post.module.css";
import PostArticle from "./PostArticle";

dayjs.locale("ko"); // 한국어 설정
dayjs.extend(relativeTime); // 상대시간 플러그인 사용

export default function Post() {
  const target = {
    postId: 1,
    User: {
      id: "finkd",
      nickname: "Mark Zuckerberg",
      image: "/meta-logo.svg",
    },
    content: "Hello, World!",
    createdAt: new Date(),
    Images: [],
  };

  return (
    <PostArticle post={target}>
      <div className={style.postWrapper}>
        <div className={style.postUserSection}>
          <Link href={`/${target.User.id}`} className={style.postUserImage}>
            <img src={target.User.image} alt={target.User.nickname} />
            <div className={style.postShade} />
          </Link>
        </div>
        <div className={style.postBody}>
          <div className={style.postMeta}>
            <Link href={`/${target.User.id}`}>
              <span className={style.postUserName}>{target.User.nickname}</span>
              &nbsp;
              <span className={style.postUserId}>@{target.User.id}</span>
              &nbsp; · &nbsp;
            </Link>
            <span className={style.postDate}>{dayjs(target.createdAt).fromNow(true)}</span>
          </div>
          <div>{target.content}</div>
          <div className={style.postImageSection}></div>
          <ActionButtons />
        </div>
      </div>
    </PostArticle>
  );
}
