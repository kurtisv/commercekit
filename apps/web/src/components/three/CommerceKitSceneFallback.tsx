export function CommerceKitSceneFallback() {
  return (
    <div className="relative h-full overflow-hidden bg-[radial-gradient(circle_at_22%_20%,rgba(241,213,155,0.18),transparent_17rem),radial-gradient(circle_at_78%_26%,rgba(126,143,114,0.18),transparent_20rem),linear-gradient(150deg,#201a13,#34281d_46%,#231d16)] p-5 text-white sm:p-6">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:42px_42px] opacity-35" />

      <div className="relative flex h-full items-center justify-center">
        <div className="grid w-full max-w-[36rem] gap-4 sm:grid-cols-[1.1fr_0.9fr]">
          <div className="relative rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(63,47,33,0.96),rgba(34,28,21,0.98))] p-5 shadow-[0_28px_80px_rgba(8,6,4,0.45)]">
            <div className="absolute inset-x-8 top-0 h-12 rounded-b-[1.5rem] bg-[linear-gradient(180deg,rgba(241,213,155,0.14),transparent)]" />
            <div className="relative">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-[#f1d59b]">Client Launch Kit</p>
              <h3 className="mt-3 max-w-[12rem] text-3xl font-semibold leading-tight text-[#fff7e8]">Checkout ready product flow</h3>
              <p className="mt-3 max-w-[16rem] text-sm leading-6 text-white/64">
                Product, checkout, paid order, and fulfillment are treated as one premium commerce object.
              </p>

              <div className="mt-6 rounded-[1.5rem] border border-[#6c5843] bg-[linear-gradient(145deg,#b8844c,#8d6036)] p-4 text-[#201a13] shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]">
                <div className="rounded-[1.15rem] border border-black/10 bg-[#d8b181]/55 px-4 py-8 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em]">Client Launch Kit</p>
                  <p className="mt-3 text-sm font-medium">Product packaging</p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#f7ead3]">
                <span className="rounded-full border border-white/12 bg-white/8 px-3 py-1.5">Stripe-ready</span>
                <span className="rounded-full border border-white/12 bg-white/8 px-3 py-1.5">CK-2026-0001</span>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[1.6rem] border border-white/10 bg-[linear-gradient(145deg,rgba(250,244,234,0.95),rgba(236,224,206,0.94))] p-4 text-[#231d16] shadow-[0_22px_56px_rgba(8,6,4,0.25)]">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#8b6b43]">Checkout card</p>
              <div className="mt-3 rounded-[1.2rem] border border-black/8 bg-[#20251f] px-4 py-5 text-white">
                <p className="text-sm font-semibold">Checkout ready</p>
                <p className="mt-2 text-xs text-white/70">Paid via card</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-[0.95fr_1.05fr]">
              <div className="rounded-[1.4rem] border border-white/10 bg-[#fff7eb] p-4 text-[#231d16] shadow-[0_18px_44px_rgba(8,6,4,0.16)]">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#8b6b43]">Receipt</p>
                <p className="mt-3 text-sm font-semibold">CK-2026-0001</p>
                <p className="mt-1 text-xs text-[#6d5c49]">Paid</p>
                <p className="mt-1 text-xs text-[#6d5c49]">Fulfillment</p>
              </div>

              <div className="rounded-[1.4rem] border border-white/10 bg-white/8 p-4 shadow-[0_18px_44px_rgba(8,6,4,0.18)] backdrop-blur">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#f1d59b]">Pipeline</p>
                <div className="mt-4 flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/78">
                  {["Cart", "Checkout", "Paid", "Fulfillment"].map((step, index) => (
                    <div key={step} className="flex items-center gap-2">
                      <span className={`grid size-6 place-items-center rounded-full ${index < 3 ? "bg-[#f1d59b] text-[#201a13]" : "bg-white/12 text-white"}`}>
                        {index + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
