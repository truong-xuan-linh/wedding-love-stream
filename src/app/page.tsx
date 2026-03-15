import { Suspense } from "react";
import MainContent from "@/components/MainContent";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ to?: string; name?: string }>;
}) {
  const params = await searchParams;
  const guestName = params.to || params.name || null;

  return (
    <Suspense fallback={<div className="fixed inset-0 bg-black" />}>
      <MainContent guestName={guestName} />
    </Suspense>
  );
}
