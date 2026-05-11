import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import styles from './logo-wall.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Logo {
  src: string;
  alt: string;
  href?: string;
}

interface Props {
  heading?: string;
  logos: Logo[];
}

const LOOP_DELAY = 1.5;
const DURATION   = 0.9;

function shuffleArray<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function LogoWall({ heading, logos }: Props) {
  const rootRef     = useRef<HTMLDivElement>(null);
  const listRef     = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const poolRef     = useRef<HTMLDivElement[]>([]);
  const patternRef  = useRef<number[]>([]);
  const patternIndexRef  = useRef(0);
  const visibleItemsRef  = useRef<HTMLDivElement[]>([]);
  const visibleCountRef  = useRef(0);

  useEffect(() => {
    if (!rootRef.current || !listRef.current) return;

    const list  = listRef.current;
    const items = Array.from(list.querySelectorAll<HTMLDivElement>('[data-logo-wall-item]'));
    const originalTargets = items
      .map(item => item.querySelector<HTMLDivElement>('[data-logo-wall-target]'))
      .filter(Boolean) as HTMLDivElement[];

    const isVisible = (el: HTMLElement) =>
      window.getComputedStyle(el).display !== 'none';

    const setup = () => {
      timelineRef.current?.kill();

      visibleItemsRef.current = items.filter(isVisible);
      visibleCountRef.current = visibleItemsRef.current.length;

      patternRef.current = shuffleArray(
        Array.from({ length: visibleCountRef.current }, (_, i) => i)
      );
      patternIndexRef.current = 0;

      poolRef.current = originalTargets
        .filter(t => !visibleItemsRef.current.some(item => item.contains(t)))
        .concat(
          visibleItemsRef.current
            .map(item => item.querySelector<HTMLDivElement>('[data-logo-wall-target]'))
            .filter(Boolean) as HTMLDivElement[]
        );

      poolRef.current = shuffleArray(originalTargets.slice());

      timelineRef.current = gsap.timeline({ repeat: -1, repeatDelay: LOOP_DELAY });
      timelineRef.current.call(swapNext, [], `+=${LOOP_DELAY}`);
      timelineRef.current.addLabel('loop', LOOP_DELAY);
      timelineRef.current.to({}, { duration: LOOP_DELAY }, 'loop');
    };

    const swapNext = () => {
      const nowCount = items.filter(isVisible).length;
      if (nowCount !== visibleCountRef.current) { setup(); return; }
      if (!poolRef.current.length) return;

      const idx = patternRef.current[patternIndexRef.current % visibleCountRef.current];
      patternIndexRef.current++;

      const container = visibleItemsRef.current[idx];
      const parent =
        container.querySelector<HTMLDivElement>('[data-logo-wall-target-parent]') || container;

      if (parent.querySelectorAll('[data-logo-wall-target]').length > 1) return;

      const current  = parent.querySelector<HTMLDivElement>('[data-logo-wall-target]');
      const incoming = poolRef.current.shift();
      if (!incoming) return;

      gsap.set(incoming, { yPercent: 50, autoAlpha: 0, visibility: 'hidden' });
      parent.appendChild(incoming);
      gsap.set(incoming, { visibility: 'visible' });

      if (current) {
        gsap.to(current, {
          yPercent: -50,
          autoAlpha: 0,
          duration: DURATION,
          ease: 'expo.inOut',
          onComplete: () => {
            gsap.set(current, { clearProps: 'all' });
            current.remove();
            poolRef.current.push(current);
          },
        });
      }

      gsap.to(incoming, {
        yPercent: 0,
        autoAlpha: 1,
        duration: DURATION,
        delay: 0.1,
        ease: 'expo.inOut',
      });
    };

    setup();

    const scrollTrigger = ScrollTrigger.create({
      trigger: rootRef.current,
      start: 'top bottom',
      end: 'bottom top',
      onEnter:     () => timelineRef.current?.play(),
      onLeave:     () => timelineRef.current?.pause(),
      onEnterBack: () => timelineRef.current?.play(),
      onLeaveBack: () => timelineRef.current?.pause(),
    });

    const handleVisibilityChange = () => {
      if (document.hidden) timelineRef.current?.pause();
      else timelineRef.current?.play();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      timelineRef.current?.kill();
      scrollTrigger.kill();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <section className={styles['logo-wall-section']}>
      {heading && <h2 className={styles['logo-wall-section__heading']}>{heading}</h2>}
      <div ref={rootRef} className={styles['logo-wall']}>
        <div ref={listRef} className={styles['logo-wall__list']}>
          {logos.map((logo, index) => (
            <div key={index} data-logo-wall-item="" className={styles['logo-wall__item']}>
              <div data-logo-wall-target-parent="" className={styles['logo-wall__logo']}>
                <div className={styles['logo-wall__logo-sizer']} />
                <div data-logo-wall-target="" className={styles['logo-wall__logo-target']}>
                  {logo.href ? (
                    <a href={logo.href} target="_blank" rel="noopener noreferrer" aria-label={logo.alt}>
                      <img src={logo.src} alt={logo.alt} className={styles['logo-wall__logo-img']} />
                    </a>
                  ) : (
                    <img src={logo.src} alt={logo.alt} className={styles['logo-wall__logo-img']} />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
