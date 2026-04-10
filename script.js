const GEN_MAX = {1:151,2:251,3:386,4:493,5:649,6:721}
const GEN_RANGES = {1:[1,151],2:[152,251],3:[252,386],4:[387,493],5:[494,649],6:[650,721]}
function getGenRange(gen){ return GEN_RANGES[gen] || GEN_RANGES[1] }
let CURRENT_GEN = 1
let MAX_ID = GEN_MAX[1]

// Gen1 fallback fully enumerated; other gens created programmatically to avoid manual errors.
const GEN1_FALLBACK = [
  {id:1,name:'bulbasaur'},{id:2,name:'ivysaur'},{id:3,name:'venusaur'},{id:4,name:'charmander'},{id:5,name:'charmeleon'},{id:6,name:'charizard'},{id:7,name:'squirtle'},{id:8,name:'wartortle'},{id:9,name:'blastoise'},{id:10,name:'caterpie'},{id:11,name:'metapod'},{id:12,name:'butterfree'},{id:13,name:'weedle'},{id:14,name:'kakuna'},{id:15,name:'beedrill'},{id:16,name:'pidgey'},{id:17,name:'pidgeotto'},{id:18,name:'pidgeot'},{id:19,name:'rattata'},{id:20,name:'raticate'},{id:21,name:'spearow'},{id:22,name:'fearow'},{id:23,name:'ekans'},{id:24,name:'arbok'},{id:25,name:'pikachu'},{id:26,name:'raichu'},{id:27,name:'sandshrew'},{id:28,name:'sandslash'},{id:29,name:'nidoran-f'},{id:30,name:'nidorina'},{id:31,name:'nidoqueen'},{id:32,name:'nidoran-m'},{id:33,name:'nidorino'},{id:34,name:'nidoking'},{id:35,name:'clefairy'},{id:36,name:'clefable'},{id:37,name:'vulpix'},{id:38,name:'ninetales'},{id:39,name:'jigglypuff'},{id:40,name:'wigglytuff'},{id:41,name:'zubat'},{id:42,name:'golbat'},{id:43,name:'oddish'},{id:44,name:'gloom'},{id:45,name:'vileplume'},{id:46,name:'paras'},{id:47,name:'parasect'},{id:48,name:'venonat'},{id:49,name:'venomoth'},{id:50,name:'diglett'},{id:51,name:'dugtrio'},{id:52,name:'meowth'},{id:53,name:'persian'},{id:54,name:'psyduck'},{id:55,name:'golduck'},{id:56,name:'mankey'},{id:57,name:'primeape'},{id:58,name:'growlithe'},{id:59,name:'arcanine'},{id:60,name:'poliwag'},{id:61,name:'poliwhirl'},{id:62,name:'poliwrath'},{id:63,name:'abra'},{id:64,name:'kadabra'},{id:65,name:'alakazam'},{id:66,name:'machop'},{id:67,name:'machoke'},{id:68,name:'machamp'},{id:69,name:'bellsprout'},{id:70,name:'weepinbell'},{id:71,name:'victreebel'},{id:72,name:'tentacool'},{id:73,name:'tentacruel'},{id:74,name:'geodude'},{id:75,name:'graveler'},{id:76,name:'golem'},{id:77,name:'ponyta'},{id:78,name:'rapidash'},{id:79,name:'slowpoke'},{id:80,name:'slowbro'},{id:81,name:'magnemite'},{id:82,name:'magneton'},{id:83,name:'farfetchd'},{id:84,name:'doduo'},{id:85,name:'dodrio'},{id:86,name:'seel'},{id:87,name:'dewgong'},{id:88,name:'grimer'},{id:89,name:'muk'},{id:90,name:'shellder'},{id:91,name:'cloyster'},{id:92,name:'gastly'},{id:93,name:'haunter'},{id:94,name:'gengar'},{id:95,name:'onix'},{id:96,name:'drowzee'},{id:97,name:'hypno'},{id:98,name:'krabby'},{id:99,name:'kingler'},{id:100,name:'voltorb'},{id:101,name:'electrode'},{id:102,name:'exeggcute'},{id:103,name:'exeggutor'},{id:104,name:'cubone'},{id:105,name:'marowak'},{id:106,name:'hitmonlee'},{id:107,name:'hitmonchan'},{id:108,name:'lickitung'},{id:109,name:'koffing'},{id:110,name:'weezing'},{id:111,name:'rhyhorn'},{id:112,name:'rhydon'},{id:113,name:'chansey'},{id:114,name:'tangela'},{id:115,name:'kangaskhan'},{id:116,name:'horsea'},{id:117,name:'seadra'},{id:118,name:'goldeen'},{id:119,name:'seaking'},{id:120,name:'staryu'},{id:121,name:'starmie'},{id:122,name:'mr-mime'},{id:123,name:'scyther'},{id:124,name:'jynx'},{id:125,name:'electabuzz'},{id:126,name:'magmar'},{id:127,name:'pinsir'},{id:128,name:'tauros'},{id:129,name:'magikarp'},{id:130,name:'gyarados'},{id:131,name:'lapras'},{id:132,name:'ditto'},{id:133,name:'eevee'},{id:134,name:'vaporeon'},{id:135,name:'jolteon'},{id:136,name:'flareon'},{id:137,name:'porygon'},{id:138,name:'omanyte'},{id:139,name:'omastar'},{id:140,name:'kabuto'},{id:141,name:'kabutops'},{id:142,name:'aerodactyl'},{id:143,name:'snorlax'},{id:144,name:'articuno'},{id:145,name:'zapdos'},{id:146,name:'moltres'},{id:147,name:'dratini'},{id:148,name:'dragonair'},{id:149,name:'dragonite'},{id:150,name:'mewtwo'},{id:151,name:'mew'}
]

