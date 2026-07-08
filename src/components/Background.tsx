export function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#09090B]">
      <div className="absolute inset-0 grid-bg opacity-60 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="absolute -top-40 left-[-10%] h-[32rem] w-[32rem] animate-blob rounded-full bg-indigo-600/25 blur-[110px]" />
      <div className="absolute top-1/3 right-[-10%] h-[28rem] w-[28rem] animate-blob-slow rounded-full bg-cyan-500/20 blur-[110px]" />
      <div className="absolute bottom-[-10%] left-1/4 h-[30rem] w-[30rem] animate-blob rounded-full bg-violet-600/20 blur-[120px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#09090B]" />
    </div>
  );
}
