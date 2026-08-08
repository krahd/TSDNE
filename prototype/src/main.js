import { createTSDNERuntime } from "./runtime.js";
import { downloadText, exportFiles } from "./export.js";
import { APP_VERSION } from "./version.js";

const $ = (selector) => document.querySelector(selector);
const canvases = [$("#stage-a"), $("#stage-b")];
const anotherButton = $("#another");
const useButton = $("#use");
const aboutButton = $("#about");
const pauseButton = $("#pause");
const status = $("#status");
const statusText = $("#status-text");
const statusCount = $("#status-count");
const panel = $("#panel");
const panelTitle = $("#panel-title");
const panelContent = $("#panel-content");
const panelVersion = $("#panel-version");
const live = $("#live-region");
const motionQuery = matchMedia("(prefers-reduced-motion: reduce)");

panelVersion.textContent = `v${APP_VERSION}`;

let settings = { paused: false, reducedMotion: motionQuery.matches, reducedIntensity: false };
try { settings = { ...settings, ...JSON.parse(localStorage.getItem("tsdne-settings-v2") || "{}") }; } catch {}

function persistSettings() { try { localStorage.setItem("tsdne-settings-v2", JSON.stringify(settings)); } catch {} }
function announce(message) { live.textContent = ""; requestAnimationFrame(() => { live.textContent = message; }); }
function setStatus(message = "", { busy = false, detail = "" } = {}) {
  statusText.textContent = message; statusCount.textContent = detail; status.classList.toggle("busy", busy); status.hidden = !message;
}
function applyDocumentSettings() {
  pauseButton.textContent = settings.paused ? "play" : "pause";
  pauseButton.setAttribute("aria-pressed", String(settings.paused));
  document.documentElement.dataset.reducedMotion = String(settings.reducedMotion);
  document.documentElement.dataset.reducedIntensity = String(settings.reducedIntensity);
}

const runtime = await createTSDNERuntime({ canvases, settings });
applyDocumentSettings();
runtime.on("generation-start", ({ initial }) => {
  anotherButton.disabled = true;
  const message = initial ? "composing the first shader…" : "searching for another shader…";
  setStatus(message, { busy: true });
  announce(initial ? "Composing the first shader." : "Searching for another shader.");
});
runtime.on("generation-progress", ({ found, target }) => {
  const message = runtime.encounterNumber ? "searching for another shader…" : "composing the first shader…";
  setStatus(message, { busy: true, detail: `${found}/${target}` });
});
runtime.on("generation-end", () => { anotherButton.disabled = false; });
runtime.on("encounter", () => { setStatus(""); announce("A new shader is present."); });
runtime.on("generation-error", (error) => {
  console.error(error); setStatus(`generation error: ${error instanceof Error ? error.message : String(error)}`);
  announce("A generation error occurred. Another attempt remains available.");
});
runtime.on("context-lost", () => announce("The graphics context was interrupted."));
runtime.on("context-restored", (error) => { if (error) { console.error(error); announce("The graphics context could not be restored."); } });

function showUse() {
  const current = runtime.currentEncounter()?.candidate;
  if (!current) return;
  const files = exportFiles(current); const names = Object.keys(files);
  panel.dataset.view = "use"; panelTitle.textContent = "Take the code";
  panelContent.innerHTML = `
    <p>The shader may continue elsewhere. No title, ownership, exclusivity, scarcity, authenticity, or uniqueness claim is created.</p>
    <p><strong>TSDNE retains provenance but abolishes title.</strong><br>The shader can be identified, copied, and reconstructed, but not claimed.</p>
    <div class="export-grid" id="export-grid"></div><label for="code">Preview</label><textarea id="code" spellcheck="false"></textarea>`;
  const grid = $("#export-grid"); const area = $("#code"); const select = document.createElement("select");
  select.setAttribute("aria-label", "Choose export preview");
  for (const name of names) { const option = document.createElement("option"); option.value = name; option.textContent = name; select.append(option); }
  area.value = files[names[0]]; select.addEventListener("change", () => { area.value = files[select.value]; }); grid.append(select);
  for (const name of names) {
    const button = document.createElement("button"); button.type = "button"; button.textContent = `download ${name}`;
    button.addEventListener("click", () => downloadText(name, files[name], name.endsWith(".html") ? "text/html" : "text/plain")); grid.append(button);
  }
  const copy = document.createElement("button"); copy.type = "button"; copy.textContent = "copy preview";
  copy.addEventListener("click", async () => navigator.clipboard.writeText(area.value)); grid.append(copy); panel.showModal();
}

function infoNavigation(active) {
  const items = [
    ["about", "about"],
    ["privacy", "privacy"],
    ["accessibility", "accessibility"],
  ];
  return `<nav class="panel-nav" aria-label="About sections">${items.map(([view, label]) =>
    `<button type="button" class="panel-nav-link" data-info-view="${view}" ${view === active ? 'aria-current="page"' : ""}>${label}</button>`
  ).join("")}</nav>`;
}

function settingsControls() {
  return `<section class="panel-settings" aria-labelledby="experience-heading">
    <h2 id="experience-heading">Experience</h2>
    <div class="setting-list">
      <label class="setting-row"><span>reduce shader motion and transitions</span><input id="setting-motion" type="checkbox" ${settings.reducedMotion ? "checked" : ""}></label>
      <label class="setting-row"><span>reduce colour intensity</span><input id="setting-intensity" type="checkbox" ${settings.reducedIntensity ? "checked" : ""}></label>
    </div>
    <button id="clear-history" class="text-action" type="button">clear local anti-repetition memory</button>
  </section>`;
}