function makeFallbackRange(start, end){
  const out = []
  for (let i=start;i<=end;i++) out.push({id:i,name:`pk${i}`} )
  return out
}

const FALLBACK_POKEMON_BY_GEN = {
  1: GEN1_FALLBACK,
  2: makeFallbackRange(152,251),
  3: makeFallbackRange(252,386),
  4: makeFallbackRange(387,493),
  5: makeFallbackRange(494,649),
  6: makeFallbackRange(650,721)
}


let secret = null

const el = id => document.getElementById(id)
const setCell = (id, text, cls) => {
  const node = el(id)
  node.textContent = text
  node.classList.remove('green','yellow','red')
  if (cls) node.classList.add(cls)
}

function formatHeight(dm){ // decimeters -> XmYY
  const cm = dm*10
  const m = Math.floor(cm/100)
  const rest = cm%100
  return `${m}m${rest.toString().padStart(2,'0')}`
}

function formatWeight(hg){ // hectograms -> Xkg or X.Ykg
  const kg = hg/10
  return Number.isInteger(kg) ? `${kg}kg` : `${kg.toFixed(1)}kg`
}

async function fetchJSON(url){
  const r = await fetch(url)
  if (!r.ok) throw new Error(`HTTP ${r.status}: ${url}`)
  return r.json()
}

