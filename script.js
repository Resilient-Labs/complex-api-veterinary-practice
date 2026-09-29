// page[size]=300 gets all ~283 breeds in one go instead of 10 pages of 30
const DOG_API_URL = "https://dogapi.dog/api/v2/breeds?page[size]=300";
const WIKI_API_URL = "https://en.wikipedia.org/api/rest_v1/page/summary/";
const KG_TO_LB = 2.20462;

const breedSelect = document.getElementById("breed-select");
const messageEl = document.getElementById("message");
const flowEl = document.getElementById("flow");
const flowDog = document.getElementById("flow-dog");
const flowName = document.getElementById("flow-name");
const flowWiki = document.getElementById("flow-wiki");
const resultsEl = document.getElementById("results");
const dogInfoEl = document.getElementById("dog-info");
const wikiInfoEl = document.getElementById("wiki-info");

// breeds from the Dog API, keyed by id so the dropdown value can find the full record
let breedsById = {};
let breedCount = 0;
// bumps on every selection so a slow wikipedia response for an old breed can't overwrite the new one
let currentLookup = 0;

// ---------- API 1: Dog API ----------
async function loadBreeds() {
  console.log("[Dog API] Request starting:", DOG_API_URL);
  showMessage("Loading breeds from the Dog API...", false);

  const breeds = [];
  let url = DOG_API_URL;
  let pages = 0;

  try {
    // still follow links.next in case the API ever caps page size
    // the pages cap is just so a bad "next" link can't loop forever
    while (url && pages < 20) {
      const response = await fetch(url);
      console.log(`[Dog API] Response status: ${response.status} (${url})`);

      if (!response.ok) {
        throw new Error(`Dog API responded with status ${response.status}`);
      }

      const json = await response.json();
      if (!json || !Array.isArray(json.data)) {
        console.error("[Dog API] Unexpected response shape:", json);
        throw new Error("Dog API sent back data in an unexpected format");
      }

      breeds.push(...json.data);
      url = json.links && json.links.next ? json.links.next : null;
      pages++;
    }
  } catch (error) {
    // fetch throws a TypeError when it can't connect at all (offline, DNS, CORS)
    if (error instanceof TypeError) {
      console.error("[Dog API] Network error, request never got a response:", error);
      showMessage("Couldn't connect to the Dog API. Check your internet connection and refresh.", true);
    } else {
      console.error("[Dog API] Request failed:", error);
      showMessage(`Couldn't load breeds: ${error.message}. Try refreshing the page.`, true);
    }
    breedSelect.innerHTML = '<option value="">Breeds unavailable</option>';
    return;
  }

  console.log(`[Dog API] Breeds received: ${breeds.length} (from ${pages} page(s))`);

  // skip any record with no name since that's what the wikipedia lookup needs
  const usable = breeds.filter(function (breed) {
    return breed && breed.id && breed.attributes && typeof breed.attributes.name === "string" && breed.attributes.name.trim() !== "";
  });
  if (usable.length < breeds.length) {
    console.warn(`[Dog API] Skipped ${breeds.length - usable.length} breed(s) missing an id or name`);
  }

  if (usable.length === 0) {
    console.error("[Dog API] No usable breeds in response:", breeds);
    showMessage("The Dog API didn't return any breeds. Try refreshing the page.", true);
    breedSelect.innerHTML = '<option value="">No breeds available</option>';
    return;
  }

  fillDropdown(usable);
  showMessage(`${usable.length} breeds loaded. Pick one to look it up.`, false);
}

function fillDropdown(breeds) {
  breeds.sort(function (a, b) {
    return a.attributes.name.localeCompare(b.attributes.name);
  });

  breedSelect.innerHTML = '<option value="">-- Select a breed --</option>';
  breeds.forEach(function (breed) {
    breedsById[breed.id] = breed;
    const option = document.createElement("option");
    option.value = breed.id;
    option.textContent = breed.attributes.name;
    breedSelect.appendChild(option);
  });

  breedCount = breeds.length;
  breedSelect.disabled = false;
}

