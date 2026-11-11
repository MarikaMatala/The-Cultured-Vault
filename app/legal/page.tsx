import Link from "next/link";

export default function LegalPage() {
  return (
    <main className="shell" style={{ paddingTop: "3rem", paddingBottom: "5rem", maxWidth: "900px" }}>
      <nav aria-label="Legal navigation" style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "2rem" }}>
        <Link href="/">The Cultured Vault</Link>
        <Link href="/legal">Privacy and copyright / Tietosuoja ja tekijänoikeudet</Link>
      </nav>
      <h1 style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)" }}>Privacy and copyright</h1>
      <p><strong>Updated 11 November 2026.</strong></p>
      <section style={{ marginTop: "2rem" }}>
        <h2>Suomeksi</h2>
        <h3>Mikä tämä sivusto on?</h3>
        <p>The Cultured Vault on Marika Matalamäen itsenäinen oppimis- ja työnäyteprojekti. Se kokoaa elokuviin, sarjoihin, animaatioihin, musiikkiin, kirjoihin, peleihin ja muihin teoksiin liittyvää esimerkkisisältöä. Demo ei ole kaupallinen suoratoisto- tai arvostelupalvelu.</p>
        <h3>Tietosuoja ja selaimeen tallentuvat tiedot</h3>
        <p>Sivusto ei vaadi käyttäjätiliä eikä käytä mainosevästeitä tai Umami-kävijäseurantaa. Omat arviosi, kommenttisi ja ehdotuksesi tallentuvat tämän demon käyttöä varten selaimesi paikalliseen tallennukseen. Niitä ei lähetetä minulle eikä jaeta muille kävijöille. Voit poistaa tiedot selaimesi sivustokohtaisista tallennusasetuksista.</p>
        <p>Hosting-palvelu voi käsitellä teknisiä yhteys- ja lokitietoja sivuston toimittamista ja tietoturvaa varten. Älä syötä demoon arkaluonteisia henkilötietoja tai salasanoja. Ulkoisten linkkien kohdepalvelut vastaavat omasta tietosuojastaan.</p>
        <h3>Tekijänoikeudet</h3>
        <p>Projektin alkuperäinen käyttöliittymä, tekstit, grafiikat ja logo ovat tekijänoikeuden suojaamia, ellei toisin mainita. Teosten nimet, tunnistetiedot ja mahdolliset kuvat voivat kuulua niiden alkuperäisille oikeudenhaltijoille. Sivuston sisältöä saa tarkastella ja linkkiä jakaa. Sisällön kopiointi, muokkaaminen, uudelleenjulkaisu tai kaupallinen käyttö edellyttää lupaa tai kyseisen aineiston lisenssin antamaa oikeutta.</p>
        <p>Lähdekoodin lisenssi koskee vain siinä määriteltyä koodia, ei automaattisesti projektin nimeä, logoa tai muuta visuaalista sisältöä. Yhteydenotot: <a href="mailto:marika.matalamaki@gmail.com">marika.matalamaki@gmail.com</a>.</p>
      </section>
      <section style={{ marginTop: "2rem" }} lang="en">
        <h2>In English</h2>
        <h3>About this site</h3>
        <p>The Cultured Vault is an independent learning and portfolio project by Marika Matalamäki. It brings together sample information about films, series, animation, music, books, games and other media. It is not a commercial streaming or review service.</p>
        <h3>Privacy and browser storage</h3>
        <p>The site requires no account and uses no advertising cookies or Umami visitor analytics. Your personal ratings, comments and suggestions are saved in your browser's local storage for this demo. They are not sent to me or shared with other visitors. You can clear them in your browser's site-data settings.</p>
        <p>The hosting provider may process technical connection and log data to deliver and secure the site. Do not enter sensitive personal information or passwords. External websites linked from this demo are responsible for their own privacy practices.</p>
        <h3>Copyright</h3>
        <p>The project's original interface, text, graphics and logo are protected by copyright unless stated otherwise. Titles, identifying information and any images may belong to their respective rights holders. You may browse the site and share a link. Copying, modifying, republishing or commercially using content requires permission or a licence that expressly allows it.</p>
        <p>The source-code licence applies only to the code it covers; it does not automatically cover the project name, logo or other visual content. Contact: <a href="mailto:marika.matalamaki@gmail.com">marika.matalamaki@gmail.com</a>.</p>
      </section>
      <p style={{ marginTop: "3rem" }}><Link href="/">← Back to The Cultured Vault</Link></p>
    </main>
  );
}