# The Cultured Vault

**Kulttuuria löydettäväksi. Tarinoita muistettavaksi.**

The Cultured Vault on avoimen lähdekoodin pohja henkilökohtaiselle kulttuuriarkistolle ja yhteisöominaisuuksille. Katalogiin kuuluu elokuvia, televisiosarjoja, animaatioita, dokumentteja, podcasteja, musiikkia, videopelejä, kirjoja ja sarjakuvia. Pitkän aikavälin tavoitteena ovat henkilökohtaiset kirjastot, tilat, arviot, arvostelut, listat ja kuratoitu sisällön löytäminen.

Projektissa pidetään erillään kolme näkökulmaa: asennuksen ylläpitäjän toimituksellinen sisältö, jokaisen jäsenen henkilökohtaiset mielipiteet ja yhteisön yhteiset keskiarvot. Puuttuvaa arviota ei tulkita nollaksi, eikä yhteisön keskiarvo saa koskaan korvata yksittäisen käyttäjän omaa arviota.

> **Projektin tila:** ensimmäinen käynnistettävä käyttöliittymärunko on nyt repositoriossa. Se sisältää responsiivisen suomen- ja englanninkielisen katalogidemon, joka käyttää 93 teoksen `data/catalog-seed.json`-aloitusdataa. Sovellus on vain luku -tilassa: kirjautumista, henkilökohtaisia kirjastoja, arvioita, arvosteluja, katalogin API:a tai tuotantojulkaisua ei ole yhdistetty. Olemassa olevat Supabase-migraatiot ovat lähdekoodissa, mutta niitä ei ole ajettu tuotantotietokantaan.

## Projektin tavoitteet

- Rakentaa useita mediamuotoja kattava katalogi elokuva- tai sarjaseurannan sijaan.
- Tukea suomen- ja englanninkielistä käyttöliittymää.
- Pitää jokainen fork ja oma asennus toisistaan riippumattomina.
- Erottaa julkiset katalogitiedot, ylläpitäjän toimituksellinen sisältö ja jäsenten yksityiset tiedot.
- Toteuttaa ajan myötä haku, suodattimet, kokoelmat, arviot, arvostelut ja tilastot.
- Suojata yksityiset profiili- ja kirjastotiedot tietokannan käyttöoikeuksilla.
- Huomioida saavutettavuus, moderointi ja yksityisyys arkkitehtuurissa alusta alkaen.

## Sovelluksen käynnistäminen paikallisesti

### Vaatimukset

- Node.js 20.19 tai uudempi (Node.js 26 LTS on suositeltu).
- npm, joka tulee Node.js:n mukana.
- Python 3.11 tai uudempi vain, jos haluat käyttää nykyistä Python-katalogivalidointia ja Python-yksikkötestejä.

### Pikakäynnistys

```bash
git clone https://github.com/MarikaMatala/The-Cultured-Vault.git
cd The-Cultured-Vault
cp .env.example .env.local
npm ci
npm run dev
```

Windows PowerShellissä kopioi ympäristöesimerkki komennolla `Copy-Item .env.example .env.local`.

Avaa selaimessa http://localhost:3000. Sovellus toimii myös ilman `.env.local`-tiedostoa, koska sillä on turvalliset oletusarvot. Katso [sovelluksen käyttöönotto-ohje](docs/APP_SETUP.md), jos haluat vaihtaa asennuksen brändiä, kieltä tai värejä.

