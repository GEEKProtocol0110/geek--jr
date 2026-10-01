# Privacy and storage

Geek Jr currently has no account system or backend. It stores age range, parent preferences, card practice buckets, and game totals in the browser's localStorage. Closing the page keeps that data; clearing site data removes it. There is no cross-device sync or child profile.

Speech playback uses the browser's speech synthesis feature and the voice choices available on the device. Browser or operating-system voice behavior can vary. The site header links to the Geek Protocol website; following that link leaves Geek Jr.

This document describes the current app implementation. Revisit it before adding accounts, analytics, external content, or any feature that stores children's personal information.

First Words also stores per-word parent observations for understanding, saying/attempting a word, and recognizing print, with dates and independent-observation counts. These remain in the existing local practice record on this browser. They are not uploaded. The app uses no microphone or automatic speech scoring. These records describe one device's practice and are not separate child profiles.
