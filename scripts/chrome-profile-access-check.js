const path = require("path");

const { chromium } = require(path.join(
  process.env.TEMP,
  "codex-playwright-profile",
  "node_modules",
  "playwright-core"
));

async function main() {
  const cloneRoot = process.env.CLONE_ROOT;
  const chromePath = process.env.CHROME_PATH;
  const outputDir = process.env.OUTPUT_DIR;

  if (!cloneRoot) {
    throw new Error("CLONE_ROOT nao definido.");
  }

  if (!chromePath) {
    throw new Error("CHROME_PATH nao definido.");
  }

  if (!outputDir) {
    throw new Error("OUTPUT_DIR nao definido.");
  }

  const context = await chromium.launchPersistentContext(cloneRoot, {
    executablePath: chromePath,
    headless: false,
    args: [
      "--profile-directory=Profile 14",
      "--no-default-browser-check",
      "--no-first-run",
    ],
  });

  const page = context.pages()[0] || (await context.newPage());
  const targets = [
    {
      name: "shopify",
      url: "https://admin.shopify.com/store/cd592c-2?ui_locales=pt-BR&country=BR",
    },
    {
      name: "reportana",
      url: "https://app.reportana.com/#/dashboard/overview",
    },
  ];

  const results = [];

  for (const target of targets) {
    await page.goto(target.url, {
      waitUntil: "domcontentloaded",
      timeout: 90000,
    });
    await page.waitForTimeout(6000);

    const shotPath = path.join(
      outputDir,
      `raminho-${target.name}-profile-test.png`
    );

    await page.screenshot({
      path: shotPath,
      fullPage: false,
    });

    results.push({
      name: target.name,
      requestedUrl: target.url,
      finalUrl: page.url(),
      title: await page.title(),
      screenshot: shotPath,
    });
  }

  console.log(JSON.stringify(results, null, 2));

  if (process.env.KEEP_OPEN === "1") {
    await new Promise(() => {});
  }

  await context.close();
}

main().catch((error) => {
  console.error(error && error.stack ? error.stack : error);
  process.exit(1);
});
