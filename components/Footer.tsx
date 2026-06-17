import { FOOTER_LINKS } from "@/lib/data";

export default function Footer() {
  return (
    <>
      {/* CTA Strip */}
      <section
        className="mx-6 mt-16 mb-0 bg-blue-50 border border-blue-100 rounded-3xl p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
        aria-label="Call to action"
      >
        <div>
          <h2 className="text-xl font-light tracking-tight text-blue-900 mb-1">
            Ready to find your neighborhood?
          </h2>
          <p className="text-sm text-blue-600">Takes 2 minutes. No sign-up required.</p>
        </div>
        <a
          href="#search"
          className="flex-shrink-0 bg-blue-600 text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-blue-700 transition-colors shadow-[0_4px_14px_rgba(37,99,235,0.22)]"
        >
          Start matching →
        </a>
      </section>

      {/* Footer */}
      <footer
        className="border-t border-slate-100 mt-14 py-8 px-6"
        role="contentinfo"
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 flex-wrap">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center" aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <path d="M8 1.5C5.5 1.5 3.5 3.5 3.5 6c0 3.5 4.5 8 4.5 8s4.5-4.5 4.5-8C12.5 3.5 10.5 1.5 8 1.5z" fill="white"/>
              </svg>
            </div>
            <span className="text-sm font-semibold text-slate-900">City Agent</span>
          </div>
          <nav className="flex gap-6" aria-label="Footer navigation">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-slate-400 hover:text-slate-700 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <p className="text-xs text-slate-400">© 2025 City Agent. Built for people, not algorithms.</p>
        </div>
      </footer>
    </>
  );
}
