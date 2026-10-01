import Image from "next/image";
import Link from "next/link";
import GuidedPath from "@/modules/home/GuidedPath";

const assetBasePath = process.env.GITHUB_PAGES === "true" && process.env.GEEK_JR_CUSTOM_DOMAIN !== "geekjr.xyz" ? "/geek-jr" : "";


const activities = [
  { number: "01", title: "Picture Cards", focus: "VOCABULARY", description: "See it. Say it. Remember it.", href: "/cards", icon: "🖼️", tint: "bg-amber-100" },
  { number: "02", title: "Phonics Tap", focus: "SOUNDS", description: "Listen and find the sound.", href: "/phonics", icon: "🔤", tint: "bg-sky-100" },
  { number: "03", title: "Memory Match", focus: "RECALL", description: "Flip and find the pairs.", href: "/memory", icon: "🧩", tint: "bg-emerald-100" },
  { number: "04", title: "Patterns & Logic", focus: "REASONING", description: "What comes next?", href: "/patterns", icon: "✦", tint: "bg-violet-100" },
  { number: "05", title: "Story Sequence", focus: "SEQUENCING", description: "Choose how the story goes.", href: "/stories", icon: "📖", tint: "bg-rose-100" },
  { number: "06", title: "First Words", focus: "EARLY READING", description: "Say a word. Practice it together.", href: "/first-words", icon: "💬", tint: "bg-teal-100" },
];


export default function HomePage() {
  return (
    <main id="main-content">
      <section className="home-hero" aria-labelledby="hero-title">
        <div className="hero-grid">
          <div>
            <p className="eyebrow">GEEK PROTOCOL / EARLY LEARNING</p>
            <h1 id="hero-title">Curiosity<br />starts <em>here.</em></h1>
            <p className="hero-description">Six playful activities. Four age levels. One small step at a time.</p>
            <div className="hero-actions">
              <a className="hero-primary" href="#start">Find your first step <span aria-hidden="true">↘</span></a>
              <Link className="hero-secondary" href="/parent">Parent setup <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
          <div className="hero-art" aria-label="Geek Protocol mascot">
            <span className="art-tag top">GEEK JR. / 01—10</span>
            <Image src={`${assetBasePath}/geek-protocol-logo.png`} width={300} height={300} alt="Geek Protocol robot mascot" priority />
            <span className="art-tag bottom">LEARN THROUGH PLAY ·</span>
          </div>
        </div>
      </section>

      <GuidedPath />

      <section className="activities-section" id="activities" aria-labelledby="activities-title">
        <div className="section-heading">
          <div><p>THE ACTIVITY LIBRARY</p><h2 id="activities-title">Pick a little adventure.</h2></div>
          <small>Start anywhere. Parents can set the age level and round length.</small>
        </div>
        <div className="activity-grid">
          {activities.map((activity) => (
            <Link key={activity.href} href={activity.href} className="activity-tile">
              <div className="tile-top">
                <span className="tile-number">{activity.number} / 06</span>
                <span className={`tile-icon ${activity.tint}`} aria-hidden="true">{activity.icon}</span>
              </div>
              <div className="tile-bottom">
                <div><span className="tile-focus">{activity.focus}</span><h3>{activity.title}</h3><p>{activity.description}</p></div>
                <span className="tile-arrow" aria-hidden="true">↗</span>
              </div>
            </Link>
          ))}
        </div>
        <p className="home-note">No account needed. Progress stays on this device.</p>
      </section>
    </main>
  );
}
