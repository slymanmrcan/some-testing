export function createHUD(root) {
  const title = document.createElement('div');
  title.className = 'hud-title';
  root.appendChild(title);

  const hint = document.createElement('div');
  hint.className = 'hud-hint';
  root.appendChild(hint);

  const panel = document.createElement('div');
  panel.className = 'hud-panel';
  panel.innerHTML = `
    <h2>Project</h2>
    <p class="desc"></p>
    <div class="tags"></div>
    <p class="links"></p>
  `;
  root.appendChild(panel);

  const portalHint = document.createElement('div');
  portalHint.className = 'portal-hint';
  root.appendChild(portalHint);

  const minimap = document.createElement('div');
  minimap.className = 'mini-map';
  minimap.innerHTML = `
    <div class="label">fake map</div>
    <div class="map-box">
      <div class="you-are-here"></div>
    </div>
    <div class="label">you are here</div>
  `;
  root.appendChild(minimap);

  function setTitle(text) { title.textContent = text; }
  function setHint(text) { hint.textContent = text; }

  function showProject(data) {
    panel.classList.add('show');
    panel.querySelector('h2').textContent = data.name || 'Unknown';
    panel.querySelector('.desc').textContent = data.desc || '';
    const tags = panel.querySelector('.tags');
    tags.innerHTML = '';
    (data.tags || []).forEach((t) => {
      const span = document.createElement('span');
      span.className = 'tag';
      span.textContent = t;
      tags.appendChild(span);
    });
    const links = panel.querySelector('.links');
    links.innerHTML = '';
    if (data.repoUrl) {
      const a = document.createElement('a');
      a.href = data.repoUrl;
      a.target = '_blank';
      a.rel = 'noreferrer';
      a.textContent = 'Repo';
      links.appendChild(a);
    }
    if (data.liveUrl) {
      const a = document.createElement('a');
      a.href = data.liveUrl;
      a.target = '_blank';
      a.rel = 'noreferrer';
      a.textContent = ' • Live';
      links.appendChild(a);
    }
  }

  function clearPanel() {
    panel.classList.remove('show');
  }

  function showPortalHint(text) {
    portalHint.textContent = text;
    portalHint.classList.add('show');
  }

  function hidePortalHint() {
    portalHint.classList.remove('show');
  }

  return { setTitle, setHint, showProject, clearPanel, showPortalHint, hidePortalHint };
}