// load secret with graceful fallback
async function loadSecret(id){
  let p, s
  // Try to fetch pokemon data first; if that fails use fallback. Species is optional
  try{
    p = await fetchJSON(`https://pokeapi.co/api/v2/pokemon/${id}`)
  }catch(err){
    console.warn('Falha ao carregar dados do Pokémon, usando fallback parcial:', err)
    el('log').textContent = 'Aviso: PokeAPI inacessível — usando dados locais parciais.'
    const fbgen = FALLBACK_POKEMON_BY_GEN[CURRENT_GEN] || FALLBACK_POKEMON_BY_GEN[1]
    const fb = fbgen.find(x=>x.id==id) || fbgen[0]
    p = {id: fb.id, name: fb.name, types: [], height: 0, weight: 0, sprites: { front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${fb.id}.png` }}
    s = {habitat:null, color:null, evolution_chain:{url:null}, name: fb.name}
    // continue with fallback
  }
  // try species, but don't treat species failure as total failure
  try{
    if (!s) s = await fetchJSON(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
  }catch(err){
    console.warn('Falha ao carregar species (não fatal):', err)
    if (!s) s = {habitat:null, color:null, evolution_chain:{url:null}, name: p?.name || 'unknown'}
  }
  const types = (p.types||[]).sort((a,b)=> (a.slot||0)-(b.slot||0)).map(t=>t.type?.name).filter(Boolean)
  const habitat = s.habitat ? s.habitat.name : 'unknown'
  const color = s.color ? s.color.name : 'unknown'
  const height = p.height || 0
  const weight = p.weight || 0
  const stage = s ? await getEvolutionStageFromSpecies(s).catch(()=>1) : 1
  secret = {id:p.id,name:p.name,types,habitat,color,height,weight,stage}
  el('poke-img').src = ''
  el('poke-name').textContent = '?????'
  setCell('tipo1','?')
  setCell('tipo2','?')
  setCell('habitat','?')
  setCell('cor','?')
  setCell('fase','?')
  setCell('altura','?')
  setCell('peso','?')
  el('log').textContent = 'Novo Pokémon escolhido! Faça um chute.'
}

let namesList = []

function normalizeName(n){
  return String(n||'').toLowerCase().replace(/\s+/g,'').replace(/[^a-z0-9-]/g,'')
}
async function loadNames(){
  try{
    const range = getGenRange(CURRENT_GEN)
    const start = range[0]
    const end = range[1]
    const count = end - start + 1
    const offset = start - 1
    const data = await fetchJSON(`https://pokeapi.co/api/v2/pokemon?limit=${count}&offset=${offset}`)
    namesList = data.results.map(r=>{
      const parts = r.url.split('/').filter(Boolean)
      const id = parts[parts.length-1]
      return {
        name: r.name,
        displayName: r.name.charAt(0).toUpperCase() + r.name.slice(1),
        id,
        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
      }
    })
  }catch(err){
    console.warn('Falha ao carregar nomes da PokeAPI, usando fallback local:', err)
    el('log').textContent = 'Aviso: PokeAPI inacessível — usando lista local.'
    const fbgen = FALLBACK_POKEMON_BY_GEN[CURRENT_GEN] || FALLBACK_POKEMON_BY_GEN[1]
    namesList = fbgen.map(p=>({
      name: p.name,
      displayName: (String(p.name).charAt(0).toUpperCase() + String(p.name).slice(1)).replace('-', ' '),
      id: p.id,
      sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`
    }))
  }
}

function clearSuggestions(){
  const s = el('suggestions')
  s.innerHTML = ''
  s.hidden = true
}

let highlightedIndex = -1
function showSuggestions(query){
  const s = el('suggestions')
  s.innerHTML = ''
  if (!namesList.length) { clearSuggestions(); return }
  const q = (query || '').toLowerCase()
  const matches = q ? namesList.filter(n => n.displayName.toLowerCase().includes(q) || n.name.includes(q)).slice(0,12) : namesList.slice(0,15)
  if (!matches.length){ clearSuggestions(); return }
  matches.forEach((item, idx) =>{
    const div = document.createElement('div')
    div.className = 'suggestion-item'
    div.dataset.index = String(idx)
    div.innerHTML = `<img src="${item.sprite}" alt=""><div class="s-name">${item.displayName}</div>`
    div.addEventListener('click', ()=>{
      const input = el('guess')
      input.value = item.displayName
      input.dataset.apiName = item.name
      clearSuggestions()
      input.focus()
    })
    s.appendChild(div)
  })
  highlightedIndex = -1
  s.hidden = false
}

function updateHighlight(dir){
  const s = el('suggestions')
  if (s.hidden) return
  const items = Array.from(s.querySelectorAll('.suggestion-item'))
  if (!items.length) return
  if (highlightedIndex >=0 && items[highlightedIndex]) items[highlightedIndex].classList.remove('selected')
  if (dir === 0){ highlightedIndex = 0 }
  else if (dir === 1) highlightedIndex = Math.min(items.length-1, highlightedIndex+1)
  else if (dir === -1) highlightedIndex = Math.max(0, highlightedIndex-1)
  if (highlightedIndex === -1) highlightedIndex = items.length-1
  const cur = items[highlightedIndex]
  if (cur){ cur.classList.add('selected'); cur.scrollIntoView({block:'nearest'}) }
}

function chooseHighlighted(){
  const s = el('suggestions')
  if (s.hidden) return null
  const items = Array.from(s.querySelectorAll('.suggestion-item'))
  if (!items.length) return null
  const idx = highlightedIndex >=0 ? highlightedIndex : 0
  const selected = items[idx]
  if (!selected) return null
  const name = selected.querySelector('.s-name')?.textContent || ''
  const item = namesList.find(n => n.displayName === name)
  if (!item) return null
  const input = el('guess')
  input.value = item.displayName
  input.dataset.apiName = item.name
  clearSuggestions()
  return item.name
}

async function getEvolutionStageFromSpecies(species){
  if (!species || !species.evolution_chain?.url) return 1
  try{
    const chain = await fetchJSON(species.evolution_chain.url)
    const name = species.name
    function traverse(node, depth){
      if (node.species.name === name) return depth
      for (const c of node.evolves_to){
        const found = traverse(c, depth+1)
        if (found) return found
      }
      return null
    }
    const d = traverse(chain.chain,1)
    return d || 1
  }catch(e){
    return 1
  }
}

function compareTypes(secretTypes, guessTypes){
  const out = ['red','red']
  const s = secretTypes || []
  const g = guessTypes || []
  for (let i=0;i<2;i++){
    const sVal = s[i] || null
    const gVal = g[i] || null
    if (!sVal && !gVal){ out[i] = 'green'; continue }
    if (sVal && gVal && sVal===gVal) out[i] = 'green'
    else if ( (gVal && s.includes(gVal)) || (sVal && g.includes(sVal)) ) out[i] = 'yellow'
    else out[i] = 'red'
  }
  return out
}

function compareNumber(secretNum, guessNum){
  if (secretNum === guessNum) return 'green'
  if (!secretNum) return 'red'
  const diff = Math.abs(secretNum - guessNum)
  if (diff/secretNum <= 0.1) return 'yellow'
  return 'red'
}

function compareEqual(a,b){ return a===b ? 'green' : 'red' }

// main guess handler with graceful fallback when API fails
async function doGuess(name){
  const apiName = String(name).toLowerCase()
  if (!secret || !secret.name){ el('log').textContent = 'Aguarde: Pokémon secreto não carregado.'; return }
  let gp, gs, gstage, gtypes
  let usedFallback = false
  // Try to fetch pokemon data first
  try{
    gp = await fetchJSON(`https://pokeapi.co/api/v2/pokemon/${apiName}`)
    gtypes = (gp.types||[]).sort((a,b)=>a.slot-b.slot).map(t=>t.type.name)
  }catch(err){
    // gp failed -> fallback
    usedFallback = true
    console.warn('Falha ao buscar Pokémon (pokemon endpoint) na API, usando fallback se disponível:', err)
    const fbgen = FALLBACK_POKEMON_BY_GEN[CURRENT_GEN] || FALLBACK_POKEMON_BY_GEN[1]
    const fb = namesList.find(n=>n.name===apiName) || namesList.find(n=>n.displayName.toLowerCase()===apiName) || fbgen.find(n=>String(n.name)===apiName) || fbgen.find(n=>String(n.id)===apiName)
    if (!fb){ el('log').textContent = 'Não encontrei esse Pokémon (API indisponível e sem fallback).'; return }
    gp = { id: fb.id, name: fb.name, types: [], height: 0, weight: 0, sprites: { other: { 'official-artwork': { front_default: null } }, front_default: fb.sprite } }
    gtypes = []
  }
  // Try species, but if it fails keep going (not fatal)
  try{
    if (!usedFallback){
      gs = await fetchJSON(`https://pokeapi.co/api/v2/pokemon-species/${apiName}`)
    }else{
      // try by id if possible
      const tryId = gp?.id
      if (tryId) try{ gs = await fetchJSON(`https://pokeapi.co/api/v2/pokemon-species/${tryId}`) }catch(e){ gs = {habitat:null,color:null,name:gp.name} }
    }
    gstage = await getEvolutionStageFromSpecies(gs)
  }catch(err){
    console.warn('Falha ao buscar species (não fatal):', err)
    if (!gs) gs = {habitat:null,color:null,name: gp?.name || apiName}
    gstage = 1
  }

  // set main card image/name
  const imgSrc = (gp.sprites && (gp.sprites.other?.['official-artwork']?.front_default || gp.sprites.front_default)) || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${gp.id}.png`
  el('poke-img').src = imgSrc
  el('poke-name').textContent = gp.name.charAt(0).toUpperCase() + gp.name.slice(1)

  // types
  const typeClasses = compareTypes(secret.types || [], gtypes)
  setCell('tipo1', gtypes[0]||'—', typeClasses[0])
  setCell('tipo2', gtypes[1]||'Não tens', typeClasses[1])
  // habitat
  const habitat = gs.habitat ? gs.habitat.name : 'unknown'
  setCell('habitat', habitat, compareEqual(secret.habitat,habitat))
  // color
  const color = gs.color ? gs.color.name : 'unknown'
  setCell('cor', color, compareEqual(secret.color,color))
  // stage
  setCell('fase', String(gstage), Math.abs((secret.stage||1) - gstage)===0 ? 'green' : (Math.abs((secret.stage||1)-gstage)===1 ? 'yellow' : 'red'))
  // height
  setCell('altura', formatHeight(gp.height || 0), compareNumber(secret.height || 0, gp.height || 0))
  // weight
  setCell('peso', formatWeight(gp.weight || 0), compareNumber(secret.weight || 0, gp.weight || 0))

  const isCorrect = normalizeName(gp.name) === normalizeName(secret.name)
  el('log').textContent = `Você chutou: ${gp.name}.` + (isCorrect ? ' Acertou!' : '')
  if (isCorrect) el('log').textContent = `Parabéns! Era ${secret.name}.`

  // add to history
  addHistoryEntry({
    id: gp.id,
    name: gp.name,
    displayName: gp.name.charAt(0).toUpperCase()+gp.name.slice(1),
    sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${gp.id}.png`,
    types: gtypes,
    typeClasses,
    habitat: habitat,
    habitatClass: compareEqual(secret.habitat, habitat),
    color: color,
    colorClass: compareEqual(secret.color, color),
    stage: gstage,
    stageClass: Math.abs((secret.stage||1) - gstage)===0 ? 'green' : (Math.abs((secret.stage||1)-gstage)===1 ? 'yellow' : 'red'),
    height: gp.height || 0,
    heightClass: compareNumber(secret.height || 0, gp.height || 0),
    weight: gp.weight || 0,
    weightClass: compareNumber(secret.weight || 0, gp.weight || 0),
    correct: isCorrect,
    partial: usedFallback
  })
}

const historyList = []
function addHistoryEntry(entry){
  historyList.unshift(entry)
  if (historyList.length>12) historyList.pop()
  renderHistory()
}

function renderHistory(){
  const root = el('history')
  root.innerHTML = ''
  historyList.forEach(item=>{
    const div = document.createElement('div')
    div.className = 'history-item'
    div.innerHTML = `
      <img src="${item.sprite}" alt="">
      <div>
        <div class="h-meta">${item.displayName} ${item.correct?'<span style="color:var(--green);font-weight:800">✓</span>':''}${item.partial?'<span style="font-size:12px;margin-left:6px;color:#666">(parcial)</span>':''}</div>
        <div class="h-cells">
          <div class="h-cell small ${item.typeClasses[0]}">${item.types[0]||'–'}</div>
          <div class="h-cell small ${item.typeClasses[1]}">${item.types[1]||'Não tens'}</div>
          <div class="h-cell small ${item.habitatClass}">${item.habitat}</div>
          <div class="h-cell small ${item.colorClass}">${item.color}</div>
          <div class="h-cell small ${item.stageClass}">F${item.stage}</div>
          <div class="h-cell small ${item.heightClass}">${formatHeight(item.height)}</div>
          <div class="h-cell small ${item.weightClass}">${formatWeight(item.weight)}</div>
        </div>
      </div>`
    root.appendChild(div)
  })
}

function randInt(min,max){ return Math.floor(Math.random()*(max-min+1))+min }

document.addEventListener('DOMContentLoaded', async ()=>{
  // generation selector: change MAX_ID, reload names and choose new secret
  const genSelect = el('generation')
  if (genSelect){
    genSelect.value = String(CURRENT_GEN)
    genSelect.addEventListener('change', async (e)=>{
      const gen = Number(e.target.value) || 1
      CURRENT_GEN = gen
      const range = getGenRange(CURRENT_GEN)
      MAX_ID = GEN_MAX[gen] || GEN_MAX[1]
      document.title = `Quiz Pokémon — Geração ${gen}`
      const h1 = document.querySelector('h1')
      if (h1) h1.textContent = `Quiz Pokémon — ${gen}ª Geração`
      // clear previous lists/history and reload for the new generation
      namesList = []
      historyList.length = 0
      renderHistory()
      try{ await loadNames() }catch(e){ /* loadNames handles its own fallback */ }
      loadSecret(randInt(range[0], range[1]))
    })
  }

  el('novo').addEventListener('click', ()=>{
    const range = getGenRange(CURRENT_GEN)
    loadSecret(randInt(range[0], range[1]))
  })
  const input = el('guess')
  input.addEventListener('input', e=>{
    input.dataset.apiName = ''
    showSuggestions(e.target.value)
  })
  input.addEventListener('focus', e=>{
    showSuggestions(input.value)
  })
  input.addEventListener('keydown', e=>{
    if (e.key==='ArrowDown'){ e.preventDefault(); updateHighlight(1); return }
    if (e.key==='ArrowUp'){ e.preventDefault(); updateHighlight(-1); return }
    if (e.key==='Enter'){
      e.preventDefault()
      const s = el('suggestions')
      if (!s.hidden){ const chosen = chooseHighlighted(); if (chosen){ doGuess(chosen); return } }
      const v = input.value.trim()
      if (!v) return
      const apiName = input.dataset.apiName || v
      doGuess(apiName)
      clearSuggestions()
    }
    if (e.key==='Escape'){ clearSuggestions(); return }
  })
  document.addEventListener('click', e=>{ if (!e.target.closest('.autocomplete')) clearSuggestions() })
  await loadNames()
  const range = getGenRange(CURRENT_GEN)
  loadSecret(randInt(range[0], range[1]))
})
