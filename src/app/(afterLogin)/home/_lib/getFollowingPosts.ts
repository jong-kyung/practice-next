export async function getFollowingPosts() {
  const res = await fetch(`http://localhost:9090/api/posts/followings`, {
    next: {
      tags: ["posts", "followings"], // 캐시초기화를 위한 태그
    },
    credentials: "include",
    cache: "no-store", // 캐시 사용하지 않음
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