// ---------- selecting a breed ----------
breedSelect.addEventListener("change", function () {
  const breed = breedsById[breedSelect.value];

  if (!breed) {
    resultsEl.hidden = true;
    flowEl.hidden = true;
    showMessage("", false);
    return;
  }

  // this name is straight from the Dog API response, it's what drives the wikipedia call
  const breedName = breed.attributes.name.trim();
  console.log(`[App] Breed selected: "${breedName}" (Dog API id ${breed.id})`);

  flowDog.textContent = `Dog API returned ${breedCount} breeds.`;
  flowName.innerHTML = "";
  flowName.append("Selected breed name from the Dog API response: ");
  appendCode(flowName, breedName);
  flowWiki.textContent = "Requesting Wikipedia summary...";
  flowEl.hidden = false;

  renderDogInfo(breed.attributes);
  wikiInfoEl.innerHTML = '<p class="muted">Loading Wikipedia summary...</p>';
  resultsEl.hidden = false;
  showMessage("", false);

  lookupWikipedia(breedName);
});

// ---------- API 2: Wikipedia ----------
async function lookupWikipedia(breedName) {
  const lookupId = ++currentLookup;

  // plain names like "Boxer" or "Akita" land on a disambiguation page, so "(dog)" is the backup
  const titles = [breedName, `${breedName} (dog)`];
  const tried = [];

  for (const title of titles) {
    const url = buildWikiUrl(title);
    tried.push(url);
    let result;

    try {
      result = await fetchWikiSummary(url);
    } catch (error) {
      if (lookupId !== currentLookup) return;
      showWikiFlow(tried, "failed");
      if (error instanceof TypeError) {
        console.error("[Wikipedia] Network error, request never got a response:", error);
        showWikiMessage("Couldn't connect to Wikipedia. Check your internet connection and try again. The Dog API profile is still available.");
      } else {
        console.error("[Wikipedia] Request failed:", error);
        showWikiMessage(`Wikipedia lookup failed: ${error.message}`);
      }
      return;
    }

    // user already picked a different breed, drop this one
    if (lookupId !== currentLookup) {
      console.log(`[Wikipedia] Ignoring stale response for "${breedName}"`);
      return;
    }

    if (result.found) {
      showWikiFlow(tried, "found");
      renderWikiInfo(result.data);
      return;
    }

    console.warn(`[Wikipedia] No usable article at "${title}" (${result.reason})`);
  }

  console.warn(`[Wikipedia] No article found for "${breedName}" after trying:`, tried);
  showWikiFlow(tried, "no article");
  showWikiMessage(`Wikipedia doesn't have an article matching "${breedName}". The Dog API profile is still available.`);
}

// wikipedia titles use underscores, and encode for names like "Cirneco dell'Etna" or "Löwchen"
function buildWikiUrl(title) {
  return WIKI_API_URL + encodeURIComponent(title.replace(/ /g, "_"));
}

// returns { found: true, data } or { found: false, reason } for "not there" cases
// throws for actual failures (server errors, rate limits, network, junk data)
async function fetchWikiSummary(url) {
  console.log("[Wikipedia] Requesting:", url);
  const response = await fetch(url);
  console.log(`[Wikipedia] Response status: ${response.status}`);

  if (response.status === 404) {
    return { found: false, reason: "404 not found" };
  }
  if (response.status === 429) {
    throw new Error("Wikipedia is rate limiting requests (429). Wait a few seconds and select the breed again");
  }
  if (!response.ok) {
    throw new Error(`Wikipedia responded with status ${response.status}`);
  }

  const data = await response.json();
  if (!data || typeof data.extract !== "string") {
    console.error("[Wikipedia] Unexpected response shape:", data);
    throw new Error("Wikipedia sent back data in an unexpected format");
  }

  if (data.type === "disambiguation") {
    return { found: false, reason: "disambiguation page" };
  }

  // "Newfoundland" and "Hokkaido" go to the place, not the dog. every breed article says dog somewhere
  const text = `${data.description || ""} ${data.extract}`;
  if (!/\bdogs?\b/i.test(text)) {
    return { found: false, reason: `article "${data.title}" isn't about a dog` };
  }

  return { found: true, data: data };
}

