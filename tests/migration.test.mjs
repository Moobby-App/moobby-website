import assert from "node:assert/strict";
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { test } from "node:test";

const before = readFileSync(new URL("../dist/index.html", import.meta.url), "utf8");
const after = readFileSync(new URL("../.next/server/app/index.html", import.meta.url), "utf8");
const values = (html, attribute) => [...html.matchAll(new RegExp(`\\b${attribute}="([^"]*)"`, "g"))].map(match => match[1]);

test("all previous section and interaction anchors remain unique and addressable", () => {
  const ids = values(after, "id");
  assert.equal(ids.length, new Set(ids).size, "duplicate IDs in rendered HTML");
  for (const id of values(before, "id")) assert.ok(ids.includes(id), `missing original ID: ${id}`);
  for (const href of values(after, "href").filter(href => href.startsWith("#"))) {
    assert.ok(ids.includes(href.slice(1)), `broken anchor: ${href}`);
  }
});

test("original asset bytes are preserved in public", () => {
  for (const asset of readdirSync(new URL("../dist/assets/", import.meta.url))) {
    const oldAsset = readFileSync(new URL(`../dist/assets/${asset}`, import.meta.url));
    const newAsset = readFileSync(new URL(`../public/assets/${asset}`, import.meta.url));
    assert.deepEqual(newAsset, oldAsset, asset);
  }
});

test("rendered HTML and CSS use existing public asset paths", () => {
  const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");
  const paths = [...(after + css).matchAll(/(?:["'(])\/assets\/([\w.-]+)/g)].map(match => match[1]);
  assert.ok(paths.length > 10);
  for (const path of paths) assert.ok(existsSync(new URL(`../public/assets/${path}`, import.meta.url)), path);
  assert.ok(!after.includes('src="site.js"'), "legacy script must not initialize alongside React");
});

test("essential content and controls render without waiting for client JavaScript", () => {
  assert.equal((after.match(/data-scene="/g) ?? []).length, 6);
  assert.equal((after.match(/class="flight-card"/g) ?? []).length, 6);
  assert.equal((after.match(/class="team-member"/g) ?? []).length, 5);
  assert.equal((after.match(/class="scenario-card"/g) ?? []).length, 16);
  for (const label of ["Lancar", "Terlambat", "Terganggu", "Jeda animasi skenario", "Contoh tampilan aplikasi, bukan kondisi KRL terkini."]) {
    assert.ok(after.includes(label), `missing content: ${label}`);
  }
  assert.ok(after.includes('<html lang="id"'));
});
