![Geek Jr — Curiosity starts here](public/geek-jr-banner.svg)

**[Play Geek Jr](https://geekprotocol0110.github.io/geek-jr/)** · [Deployment status](https://github.com/GEEKProtocol0110/geek-jr/actions/workflows/pages.yml)


<p align="center"><strong>Curiosity starts here.</strong><br/>Five focused learning activities for children ages 1–10, from Geek Protocol.</p>


<p align="center">
  <a href="https://github.com/GEEKProtocol0110/geek-jr/actions/workflows/ci.yml"><img src="https://github.com/GEEKProtocol0110/geek-jr/actions/workflows/ci.yml/badge.svg" alt="Build status"/></a>
  <img src="https://img.shields.io/badge/Next.js-16-101820" alt="Next.js 16"/>
  <img src="https://img.shields.io/badge/Ages-1%E2%80%9310-228d74" alt="Ages 1 through 10"/>
</p>


Geek Jr turns short practice sessions into a simple daily learning habit. Parents choose a learning level and session length; children can begin without an account. It grew from picture and word cards for the youngest learners.


## Activities


| Activity | What happens |
| --- | --- |
| **Picture Cards** | See a picture or prompt, hear a word, and mark it “Got it” or “Need practice” |
| **Phonics Tap** | Hear a prompt or choice, then pick the matching sound |
| **Memory Match** | Flip cards to find picture pairs |
| **Patterns & Logic** | Choose what comes next |
| **Story Sequence** | Complete a short sequence; optional Bible story questions |


Content is organized into four age ranges: **1–2**, **3–4**, **5–7**, and **8–10**. The youngest range has visual prompts and no timer. This is a starter library, not a complete curriculum; parental guidance is recommended, especially for children who are not reading yet.


## Run the app


Use Node.js 20.9 or newer.


```bash
npm ci
npm run dev
```


Open `http://localhost:3000`. The home page links to every activity and to **Parent settings**.


```bash
npm run lint
npm run build
```


The same checks run in [GitHub Actions](.github/workflows/ci.yml) for pull requests and pushes to `main`.


## How it works


```text
src/app/         Next.js pages and site layout
src/modules/     Picture cards and activity games
src/data/        Age-tiered starter content in JSON
src/lib/         Shared settings, types, and browser storage
public/         Brand artwork and icon
```


Parent settings control age range, round length, time limit for older learners, and whether Bible story questions appear. Preferences and progress are saved in this browser only; they do not sync between devices. See [privacy and storage](docs/PRIVACY.md) for details.


Browser speech synthesis reads card words and activity prompts. Pronunciation and voice availability depend on the device. Bible story content is off by default and currently includes one starter question per age range.


## Contribute


Start with [CONTRIBUTING.md](CONTRIBUTING.md) for the development workflow and [content guidelines](docs/CONTENT_GUIDELINES.md) before adding learning prompts. Keep questions clear, age appropriate, and verifiable.
