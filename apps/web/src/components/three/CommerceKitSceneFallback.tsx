export function CommerceKitSceneFallback() {
  return (
    <div className="relative min-h-[420px] overflow-hidden rounded-[1.5rem] border bg-[#201a13] p-6 text-white shadow-2xl shadow-stone-950/20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_18%,rgba(241,213,155,0.24),transparent_30%),linear-gradient(135deg,rgba(46,63,52,0.95),rgba(27,27,24,0.98))]" />
      <div className="relative grid min-h-[360px] content-end gap-5">
        <div className="grid grid-cols-3 gap-3">
          {["Launch Kit", "Workshop Seat", "Support Pack"].map((item) => (
            <div key={item} className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
              <div className="mb-4 h-20 rounded-xl bg-[#f1d59b]" />
              <p className="text-sm font-semibold">{item}</p>
            </div>
          ))}
        </div>
        <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#f1d59b]">Cart to fulfillment</p>
          <p className="mt-2 text-sm text-white/68">Product, checkout, order, and operations stay visible in one commerce flow.</p>
        </div>
      </div>
    </div>
  );
}
