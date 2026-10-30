import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import heroRobot from "@/assets/hero-robot.jpg";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ROBOFEST'26 — ROBOTiX Club, NIT Raipur" },
      {
        name: "description",
        content: "ROBOFEST'26 at ANANTYA'26, NIT Raipur. Robothon, Robowar, Roborace, Robosoccer and more on 22–23 March 2026.",
      },
      { property: "og:title", content: "ROBOFEST'26 — ROBOTiX Club, NIT Raipur" },
      {
        property: "og:description",
        content: "Two days of robots, code and combat. Spec sheets inside.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});
const TARGET = new Date("2026-03-22T10:00:00+05:30").getTime();
const EVENTS = [
  {
    code: "RF-02",
    name: "VIBECODING",
    tag: "Code the bots",
    kind: "Arduino",
    when: "22 Mar · 10:00–14:00",
    blurb: "Program microcontrollers to crack robotics problems. Bring circuits to life.",
    specs: [["Platform", "Arduino / ESP / Verilog"], ["Team", "1–2"], ["Duration", "2–3 h"]],
    prize: "₹12,000",
    href: "https://unstop.com/o/mAyxjwR",
  },
  {
    code: "RF-03",
    name: "ROBOWAR",
    tag: "Enter the arena",
    kind: "Combat",
    when: "22 Mar · 14:00–18:00",
    blurb: "Build a remote-controlled battle bot. Last machine moving wins.",
    specs: [["Weight", "≤ 8 kg"], ["Link", "Wireless only"], ["Team", "1–4"]],
    prize: "₹10,000",
    href: "https://unstop.com/competitions/robowars-robofest-26-robofest-26-national-institute-of-technology-nit-raipur-1656702",
  },
  {
    code: "RF-04",
    name: "ROBOQUIZ",
    tag: "Test your knowledge",
    kind: "Quiz",
    when: "22 Mar · 14:30 →",
    blurb: "Two offline rounds on robotics, electronics and emerging tech.",
    specs: [["Rounds", "2"], ["Mode", "Offline"], ["Team", "Solo"]],
    prize: "Goodies ₹6,000",
    href: "https://unstop.com/o/IwoBX5F",
  },
  {
    code: "RF-05",
    name: "ROBORACE",
    tag: "Speed unleashed",
    kind: "Speed",
    when: "23 Mar · 10:00–14:00",
    blurb: "A self-built bot vs. a nasty obstacle track. Fast and precise, or nothing.",
    specs: [["Size", "25×25×25 cm"], ["Weight", "≤ 5 kg"], ["Team", "1–4"]],
    prize: "₹10,000",
    href: "https://unstop.com/competitions/roborace-robofest26-robofest-26-national-institute-of-technology-nit-raipur-1655808",
  },
  {
    code: "RF-06",
    name: "IDEATHON",
    tag: "Think beyond",
    kind: "Innovation",
    when: "23 Mar · 14:00–18:00",
    blurb: "Turn a raw idea into a pitch and demo for a real-world problem.",
    specs: [["Format", "Pitch + demo"], ["Pitch", "10 min"], ["Team", "2–4"]],
    prize: "₹15,000",
    href: "https://unstop.com/o/I5jC4aD",
  },
  {
    code: "RF-07",
    name: "ROBOSOCCER",
    tag: "Goal machines",
    kind: "Sports",
    when: "23 Mar · 14:50–18:00",
    blurb: "Wired or wireless bots, one ball, one goal. 2.5 minute matches.",
    specs: [["Size", "30×30×30 cm"], ["Weight", "≤ 5 kg"], ["Match", "2.5 min"]],
    prize: "₹10,000",
    href: "https://unstop.com/competitions/robosoccer-robofest-26-national-institute-of-technology-nit-raipur-1656104",
  },
];
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal, .rise");
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) {
        (map.get(e.target) ?? e.target).classList.add("is-in");
        io.unobserve(e.target);
      }
    }), { threshold: 0.15 });
    const map = new Map();
    els.forEach((el) => {
      // clip-path makes the element itself report zero area, so watch its parent
      const target = el.classList.contains("reveal") && el.parentElement ? el.parentElement : el;
      map.set(target, el);
      io.observe(target);
    });
    return () => io.disconnect();
  }, []);
}
function useClock() {
  const [now, setNow] = useState(null);
  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  if (now === null)
    return { sign: "T-", parts: ["--", "--", "--", "--"] };
  const diff = TARGET - now;
  const abs = Math.abs(diff) / 1000;
  const d = Math.floor(abs / 86400);
  const h = Math.floor((abs % 86400) / 3600);
  const m = Math.floor((abs % 3600) / 60);
  const s = Math.floor(abs % 60);
  const pad = (n) => String(n).padStart(2, "0");
  return { sign: diff >= 0 ? "T-" : "T+", parts: [String(d), pad(h), pad(m), pad(s)] };
}
function Gear({ className = "", size = 120 }) {
  const teeth = Array.from({ length: 12 });
  return (<svg width={size} height={size} viewBox="0 0 100 100" className={className} aria-hidden>
    <g fill="none" stroke="currentColor" strokeWidth="2.5">{teeth.map((_, i) => (<rect x="45" y="2" width="10" height="14" transform={`rotate(${i * 30} 50 50)`} key={i} />))}<circle cx="50" cy="50" r="34" />
      <circle cx="50" cy="50" r="12" />
      <path d="M50 16v22M50 62v22M16 50h22M62 50h22" />
    </g>
  </svg>);
}
function Crosshair() {
  const ref = useRef(null);
  const label = useRef(null);
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches)
      return;
    const move = (e) => {
      if (!ref.current || !label.current)
        return;
      ref.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      label.current.textContent = `X${String(e.clientX).padStart(4, "0")} Y${String(e.clientY).padStart(4, "0")}`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (<div ref={ref} className="pointer-events-none fixed left-0 top-0 z-50 hidden md:block" aria-hidden>
    <div className="absolute -left-4 top-0 h-px w-8 bg-signal" />
    <div className="absolute -top-4 left-0 h-8 w-px bg-signal" />
    <span ref={label} className="absolute left-3 top-3 font-mono text-[10px] text-steel" />
  </div>);
}
function Index() {
  useReveal();
  const clock = useClock();
  return (<div className="relative overflow-x-hidden">
    <Crosshair />
    <header className="sticky top-0 z-40 border-b bg-paper/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 font-mono text-xs md:px-8">
        <a href="#top" className="flex items-center gap-2 font-bold">
          <span className="inline-block h-3 w-3 bg-signal" />{" ROBOTiX / NITRR"}</a>
        <nav className="hidden gap-6 md:flex">{[["01", "About", "#about"], ["02", "Events", "#events"], ["03", "Robothon", "#robothon"], ["04", "Schedule", "#schedule"], ["05", "Sponsors", "#sponsors"]].map(([n, l, h]) => (<a href={h} className="group" key={h}>
          <span className="text-muted-foreground">{n}{"."}</span>{" "}<span className="border-b-2 border-transparent transition-colors group-hover:border-signal">{l}</span>
        </a>))}</nav>
        <a href="#register" className="bg-signal px-3 py-1.5 font-bold text-paper transition-colors hover:bg-ink">{"REGISTER \u2192"}</a>
      </div>
    </header>
    <section id="top" className="relative isolate min-h-[92vh] overflow-hidden border-b-2">
      <img src={heroRobot} alt="Robot in profile lit with green light" width={1600} height={1104} className="hero-img absolute inset-0 -z-10 h-full w-full object-cover object-[70%_center] opacity-80" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-paper via-paper/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-paper to-transparent" />
      <div className="mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-between px-4 pb-12 pt-10 md:px-8">
        <div className="flex flex-wrap items-start justify-between gap-4 font-mono text-xs uppercase">
          <p>
            <span className="text-signal">{"\u25CF"}</span>{" ROBOTiX Club \u00B7 NIT Raipur presents"}</p>
          <p className="text-right text-muted-foreground">{"ANANTYA'26 \u00B7 22\u201423 March 2026"}</p>
        </div>
        <div>
          <h1 className="font-display text-[23vw] font-black uppercase leading-[0.78] tracking-tight md:text-[12rem]">{"ROBO".split("").map((c, i) => (<span className="inline-block overflow-hidden align-bottom" key={i}>
            <span className="letter" style={{ animationDelay: `${0.2 + i * 0.07}s` }}>{c}</span>
          </span>))}<br />{"FEST".split("").map((c, i) => (<span className="inline-block overflow-hidden align-bottom" key={i}>
            <span className="letter outline-text stroke-signal" style={{ animationDelay: `${0.5 + i * 0.07}s` }}>{c}</span>
          </span>))}<span className="inline-block overflow-hidden align-bottom">
              <span className="letter text-signal" style={{ animationDelay: "0.9s" }}>{"'26"}</span>
            </span>
          </h1>
          <p className="rise mt-6 max-w-lg text-lg text-muted-foreground md:text-xl">{"Where robotics, AI and innovation collide with the unknown. Two days, seven events, one very loud arena."}</p>
        </div>
        <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-wrap gap-4">
            <a href="#register" className="stamp border-2 border-signal bg-signal px-7 py-3 font-display text-xl font-extrabold uppercase text-paper">{"Register now \u2192"}</a>
            <a href="#events" className="border-2 px-7 py-3 font-display text-xl font-extrabold uppercase transition-colors hover:border-signal hover:text-signal">{"Explore events"}</a>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase text-muted-foreground">{clock.sign === "T-" ? "Gate opens in" : "Mission clock — since launch"}</p>
            <div className="mt-2 flex gap-5">{clock.parts.map((p, i) => (<div key={i}>
              <div className="font-display text-4xl font-extrabold tabular-nums md:text-5xl">{i === 0 && <span className="text-signal">{clock.sign}</span>}{p}</div>
              <div className="font-mono text-[10px] uppercase text-muted-foreground">{["days", "hrs", "min", "sec"][i]}</div>
            </div>))}</div>
          </div>
        </div>
      </div>
    </section>
    <div className="hazard border-y-2 py-2">
      <div className="overflow-hidden bg-ink py-2">
        <div className="marquee flex w-max gap-8 whitespace-nowrap font-display text-2xl font-extrabold uppercase text-paper">{Array.from({ length: 2 }).map((_, k) => (<span className="flex gap-8" key={k}>{["Robothon", "Vibecoding", "Robowar", "Roboquiz", "Roborace", "Ideathon", "Robosoccer"].map((t) => (<span className="flex items-center gap-8" key={t}>{t}{" "}<span className="text-signal">{"\u2715"}</span>
        </span>))}</span>))}</div>
      </div>
    </div>
    <section id="about" className="relative mx-auto max-w-7xl px-4 py-24 md:px-8">
      <span className="pointer-events-none absolute right-4 top-10 -z-10 font-display text-[14rem] font-black leading-none outline-text opacity-10" aria-hidden>{"01"}</span>
      <SectionHead n="01" title="About the fest" />
      <div className="mt-10 grid gap-10 md:grid-cols-12">
        <div className="rise md:col-span-7 space-y-5 text-lg leading-relaxed">
          <p>
            <span className="font-display text-5xl font-black leading-none float-left mr-3 mt-1 text-signal">{"R"}</span>{"OBOFEST is the robotics wing of ANANTYA, NIT Raipur's tech fest, run by the ROBOTiX Club. It's where students stop talking about robots and start building them \u2014 then make them race, fight, play football and solve problems against the clock."}</p>
          <p className="text-muted-foreground">{"Bring a soldering iron, a laptop, or just an idea. There's an event for each."}</p>
        </div>
        <dl className="rise md:col-span-5 grid grid-cols-2 border-2 bg-card font-mono text-sm">{[
          ["Events", "07"],
          ["Days", "02"],
          ["Hackathon", "24 h"],
          ["Prize pool", "₹98K+"],
        ].map(([k, v], i) => (<div className={`p-5 ${i % 2 === 0 ? "border-r-2" : ""} ${i < 2 ? "border-b-2" : ""}`} key={k}>
          <dt className="text-xs uppercase text-muted-foreground">{k}</dt>
          <dd className="font-display text-5xl font-black">{v}</dd>
        </div>))}</dl>
      </div>
    </section>
    <section id="events" className="relative isolate border-t-2 py-24">
      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <span className="pointer-events-none absolute right-4 -top-16 -z-10 font-display text-[14rem] font-black leading-none outline-text opacity-10" aria-hidden>{"02"}</span>
        <SectionHead n="02" title="The events" />
        <article className="rise mt-10 grid border-2 border-signal bg-card md:grid-cols-12">
          <div className="relative overflow-hidden md:col-span-5">
            <img src="https://robotix.nitrr.ac.in/robothon-bg1.png" alt="Robothon" className="h-full min-h-64 w-full object-cover grayscale transition duration-700 hover:scale-105 hover:grayscale-0" loading="lazy" />
            <span className="hazard absolute left-0 top-6 px-3 py-1 font-mono text-xs font-bold">
              <span className="bg-paper px-2 py-0.5 text-signal">{"MAIN EVENT \u00B7 RF-01"}</span>
            </span>
          </div>
          <div className="p-6 md:col-span-7 md:p-10">
            <p className="font-mono text-xs uppercase text-signal">{"Build the future \u00B7 22\u201323 Mar \u00B7 10 AM \u2192"}</p>
            <h3 className="mt-2 font-display text-6xl font-black uppercase md:text-8xl">{"Robothon"}</h3>
            <p className="mt-4 max-w-xl opacity-80">{"A 24-hour simulation hackathon: GPS-denied drones, swarms, underwater robots, nanobots and six-legged rovers. Push your limits."}</p>
            <div className="mt-6 grid grid-cols-2 gap-px bg-border font-mono text-sm md:grid-cols-4">{[["Duration", "24 h"], ["Team", "2–4"], ["Format", "Simulation"], ["Pool", "₹35,000"]].map(([k, v]) => (<div className="bg-card p-3" key={k}>
              <div className="text-[10px] uppercase opacity-60">{k}</div>
              <div className="font-bold">{v}</div>
            </div>))}</div>
            <a href="https://robotix.nitrr.ac.in/robofest/robothon" target="_blank" rel="noreferrer" className="mt-6 inline-block bg-signal px-5 py-3 font-display text-lg font-extrabold uppercase text-paper transition-transform hover:-translate-y-1">{"Robothon details \u2197"}</a>
          </div>
        </article>
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{EVENTS.map((e, i) => (<article className="rise flood group flex flex-col border-2 bg-card p-6" style={{ transitionDelay: `${(i % 3) * 90}ms` }} key={e.code}>
          <div className="flex items-center justify-between font-mono text-xs">
            <span>{e.code}</span>
            <span className="border px-2 py-0.5 uppercase group-hover:border-paper">{e.kind}</span>
          </div>
          <h3 className="mt-6 font-display text-5xl font-black uppercase leading-none transition-transform duration-500 group-hover:translate-x-2">{e.name}</h3>
          <p className="mt-1 font-mono text-xs uppercase text-signal group-hover:text-paper">{e.tag}</p>
          <p className="mt-4 text-sm opacity-80">{e.blurb}</p>
          <table className="mt-5 w-full font-mono text-xs">
            <tbody>{e.specs.map(([k, v]) => (<tr className="border-t border-dashed group-hover:border-paper/40" key={k}>
              <td className="py-1.5 opacity-60">{k}</td>
              <td className="py-1.5 text-right">{v}</td>
            </tr>))}</tbody>
          </table>
          <div className="mt-auto flex items-end justify-between pt-6">
            <div>
              <div className="font-mono text-[10px] uppercase opacity-60">{e.when}</div>
              <div className="font-display text-3xl font-extrabold">{e.prize}</div>
            </div>
            <a href={e.href} target="_blank" rel="noreferrer" className="bg-signal px-3 py-2 font-mono text-xs font-bold text-paper transition-colors group-hover:bg-paper group-hover:text-signal">{"REGISTER \u2197"}</a>
          </div>
        </article>))}</div>
      </div>
    </section>
    <section id="robothon" className="relative border-t py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHead n="03" title="Inside Robothon" />
        <div className="mt-10 grid gap-10 md:grid-cols-12">
          <div className="rise md:col-span-5 space-y-5">
            <p className="text-lg">{"This year the challenge goes virtual. Teams of 2\u20134 pick a problem statement at registration and start building their simulation right away."}</p>
            <p className="text-muted-foreground">{"Progress is checked before the fest to shortlist the top 10\u201312 teams. In the 24-hour finale, organisers change the test conditions \u2014 dynamic obstacles, rough terrain, comms delay, sensor noise \u2014 and you adapt live."}</p>
            <ol className="mt-6 border-l-2 border-signal font-mono text-sm">{[
              ["15 Mar", "Registration closes"],
              ["16–18 Mar", "Shortlisting round"],
              ["22–23 Mar", "24-hour live finale"],
            ].map(([d, t]) => (<li className="relative py-3 pl-6" key={d}>
              <span className="absolute -left-[7px] top-4 h-3 w-3 bg-signal" />
              <span className="text-signal">{d}</span>{" \u2014 "}{t}</li>))}</ol>
            <a href="https://unstop.com/hackathons/robothon-26-robofest-26-national-institute-of-technology-nit-raipur-1654645" target="_blank" rel="noreferrer" className="stamp mt-4 inline-block border-2 border-signal bg-signal px-6 py-3 font-display text-xl font-extrabold uppercase text-paper">{"Register for Robothon \u2197"}</a>
          </div>
          <div className="md:col-span-7">
            <p className="font-mono text-xs uppercase text-muted-foreground">{"Problem statements \u00B7 live ROBOTiX projects"}</p>
            <ul className="mt-3 border-t">{[
              "GPS-Denied Navigation System",
              "Swarm Drones",
              "Underwater Robot",
              "Nanobot",
              "Six-Legged Rough Terrain Rover",
            ].map((t, i) => (<li className="rise group flex items-baseline gap-6 border-b py-5 transition-colors hover:bg-signal hover:text-paper" style={{ transitionDelay: `${i * 60}ms` }} key={t}>
              <span className="pl-3 font-mono text-xs text-signal group-hover:text-paper">{"PS-0"}{i + 1}</span>
              <span className="font-display text-3xl font-extrabold uppercase transition-transform duration-300 group-hover:translate-x-3 md:text-4xl">{t}</span>
              <span className="ml-auto pr-4 opacity-0 transition-opacity group-hover:opacity-100">{"\u2192"}</span>
            </li>))}</ul>
            <div className="mt-8 grid gap-px bg-border sm:grid-cols-2">{[
              ["Judged on", "Adaptability · robustness · computational efficiency · scalability"],
              ["Also counts", "System architecture · clarity of explanation · reproducibility"],
              ["Submit", "ROS2 / Webots package on public GitHub with a full README"],
              ["You gain", "Real-time engineering, sim tools, teamwork — and cash prizes"],
            ].map(([k, v]) => (<div className="bg-card p-5" key={k}>
              <div className="font-mono text-[10px] uppercase text-signal">{k}</div>
              <div className="mt-1 text-sm">{v}</div>
            </div>))}</div>
          </div>
        </div>
      </div>
    </section>
    <section id="schedule" className="border-t bg-card/50 py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHead n="04" title="Two-day schedule" />
        <div className="mt-10 grid gap-6 md:grid-cols-2">{[
          ["Day 01", "22 March", [["10:00", "Robothon begins (24 h)"], ["10:00", "Vibecoding"], ["14:00", "Robowar"], ["14:30", "Roboquiz"]]],
          ["Day 02", "23 March", [["10:00", "Roborace"], ["10:00", "Robothon finale"], ["14:00", "Ideathon"], ["14:50", "Robosoccer"]]],
        ].map(([d, date, rows]) => (<div className="rise border-2 p-6" key={d}>
          <div className="flex items-baseline justify-between">
            <h3 className="font-display text-6xl font-black uppercase text-signal">{d}</h3>
            <span className="font-mono text-xs uppercase text-muted-foreground">{date}</span>
          </div>
          <ul className="mt-6 font-mono text-sm">{rows.map(([t, n]) => (<li className="flex gap-6 border-t border-dashed py-3 transition-colors hover:text-signal" key={n}>
            <span className="w-14 text-muted-foreground">{t}</span>
            <span>{n}</span>
          </li>))}</ul>
        </div>))}</div>
      </div>
    </section>
    <section id="sponsors" className="border-t py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHead n="05" title="Our sponsors" />
        <p className="mt-4 max-w-lg text-muted-foreground">{"Fuelling innovation \u2014 the partners who power ROBOFEST'26."}</p>
        <div className="mt-10 grid grid-cols-2 gap-px border bg-border md:grid-cols-4">{[
          ["platform_partner.png", "Platform Partner"],
          ["coverage_partner_1.png", "Coverage Partner"],
          ["voice_of_the_event.png", "Voice of the Event"],
          ["coverage_partner_2.png", "Coverage Partner"],
          ["electronics_partner%20(2).png", "Electronics Partner"],
          ["gifting_partner_2.png", "Gifting Partner"],
          ["trophy_partner.png", "Trophy Partner"],
          ["media_partner.png", "Media Partner"],
        ].map(([f, l], i) => (<figure className="rise group flex flex-col items-center justify-between gap-4 bg-paper p-6" style={{ transitionDelay: `${(i % 4) * 70}ms` }} key={f}>
          <div className={`flex h-24 w-full items-center justify-center rounded-sm p-3 ${f?.startsWith("trophy") ? "bg-card" : "bg-ink"} transition-transform duration-500 group-hover:-rotate-2 group-hover:scale-105`}>
            <img src={`https://robotix.nitrr.ac.in/sponsors/${f}`} alt={l} loading="lazy" className="max-h-full max-w-full object-contain" />
          </div>
          <figcaption className="font-mono text-[11px] uppercase text-muted-foreground group-hover:text-signal">{l}</figcaption>
        </figure>))}</div>
      </div>
    </section>
    <section id="register" className="relative overflow-hidden bg-signal py-24 text-paper">
      <Gear className="gear absolute -left-16 -top-16 text-paper/15" size={300} />
      <Gear className="gear-rev absolute -bottom-20 right-10 text-paper/15" size={240} />
      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <p className="font-mono text-xs uppercase">{"06 / Registration open"}</p>
        <h2 className="reveal mt-4 font-display text-[16vw] font-black uppercase leading-[0.82] md:text-[10rem]">{"Your bot."}<br />
          <span className="outline-text" style={{ WebkitTextStrokeColor: "var(--paper)" }}>{"Our arena."}</span>
        </h2>
        <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <p className="max-w-md text-lg font-semibold">{"Pick an event, gather your crew, register on Unstop. Gates open 22 March, 10 AM at NIT Raipur."}</p>
          <div className="flex flex-wrap gap-4">
            <a href="#events" className="border-2 border-paper bg-paper px-8 py-4 font-display text-2xl font-extrabold uppercase text-signal transition-transform hover:-translate-y-1">{"Register now \u2192"}</a>
            <a href="https://robotix.nitrr.ac.in/robofest" target="_blank" rel="noreferrer" className="border-2 border-paper px-8 py-4 font-display text-2xl font-extrabold uppercase transition-transform hover:-translate-y-1">{"Official site \u2197"}</a>
          </div>
        </div>
      </div>
    </section>
    <footer className="border-t-2">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-8">
        <div className="font-display text-[18vw] font-black uppercase leading-none tracking-tight md:text-[11rem]">{"ROBOTiX"}<span className="text-signal">{"."}</span>
        </div>
        <div className="mt-8 grid gap-6 border-t pt-6 font-mono text-xs md:grid-cols-3">
          <p>{"ROBOTiX Club"}<br />{"National Institute of Technology, Raipur"}</p>
          <p>{"ROBOFEST'26 \u00B7 ANANTYA'26"}<br />{"22\u201423 March 2026"}</p>
          <p className="md:text-right">
            <a href="https://robotix.nitrr.ac.in" target="_blank" rel="noreferrer" className="hover:text-signal">{"robotix.nitrr.ac.in \u2197"}</a>
            <br />
            <span className="opacity-60">{"End of document"}</span>{" "}<span className="blink">{"\u25AE"}</span>
          </p>
        </div>
      </div>
    </footer>
  </div>);
}
function SectionHead({ n, title }) {
  return (<div className="flex items-end gap-4 border-b-2 pb-3">
    <span className="font-mono text-sm">{"\u00A7"}{n}</span>
    <h2 className="reveal font-display text-5xl font-black uppercase leading-none md:text-7xl">{title}</h2>
    <span className="ml-auto hidden h-3 flex-1 hazard md:block" />
  </div>);
}
