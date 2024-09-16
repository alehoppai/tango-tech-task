import { Test } from "@/components/test";

export default function Home() {
  return (
    <div className="bg-slate-900 min-h-screen w-full text-primary flex-col items-center gap-12 p-4">
      <h1>Search Jokes</h1>
      <Test />
    </div>
  );
}
