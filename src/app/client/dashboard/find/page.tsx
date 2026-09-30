import { FindBoard } from "@/components/client/FindBoard";

type FindPageProps = {
  searchParams: Promise<{ book?: string; kind?: string }>;
};

export default async function ClientFindPage({ searchParams }: FindPageProps) {
  const { book, kind } = await searchParams;
  return <FindBoard bookSlug={book} kind={kind} />;
}
