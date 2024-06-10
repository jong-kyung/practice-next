import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

import ActionButtons from "./ActionButtons";
import style from "./post.module.css";
import PostArticle from "./PostArticle";
import { faker } from "@faker-js/faker";

dayjs.locale("ko"); // 한국어 설정
dayjs.extend(relativeTime); // 상대시간 플러그인 사용

type Props = {
  noImage?: boolean;
};

export default function Post({ noImage }: Props) {
  const target = {
    postId: 1,
    User: {
      id: "finkd",
      nickname: "Mark Zuckerberg",
      image: "/meta-logo.svg",
    },
    content: "Hello, World!",
    createdAt: new Date(),
    Images: [] as any[],
  };

  if (Math.random() > 0.5 && !noImage) {
    target.Images.push({ imageId: 1, link: faker.image.urlLoremFlickr() });
  }

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
          <div className={style.postImageSection}>
            {target.Images && target.Images.length > 0 && (
              <Link
                href={`/${target.User.id}/status/${target.postId}/photo/${target.Images[0].imageId}`}
                className={style.postImageSection}
              >
                <img src={target.Images[0]?.link} alt='이미지' />
              </Link>
            )}
          </div>
          <ActionButtons />
        </div>
      </div>
    </PostArticle>
  );
}