### Kehitys- ja tarkistuskomennot

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
npm test
npm run check
npm run validate:catalogue
PYTHONPATH=src python -m unittest discover -s tests -v
```

- `npm run check` suorittaa muotoilutarkistukset, ESLintin, TypeScriptin tyyppitarkistuksen ja Node.js-katalogitestit.
- `npm run build` luo tuotantoversion buildin.
- `npm run validate:catalogue` suorittaa aloitus-JSONin Python-validoinnin.
- Viimeinen komento suorittaa nykyiset Python-yksikkötestit.

## Mitä sovellusranko sisältää?

| Polku                      | Tarkoitus                                                        |
| -------------------------- | ---------------------------------------------------------------- |
| `app/`                     | Next.js App Router, juuriasettelu ja globaali design-järjestelmä |
| `components/vault-app.tsx` | Responsiivinen kataloginäkymä ja FI/EN-kielenvaihto              |
| `lib/catalogue.ts`         | Katalogin lähderajapinta ja vain luku -JSON-sovitin              |
| `lib/config.ts`            | Asennuksen julkisen brändin ja oletuskielen asetukset            |
| `lib/i18n.ts`              | Suomen- ja englanninkieliset käyttöliittymätekstit               |
| `data/catalog-seed.json`   | Julkinen toimituksellinen aloituskatalogi (93 esimerkkiteosta)   |
| `tests/catalogue.test.mjs` | Node.js-testit aloituskatalogin eheydelle                        |
| `src/cultured_vault/`      | Python-katalogin validointi- ja normalisointityökalut            |
| `supabase/migrations/`     | PostgreSQL-skeema ja rivitason käyttöoikeuksien perustat         |
| `docs/APP_SETUP.md`        | Sovelluksen käyttöönotto- ja asetusohje                          |
| `docs/PROJECT_VISION.md`   | Projektin visio ja käyttökokemuksen periaatteet                  |
| `docs/DATA_MODEL.md`       | Ehdotus relaatiotietomalliksi                                    |
| `docs/BACKEND_PLAN.md`     | Backendin toteutussuunnitelma                                    |
| `docs/ROADMAP.md`          | Kehityksen vaiheet                                               |

## Oman asennuksen määrittäminen

Kopioi `.env.example` tiedostoksi `.env.local` ja muuta julkisen käyttöliittymän asetuksia:

| Muuttuja                     | Tarkoitus                                    |
| ---------------------------- | -------------------------------------------- |
| `NEXT_PUBLIC_APP_NAME`       | Asennuksen nimi                              |
| `NEXT_PUBLIC_APP_TAGLINE`    | Asennuksen lyhyt tunnuslause                 |
| `NEXT_PUBLIC_DEFAULT_LOCALE` | Oletuskieli: `en` tai `fi`                   |
| `NEXT_PUBLIC_BRAND_MONOGRAM` | Yhden–kolmen merkin bränditunnus |
| `NEXT_PUBLIC_SOURCE_URL` | Forkin lähdekoodilinkki; tyhjänä käytetään alkuperäistä repositoriota |
| `NEXT_PUBLIC_BRAND_BRONZE`   | Pronssinen korostusväri, kuusinumeroinen hex |
| `NEXT_PUBLIC_BRAND_SILVER`   | Hopeinen korostusväri, kuusinumeroinen hex   |
| `NEXT_PUBLIC_BRAND_GOLD`     | Kultainen korostusväri, kuusinumeroinen hex  |

Nämä arvot ovat julkisia ja päätyvät selaimelle toimitettavaan koodiin. Älä lisää niihin salaisuuksia. Tietokantaa, tunnistautumista tai ulkoisia metatietopalveluja ei ole vielä yhdistetty sovellukseen, joten palvelutunnuksia ei tarvita. Kun integraatiot toteutetaan, jokaisen ylläpitäjän tulee määrittää omat palvelinpuolen tunnuksensa. Ylläpitäjän oikeuksilla toimivia avaimia ei saa koskaan tuoda selaimelle.

## Katalogi ja sovelluksen rajapinnat

Käyttöliittymä lukee julkista aloitus-JSONia `CatalogueSource`-rajapinnan kautta. Haku, järjestäminen ja kategoriarajaukset toimivat selaimessa paikallista aineistoa vasten. Muutoksia ei tallenneta, eikä sovellus kerää henkilökohtaisia tietoja.

Tietomalli ja Supabase-migraatiot ovat tulevan toteutuksen perustaa, eivät todiste toimivasta backendistä. Tarkista ja testaa migraatiot sekä rivitason käyttöoikeudet erillisessä paikallisessa Supabase-ympäristössä ennen tietokantayhteyden toteuttamista tai oikeiden käyttäjätietojen käsittelyä.

## Forkit ja itsenäiset asennukset

Voit forkata repositorion ja muokata sitä MIT-lisenssin ehtojen mukaisesti. Jokaisella forkilla ja asennuksella tulee olla omat:

- Sovelluksen nimi, brändi, kieliasetukset ja katalogi.
- Tietokanta ja tunnistautumisprojekti.
- API-tunnukset ja metatietopalvelujen tilit.
- Käyttäjätilit, arviot, arvostelut ja yksityiset kirjastotiedot.
- Hosting-ympäristö, verkkotunnus, varmuuskopiot ja ylläpidon valvonta.

Älä käytä alkuperäisen ylläpitäjän henkilökohtaisia tilejä, tietokantaa, tunnuksia tai yksityistä sisältöä. Älä koskaan commitoi `.env.local`-tiedostoa, tietokantasalasanoja, API-tokeneita, yksityisiä arvioita tai käyttäjätietoja.

## Saavutettavuus ja visuaalinen ilme

Ensimmäinen käyttöliittymä käyttää tummaa, hiilenharmaata arkistoteemaa pronssin, hopean ja kullan korostuksilla. Siinä on semanttiset sivurakenteet, näppäimistöllä käytettävät ohjaimet, näkyvät kohdistustyylit, responsiiviset asettelut ja vähennetyn liikkeen tuki. Tämä on lähtötaso, ei valmis saavutettavuusauditointi.

## Tietoturva ja yksityisyys

- Älä koskaan commitoi `.env`-tiedostoja, tietokantasalasanoja, API-tokeneita tai service-role-avaimia.
- Supabasen service-role-avain ohittaa rivitason käyttöoikeudet ja kuuluu vain palvelinpuolelle.
- Käsittele arvosteluja, kommentteja ja muuta käyttäjien tuottamaa sisältöä epäluotettavana syötteenä.
- Pidä jokaisen oman asennuksen käyttäjät, tietokanta, tunnukset ja sisältö erillään.
- Manuaalinen tietoturvatarkistuslista ei tarkoita, että sovellukselle olisi tehty tietoturva-auditointi.
- Katso haavoittuvuuksien ilmoittaminen ja tietoturvan lähtötaso tiedostosta [SECURITY.md](SECURITY.md).

## Dokumentaatio

- [Sovelluksen käyttöönotto](docs/APP_SETUP.md)
- [Projektin visio](docs/PROJECT_VISION.md)
- [Kehityssuunnitelma](docs/ROADMAP.md)
- [Tietomallin luonnos](docs/DATA_MODEL.md)
- [Backendin toteutussuunnitelma](docs/BACKEND_PLAN.md)
- [Supabasen paikallinen käyttöönotto ja migraatiot](supabase/README.md)
- [Backendin tietoturvatestien tarkistuslista](supabase/tests/SECURITY_TEST_CHECKLIST.md)
- [Katalogin ylläpito-ohjeet](CATALOGUE_GUIDELINES.md)
- [Osallistumisohjeet](CONTRIBUTING.md)
- [Tietoturvaohjeet](SECURITY.md)
- [English README](README.md)

## Osallistuminen

Virheraportit, rajatut ominaisuusehdotukset, dokumentaatio, käännökset, saavutettavuusarviot ja koodimuutokset ovat tervetulleita. Lue [CONTRIBUTING.md](CONTRIBUTING.md) ennen issue- tai pull request -pyynnön avaamista.

## Lisenssi ja brändi

Repositorion [MIT-lisenssin](LICENSE) piiriin kuuluvia lähdekoodeja ja materiaaleja saa käyttää, muokata ja jakaa lisenssin ehtojen mukaisesti. Projektin nimi **The Cultured Vault**, logo ja erikseen määritellyt brändimateriaalit eivät ole MIT-lisenssin perusteella automaattisesti vapaita tavaramerkkejä. Fork ei saa antaa ymmärtää olevansa alkuperäinen projekti tai alkuperäisen ylläpitäjän hyväksymä.

---

<p align="center"><strong>The Cultured Vault</strong><br><em>Avaa holvi. Löydä jotain poikkeuksellista.</em></p>


---

## Privacy, copyright and reuse | Tietosuoja, tekijänoikeudet ja käyttö

- [Privacy and data handling / Tietosuoja ja tietojen käsittely](PRIVACY.md)
- [Copyright and permitted use / Tekijänoikeudet ja materiaalin käyttö](COPYRIGHT.md)

These documents describe this repository and its current project boundaries. They are informational notices, not general contract terms. / Nämä dokumentit kuvaavat tämän repositorion ja projektin nykyisiä toimintarajoja. Ne ovat informatiivisia selosteita, eivät yleisiä sopimusehtoja.
