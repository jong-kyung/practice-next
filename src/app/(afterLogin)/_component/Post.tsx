import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

import style from "./post.module.css";

dayjs.locale("ko"); // 한국어 설정
dayjs.extend(relativeTime); // 상대시간 플러그인 사용

export default function Post() {
  const target = {
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
    <article className={style.post}>
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
        </div>
      </div>
    </article>
  );
}
