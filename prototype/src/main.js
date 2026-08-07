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

function settingsControls() {
  return `<fieldset><legend>Experience settings</legend>
    <label><input id="setting-motion" type="checkbox" ${settings.reducedMotion ? "checked" : ""}> reduce shader motion and transitions</label>
    <label><input id="setting-intensity" type="checkbox" ${settings.reducedIntensity ? "checked" : ""}> reduce colour intensity</label>
    <button id="clear-history" type="button">clear local anti-repetition memory</button></fieldset>`;
}
function showAbout() {
  panel.dataset.view = "about"; panelTitle.textContent = "This Shader Does Not Exist";
  panelContent.innerHTML = `
    <p>One shader appears. You may remain with it, relinquish it for another, or take its executable code elsewhere.</p>
    <p>The work uses authored procedural systems and local computational search. It uses no language model, account, profile, recommendation system, advertising system, or server-side inference.</p>
    <p>A bounded local memory stores only non-reconstructive perceptual traces. It remembers enough to avoid obvious repetition, but not enough to restore what was relinquished. Nothing is uploaded.</p>
    <p>The application internally computes hashes for technical integrity. It does not issue certificates, create a public registry, claim uniqueness, or convert provenance into property.</p>
    <p><strong>TSDNE retains provenance but abolishes title.</strong><br><strong>The shader can be identified, copied, and reconstructed, but not claimed.</strong></p>
    ${settingsControls()}
    <p><a href="./privacy.html">privacy</a> · <a href="./accessibility.html">accessibility</a> · keyboard: <kbd>N</kbd> another, <kbd>U</kbd> take the code, <kbd>Space</kbd> pause, <kbd>A</kbd> about</p>`;
  const bind = (id, key) => $(id).addEventListener("change", (event) => {
    settings[key] = event.target.checked; persistSettings(); applyDocumentSettings(); runtime.setSettings(settings);
  });
  bind("#setting-motion", "reducedMotion"); bind("#setting-intensity", "reducedIntensity");
  $("#clear-history").addEventListener("click", async () => { await runtime.clearLocalHistory(); announce("Local anti-repetition memory cleared."); });
  panel.showModal();
}

anotherButton.addEventListener("click", () => void runtime.another().catch(() => {}));
useButton.addEventListener("click", showUse); aboutButton.addEventListener("click", showAbout);
pauseButton.addEventListener("click", () => {
  settings.paused = !settings.paused; persistSettings(); applyDocumentSettings(); runtime.setSettings(settings);
  announce(settings.paused ? "Shader paused." : "Shader playing.");
});
window.addEventListener("keydown", (event) => {
  if (panel.open || event.target.matches("textarea,input,select")) return;
  if (event.key.toLowerCase() === "n") { event.preventDefault(); void runtime.another().catch(() => {}); }
  else if (event.key.toLowerCase() === "u") { event.preventDefault(); showUse(); }
  else if (event.key.toLowerCase() === "a") { event.preventDefault(); showAbout(); }
  else if (event.code === "Space") { event.preventDefault(); pauseButton.click(); }
});
window.addEventListener("resize", () => runtime.resize());
motionQuery.addEventListener?.("change", (event) => {
  if (!localStorage.getItem("tsdne-settings-v2")) { settings.reducedMotion = event.matches; applyDocumentSettings(); runtime.setSettings(settings); }
});
window.addEventListener("beforeunload", () => runtime.stop());
await runtime.start();
