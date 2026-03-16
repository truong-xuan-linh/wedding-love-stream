import { Suspense } from "react";
import MainContent from "@/components/MainContent";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ guest?: string }>;
}) {
  const params = await searchParams;
  const guestName = params.guest || null;

  return (
    <Suspense fallback={<div className="fixed inset-0 bg-black" />}>
      <MainContent guestName={guestName} />
    </Suspense>
  );
}
