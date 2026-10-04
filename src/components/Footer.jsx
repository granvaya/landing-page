
import { footer } from "../data/content";

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  );
}
function TelegramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M21 4L2.5 11.5l6 2 2 6.5 3-4 4.5 3.3L21 4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M8.5 13.5L18 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function XIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M4 4l16 16M20 4L4 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

const iconMap = { Instagram: InstagramIcon, Telegram: TelegramIcon, X: XIcon };

export default function Footer() {
  return (
    <footer className="overflow-hidden bg-ink text-paper/75">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 pt-14">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <a href="#top" className="flex items-center gap-3">
              <img src="/granvayalogo.jpg" alt="Granvaya" className="h-9 w-auto border-2 border-paper/60" />
              <span className="font-display text-[22px] text-paper">Granvaya</span>
            </a>
            <p className="mt-4 font-mono text-[12px] uppercase tracking-[0.2em] text-marker">{footer.tagline}</p>
          </div>

          <div className="flex flex-wrap gap-x-16 gap-y-8">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-paper/45">Contact</p>
              <a href={`mailto:${footer.contact}`} className="mt-3 block text-[17px] hover:text-marker">
                {footer.contact}
              </a>
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-paper/45">Follow</p>
              <div className="mt-3 flex gap-3">
                {footer.links.map((label) => {
                  const Icon = iconMap[label];
                  return (
                    <a
                      key={label}
                      href="#"
                      aria-label={label}
                      className="flex h-9 w-9 items-center justify-center border-2 border-paper/40 transition-colors hover:border-marker hover:bg-marker hover:text-ink"
                    >
                      <Icon width={15} height={15} />
                    </a>
                  );
                })}
              </div>
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-paper/45">Legal</p>
              <div className="mt-3 flex flex-col gap-1.5">
                {footer.legal.map((label) => (
                  <a key={label} href="#" className="text-[17px] hover:text-marker">
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <p className="mt-12 border-t border-paper/20 pt-5 font-mono text-[11.5px] uppercase tracking-[0.12em] text-paper/45">
          {footer.disclaimer}
        </p>
      </div>

      {/* oversized wordmark, bleeding off the bottom edge */}
      <div
        aria-hidden="true"
        className="font-display select-none whitespace-nowrap text-center text-[clamp(4.5rem,21vw,19rem)] leading-[0.74] text-paper -mb-[0.1em] pt-6"
      >
        Granvaya
      </div>
    </footer>
  );
}
