import { mkdir, readdir, writeFile } from "node:fs/promises";
import { join, relative, sep } from "node:path";

// GitHub Pages preserves /geek-jr/ when redirecting the former project URL
// to geekjr.xyz. Keep those bookmarked paths working after the domain move.
if (process.env.GEEK_JR_CUSTOM_DOMAIN === "geekjr.xyz") {
  const output = join(process.cwd(), "out");
  const routes = [];

  async function collect(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const path = join(directory, entry.name);
      if (directory === output && entry.name === "geek-jr") continue;
      if (entry.isDirectory()) await collect(path);
      else if (entry.name === "index.html") routes.push(directory);
    }
  }

  await collect(output);
  let generated = 0;

  for (const directory of routes) {
    const route = relative(output, directory).split(sep).filter(Boolean).join("/");
    if (route === "404" || route === "_not-found") continue;
    const target = route ? `/${route}/` : "/";
    const destination = join(output, "geek-jr", route, "index.html");
    await mkdir(join(output, "geek-jr", route), { recursive: true });
    await writeFile(destination, `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="robots" content="noindex">
  <meta http-equiv="refresh" content="0;url=${target}">
  <title>Moving to Geek Jr</title>
  <script>location.replace(${JSON.stringify(target)} + location.search + location.hash)</script>
</head>
<body><p>Geek Jr moved to <a href="${target}">${target}</a>.</p></body>
</html>\n`);
    generated += 1;
  }

  console.log(`Generated ${generated} legacy Geek Jr redirects`);
}
