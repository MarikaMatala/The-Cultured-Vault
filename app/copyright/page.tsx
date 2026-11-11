import Link from "next/link";

export default function LegalPage() {
  return (
    <main className="shell" style={{ paddingTop: "3rem", paddingBottom: "5rem", maxWidth: "900px" }}>
      <nav aria-label="Legal navigation" style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "2rem" }}>
        <Link href="/">The Cultured Vault</Link>
        <Link href="/privacy">Privacy / Tietosuoja</Link>
        <Link href="/copyright">Copyright / Tekijänoikeudet</Link>
      </nav>
      <h1 style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)" }}>Copyright and terms</h1>
      <section style={{ marginTop: "2rem" }}><h2>Suomeksi</h2><p>Sivuston alkuperäiset tekstit, käyttöliittymän visuaalinen suunnittelu, grafiikat, logot ja muu alkuperäinen sisältö ovat Marika Matalamäen tekijänoikeudellisesti suojattua aineistoa, ellei toisin mainita.</p><h3>Sallittu käyttö</h3><p>Sivustoa saa tarkastella ja käyttää henkilökohtaiseen tutustumiseen. Sisältöä ei saa kopioida, julkaista, muokata, levittää tai käyttää kaupallisesti ilman tekijän etukäteistä lupaa, ellei yksittäisen aineiston lisenssi nimenomaisesti salli sitä.</p><h3>Avoimen lähdekoodin lisenssi</h3><p>Projektin lähdekoodiin sovelletaan repositoriossa ilmoitettua lisenssiä. Koodin lisenssi ei automaattisesti kata brändiä, tekstejä tai grafiikoita.</p><p>Lupapyynnöt ja tekijänoikeuskysymykset: <a href="https://marikamatala.github.io/yhteystiedot.html">ota yhteyttä</a>.</p></section>
      <section style={{ marginTop: "2rem" }} lang="en"><h2>In English</h2><p>Unless stated otherwise, original text, interface design, graphics, logos and other original content on this site are copyrighted by Marika Matalamäki.</p><h3>Permitted use</h3><p>You may view and use the site for personal evaluation. You may not copy, republish, modify, distribute or commercially use its content without prior permission, unless a specific asset licence expressly permits it.</p><h3>Open-source licence</h3><p>The source code is governed by the licence stated in the repository. The code licence does not automatically cover branding, text or graphics.</p><p>For permissions or copyright questions, <a href="https://marikamatala.github.io/yhteystiedot.html">contact me</a>.</p></section>
      <p style={{ marginTop: "3rem" }}><Link href="/">← Back to The Cultured Vault</Link></p>
    </main>
  );
}
