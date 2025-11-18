// engine/asx.js
export class ASXRuntime {
  constructor(osData) {
    this.os = osData;
  }

  getBootScene() {
    const bootId = this.os?.boot?.scene;
    return this.os.scenes[bootId];
  }

  mountHUD(hudRoot) {
    const hudId = this.os?.boot?.hud;
    if (!hudId) return;
    const hudDef = this.os.hud[hudId];
    if (!hudDef || hudDef.type !== 'dom') return;

    hudRoot.innerHTML = '';
    hudDef.panels.forEach(p => {
      const el = document.createElement('div');
      el.className = 'hud-pill';
      el.dataset.id = p.id;
      el.textContent = `${p.label}: ${p.value}${p.max ? '/' + p.max : ''}`;
      hudRoot.appendChild(el);
    });
  }

  updateHUD(id, value, max = null) {
    const el = document.querySelector(`.hud-pill[data-id="${id}"]`);
    if (!el) return;

    const label = el.textContent.split(':')[0];
    
    if (max !== null) {
      el.textContent = `${label}: ${value}/${max}`;
      
      // Color coding for health
      if (id === 'hp') {
        const percent = (value / max) * 100;
        if (percent < 25) {
          el.style.background = 'rgba(139, 0, 0, 0.9)';
          el.style.animation = 'pulse 0.5s infinite';
        } else if (percent < 50) {
          el.style.background = 'rgba(200, 100, 0, 0.8)';
        } else {
          el.style.background = 'rgba(139, 0, 0, 0.8)';
        }
      }
    } else {
      el.textContent = `${label}: ${value}`;
    }
  }
}