function aboutMarkup() {
  return `
    <div class="panel-reading">
      <p class="panel-lede">One shader appears. You may remain with it, relinquish it for another, or take its executable code elsewhere.</p>
      <p>TSDNE produces difference without profiling the visitor. There is no account, recommendation process, behavioural model, public archive, ownership registry, or runtime language model.</p>
      <p>A bounded local memory remembers enough about recent perception to discourage obvious repetition, but not enough to reconstruct what was relinquished. Nothing is uploaded.</p>
      <blockquote><p>TSDNE retains provenance but abolishes title.</p><p>The shader can be identified, copied, and reconstructed, but not claimed.</p></blockquote>
      ${settingsControls()}
      <p class="panel-keys"><span>keyboard</span> <kbd>N</kbd> another · <kbd>U</kbd> take the code · <kbd>Space</kbd> pause · <kbd>A</kbd> about</p>
      <p class="panel-credit">TSDNE is a project by <a href="https://laurenzo.net/">Tomas Laurenzo</a>.</p>
    </div>`;
}

function privacyMarkup() {
  return `
    <article class="panel-reading info-document">
      <h2>Privacy</h2>
      <p>TSDNE generates, renders, evaluates, and hashes shaders locally. It uses no account, analytics, advertising, remote inference, language model, behavioural profile, or server-side generation.</p>
      <h3>Local anti-repetition memory</h3>
      <p>The browser stores a bounded set of non-reconstructive perceptual traces: a local random key, display time, broad family, and compact colour, luminance, spatial, and temporal descriptors.</p>
      <p>It does not store source, seed, graph, hash, image, video, personal identity, dwell time, or preference labels. The system remembers enough not to repeat, but not enough to restore.</p>
      <h3>Provenance</h3>
      <p>Source and graph hashes exist only in active runtime memory and in a technical manifest when the visitor deliberately takes the code. No public registry or certificate is created.</p>
    </article>`;
}

function accessibilityMarkup() {
  return `
    <article class="panel-reading info-document">
      <h2>Accessibility</h2>
      <p>TSDNE is an animated visual artwork. It provides pause, reduced-motion, reduced-intensity, keyboard operation, semantic controls, and status announcements.</p>
      <h3>Keyboard</h3>
      <p><kbd>N</kbd> another, <kbd>U</kbd> take the code, <kbd>Space</kbd> pause/play, <kbd>A</kbd> about.</p>
      <h3>Progress</h3>
      <p>While a new shader is being searched for, a status line reports that generation is under way. Under <code>prefers-reduced-motion</code>, the turning indicator becomes a slow fade. The search counter is hidden from assistive technology so that progress is announced once rather than on every increment.</p>
      <h3>Motion and light</h3>
      <p>The application respects <code>prefers-reduced-motion</code>. Candidate shaders undergo automated large-area luminance-change screening, although this is not clinical certification.</p>
      ${settingsControls()}
    </article>`;
}

function bindSettingsControls() {
  const motion = $("#setting-motion");
  const intensity = $("#setting-intensity");
  const clearHistory = $("#clear-history");
  if (motion) motion.addEventListener("change", (event) => {
    settings.reducedMotion = event.target.checked; persistSettings(); applyDocumentSettings(); runtime.setSettings(settings);
  });
  if (intensity) intensity.addEventListener("change", (event) => {
    settings.reducedIntensity = event.target.checked; persistSettings(); applyDocumentSettings(); runtime.setSettings(settings);
  });
  if (clearHistory) clearHistory.addEventListener("click", async () => {
    await runtime.clearLocalHistory(); announce("Local anti-repetition memory cleared.");
  });
}

function showInfoView(view = "about") {
  const validView = ["about", "privacy", "accessibility"].includes(view) ? view : "about";
  panel.dataset.view = validView;
  panelTitle.textContent = "This Shader Does Not Exist";
  const body = validView === "privacy" ? privacyMarkup() : validView === "accessibility" ? accessibilityMarkup() : aboutMarkup();
  panelContent.innerHTML = `${infoNavigation(validView)}${body}`;
  panelContent.querySelectorAll("[data-info-view]").forEach((button) => {
    button.addEventListener("click", () => showInfoView(button.dataset.infoView));
  });
  bindSettingsControls();
  if (!panel.open) panel.showModal();
}

anotherButton.addEventListener("click", () => void runtime.another().catch(() => {}));
useButton.addEventListener("click", showUse); aboutButton.addEventListener("click", () => showInfoView("about"));
pauseButton.addEventListener("click", () => {
  settings.paused = !settings.paused; persistSettings(); applyDocumentSettings(); runtime.setSettings(settings);
  announce(settings.paused ? "Shader paused." : "Shader playing.");
});
window.addEventListener("keydown", (event) => {
  if (panel.open || event.target.matches("textarea,input,select")) return;
  if (event.key.toLowerCase() === "n") { event.preventDefault(); void runtime.another().catch(() => {}); }
  else if (event.key.toLowerCase() === "u") { event.preventDefault(); showUse(); }
  else if (event.key.toLowerCase() === "a") { event.preventDefault(); showInfoView("about"); }
  else if (event.code === "Space") { event.preventDefault(); pauseButton.click(); }
});

await runtime.start();
