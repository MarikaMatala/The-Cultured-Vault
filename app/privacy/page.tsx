import Link from "next/link";

export default function LegalPage() {
  return (
    <main className="shell" style={{ paddingTop: "3rem", paddingBottom: "5rem", maxWidth: "900px" }}>
      <nav aria-label="Legal navigation" style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "2rem" }}>
        <Link href="/">The Cultured Vault</Link>
        <Link href="/privacy">Privacy / Tietosuoja</Link>
        <Link href="/copyright">Copyright / Tekijänoikeudet</Link>
      </nav>
      <h1 style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)" }}>Privacy and cookies</h1>
      <section style={{ marginTop: "2rem" }}><h2>Suomeksi</h2><p>Tämä sivusto on Marika Matalamäen itsenäinen työnäyte- ja oppimisprojekti. Sivusto toimii selaimessa ilman käyttäjätiliä. Älä syötä demoon arkaluonteisia henkilötietoja.</p><h3>Kerättävät tiedot ja analytiikka</h3><p>Palvelun hosting-alusta voi käsitellä teknisiä lokitietoja sivun toimittamiseksi ja tietoturvan varmistamiseksi. Sivuston demokäyttöön syöttämäsi haut ja arviot käsitellään sovelluksessa; sovellus ei pyydä käyttäjätiliä.</p><h3>Evästeet ja selaimen tallennus</h3><p>Sivusto ei käytä mainosevästeitä. Mahdollinen paikallinen tallennus liittyy käyttöliittymän toimintaan ja asetuksiin. Voit tyhjentää selaimen tallentamat tiedot selaimesi asetuksista.</p><h3>Kolmannet osapuolet</h3><p>Hosting-palvelun, ulkoisten linkkien ja mahdollisten kolmansien osapuolten palvelujen omia tietosuojakäytäntöjä sovelletaan niiden käyttöön.</p><p>Tietosuojaa koskevat kysymykset: <a href="https://marikamatala.github.io/yhteystiedot.html">ota yhteyttä portfolion kautta</a>.</p></section>
      <section style={{ marginTop: "2rem" }} lang="en"><h2>In English</h2><p>This is an independent portfolio and learning project by Marika Matalamäki. It runs without user accounts. Do not enter sensitive personal information into the demo.</p><h3>Data and analytics</h3><p>The hosting provider may process technical log data to deliver and secure the site. Searches and ratings entered into the demo are handled by the application; no user account is required.</p><h3>Cookies and browser storage</h3><p>The site does not use advertising cookies. Any local storage is related to application functionality and preferences. You can clear browser-stored data in your browser settings.</p><h3>Third parties</h3><p>The hosting provider, external links and any third-party services are subject to their own privacy policies.</p><p>For privacy questions, <a href="https://marikamatala.github.io/yhteystiedot.html">contact me through my portfolio</a>.</p></section>
      <p style={{ marginTop: "3rem" }}><Link href="/">← Back to The Cultured Vault</Link></p>
    </main>
  );
}