// ---------- rendering ----------
function renderDogInfo(attrs) {
  dogInfoEl.innerHTML = "";

  const name = document.createElement("h3");
  name.textContent = attrs.name;
  dogInfoEl.appendChild(name);

  addLine(dogInfoEl, "Description", attrs.description);
  addLine(dogInfoEl, "Life span", formatRange(attrs.life, "years"));
  addLine(dogInfoEl, "Male weight", formatWeight(attrs.male_weight));
  addLine(dogInfoEl, "Female weight", formatWeight(attrs.female_weight));

  let hypo = "Not listed";
  if (attrs.hypoallergenic === true) hypo = "Yes";
  if (attrs.hypoallergenic === false) hypo = "No";
  addLine(dogInfoEl, "Hypoallergenic", hypo);

  if (Array.isArray(attrs.other_names) && attrs.other_names.length > 0) {
    // clients don't always use the official name, so this helps at check-in
    addLine(dogInfoEl, "Also known as", attrs.other_names.join(", "));
  }
}

function renderWikiInfo(data) {
  wikiInfoEl.innerHTML = "";

  if (data.thumbnail && data.thumbnail.source) {
    const img = document.createElement("img");
    img.src = data.thumbnail.source;
    img.alt = data.title || "Breed photo";
    wikiInfoEl.appendChild(img);
  } else {
    console.log("[Wikipedia] No thumbnail in response for", data.title);
    const noImg = document.createElement("p");
    noImg.className = "muted";
    noImg.textContent = "No image available on Wikipedia.";
    wikiInfoEl.appendChild(noImg);
  }

  const title = document.createElement("h3");
  title.textContent = data.title || "Untitled article";
  wikiInfoEl.appendChild(title);

  if (data.description) {
    const desc = document.createElement("p");
    desc.className = "muted";
    desc.textContent = data.description;
    wikiInfoEl.appendChild(desc);
  }

  const extract = document.createElement("p");
  extract.textContent = data.extract.trim() !== "" ? data.extract : "Wikipedia didn't include a summary for this article.";
  wikiInfoEl.appendChild(extract);

  const pageUrl = data.content_urls && data.content_urls.desktop && data.content_urls.desktop.page;
  if (pageUrl) {
    const link = document.createElement("a");
    link.href = pageUrl;
    link.target = "_blank";
    link.rel = "noopener";
    link.textContent = "Read the full Wikipedia article";
    wikiInfoEl.appendChild(link);
  }
}

function showWikiFlow(urls, outcome) {
  flowWiki.innerHTML = "";
  flowWiki.append("Wikipedia request built from that name: ");
  urls.forEach(function (url, i) {
    if (i > 0) flowWiki.append(" then ");
    appendCode(flowWiki, url);
  });
  flowWiki.append(` → ${outcome}`);
}

function showWikiMessage(text) {
  wikiInfoEl.innerHTML = "";
  const p = document.createElement("p");
  p.className = "error";
  p.textContent = text;
  wikiInfoEl.appendChild(p);
}

// ---------- helpers ----------
// dog api ranges look like { min: 14, max: 16 }, either side can be missing
function formatRange(range, unit) {
  if (!range || (range.min == null && range.max == null)) return null;
  if (range.min == null || range.max == null || range.min === range.max) {
    return `${range.min != null ? range.min : range.max} ${unit}`;
  }
  return `${range.min}–${range.max} ${unit}`;
}

// api gives kg, but most clients here think in pounds so show both
function formatWeight(range) {
  const kg = formatRange(range, "kg");
  if (!kg) return null;
  const lb = formatRange({
    min: range.min != null ? Math.round(range.min * KG_TO_LB) : null,
    max: range.max != null ? Math.round(range.max * KG_TO_LB) : null,
  }, "lb");
  return `${kg} (${lb})`;
}

// "Not listed" instead of null/undefined showing up on the page
function addLine(parent, label, value) {
  const line = document.createElement("p");
  const labelEl = document.createElement("strong");
  labelEl.textContent = `${label}: `;
  line.appendChild(labelEl);
  line.append(value ? value : "Not listed");
  parent.appendChild(line);
}

function appendCode(parent, text) {
  const code = document.createElement("code");
  code.textContent = text;
  parent.appendChild(code);
}

function showMessage(text, isError) {
  messageEl.textContent = text;
  messageEl.className = isError ? "error" : "";
}

loadBreeds();
