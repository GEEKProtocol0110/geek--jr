# Privacy and storage

Geek Jr currently has no account system or backend. It stores age range, parent preferences, card practice buckets, and game totals in the browser's localStorage. Closing the page keeps that data; clearing site data removes it. There is no cross-device sync or child profile.

Speech playback uses the browser's speech synthesis feature and the voice choices available on the device. Browser or operating-system voice behavior can vary. The site header links to the Geek Protocol website; following that link leaves Geek Jr.

This document describes the current app implementation. Revisit it before adding accounts, analytics, external content, or any feature that stores children's personal information.

First Words also stores per-word parent observations for understanding, saying/attempting a word, and recognizing print, with dates and independent-observation counts. These remain in the existing local practice record on this browser. They are not uploaded. The app uses no microphone or automatic speech scoring. These records describe one device's practice and are not separate child profiles.

Reading Path stores per-lesson parent observations for letter sounds, blending, spelling, and reading with understanding under `geekjr_reading_v1`. Each includes a level, observation timestamp, and up to two distinct local calendar dates for independent observations. These remain in localStorage and are not uploaded. The path reports storage failures. The parent dashboard and review suggestions use these records; quiz totals are separate. One shared browser record is not a separate child profile or backup.

Reading Path uses parent sound modeling and has no microphone, hosted voice recording, or third-party video embed. Parent guide links to Oxford Owl and IES open those external websites only when clicked; their services have their own privacy behavior. No child information is included in the outbound links.
