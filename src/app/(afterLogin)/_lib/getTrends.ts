export async function getTrends() {
  const res = await fetch(`http://localhost:9090/api/trends`, {
    next: {
      tags: ["trends"], // 캐시초기화를 위한 태그
    },
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