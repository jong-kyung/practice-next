"use client";

import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";

import style from "./trendSection.module.css";
import Trend from "@/app/(afterLogin)/_component/Trend";
import { getTrends } from "../_lib/getTrends";
import { HashTag } from "@/model/HashTag";

export default function TrendSection() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const { data } = useQuery<HashTag[]>({
    queryKey: ["trends"],
    queryFn: getTrends,
    staleTime: 60 * 1000, // 1분
    gcTime: 300 * 1000, // 5분
    enabled: !!session?.user, // 로그인 상태일 때만 트렌드 가져오기
  });

  if (pathname === "/explore") return null;
  if (session?.user) {
    return (
      <div className={style.trendBg}>
        <div className={style.trend}>
          <h3>나를 위한 트렌드</h3>
          {data?.map((trend, idx) => (
            <Trend trend={trend} key={idx} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={style.trendBg}>
      <div className={style.noTrend}>트렌드를 가져올 수 없습니다.</div>
    </div>
  );
}
