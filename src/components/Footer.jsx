
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
    <footer className="bg-navy-deep text-cream/70">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-14">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <a href="#top" className="flex items-center gap-2.5">
              <img src="/granvayalogo.jpg" alt="Granvaya" className="h-8 w-auto rounded-lg" />
              <span className="font-display text-[18px] font-medium text-cream">Granvaya</span>
            </a>
            <p className="mt-3 text-[13.5px]">{footer.tagline}</p>
          </div>

          <div className="flex gap-16">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-wide text-cream/40">Contact</p>
              <a href={`mailto:${footer.contact}`} className="mt-2 block text-[13.5px] hover:text-cream">
                {footer.contact}
              </a>
            </div>
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-wide text-cream/40">Follow</p>
              <div className="mt-2 flex gap-3">
                {footer.links.map((label) => {
                  const Icon = iconMap[label];
                  return (
                    <a
                      key={label}
                      href="#"
                      aria-label={label}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-cream/10 hover:bg-cream/20 transition-colors"
                    >
                      <Icon width={14} height={14} />
                    </a>
                  );
                })}
              </div>
            </div>
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-wide text-cream/40">Legal</p>
              <div className="mt-2 flex flex-col gap-1.5">
                {footer.legal.map((label) => (
                  <a key={label} href="#" className="text-[13.5px] hover:text-cream">
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-cream/10 pt-6 text-[12.5px] text-cream/45">
          {footer.disclaimer}
        </div>
      </div>
    </footer>
  );
}
