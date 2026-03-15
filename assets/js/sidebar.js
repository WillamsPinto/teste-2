
(function () {
  const MENU = [
    { type: 'link', id: 'index', label: 'Página inicial', href: 'index.html' },
    {
      type: 'group', id: 'assistentes', label: 'Assistentes', href: 'pages/assistentes.html', children: [
        { type: 'link', id: 'catalogo', label: 'Catálogo de Ferramentas', href: 'pages/catalogo.html' },
        {
          type: 'group', id: 'planejamento', label: 'Assistentes de IA para Planejamento Pedagógico', href: 'pages/planejamento.html', children: [
            { type: 'link', id: 'chatgpt', label: 'ChatGPT', href: 'pages/chatgpt.html' },
            { type: 'link', id: 'gemini', label: 'Gemini', href: 'pages/gemini.html' },
            { type: 'link', id: 'ideamap-ai', label: 'Ideamap AI', href: 'pages/ideamap-ai.html' },
            { type: 'link', id: 'phind', label: 'Phind', href: 'pages/phind.html' },
            { type: 'link', id: 'magicschool-ai', label: 'MagicSchool AI', href: 'pages/magicschool-ai.html' },
            { type: 'link', id: 'slidesai', label: 'SlidesAI', href: 'pages/slidesai.html' },
            { type: 'link', id: 'gamma-app', label: 'Gamma.app', href: 'pages/gamma-app.html' }
          ]
        },
        {
          type: 'group', id: 'mediacao', label: 'Assistentes de IA para Mediação Pedagógica', href: 'pages/mediacao.html', children: [
            { type: 'link', id: 'canva', label: 'Canva', href: 'pages/canva.html' },
            { type: 'link', id: 'adobe-firefly', label: 'Adobe Firefly', href: 'pages/adobe-firefly.html' },
            { type: 'link', id: 'leonardo-ai', label: 'Leonador AI', href: 'pages/leonardo-ai.html' },
            { type: 'link', id: 'bing-image-creator', label: 'Bing Image Creator', href: 'pages/bing-image-creator.html' },
            { type: 'link', id: 'imagefx', label: 'ImageFX', href: 'pages/imagefx.html' },
            { type: 'link', id: 'autodraw', label: 'AutoDraw', href: 'pages/autodraw.html' },
            { type: 'link', id: 'invideo-ai', label: 'Invideo AI', href: 'pages/invideo-ai.html' },
            { type: 'link', id: 'vidnoz-ai', label: 'Vidnoz AI', href: 'pages/vidnoz-ai.html' },
            { type: 'link', id: 'ai-song-generator', label: 'AI Song Generator', href: 'pages/ai-song-generator.html' },
            { type: 'link', id: 'suno-ai', label: 'Suno AI', href: 'pages/suno-ai.html' },
            { type: 'link', id: 'animated-drawings', label: 'Animated Drawings', href: 'pages/animated-drawings.html' },
            { type: 'link', id: 'murf-ai', label: 'Murf.ai', href: 'pages/murf-ai.html' },
            { type: 'link', id: 'khanmigo-beta', label: 'Khanmigo (beta)', href: 'pages/khanmigo-beta.html' }
          ]
        },
        {
          type: 'group', id: 'avaliacao', label: 'Assistentes de IA para Avaliação e Reflexão da Aprendizagem', href: 'pages/avaliacao.html', children: [
            { type: 'link', id: 'quillbot', label: 'QuillBot', href: 'pages/quillbot.html' },
            { type: 'link', id: 'max-ai', label: 'Max AI', href: 'pages/max-ai.html' },
            { type: 'link', id: 'liner-ai', label: 'Liner AI', href: 'pages/liner-ai.html' },
            { type: 'link', id: 'chatpdf', label: 'ChatPDF', href: 'pages/chatpdf.html' },
            { type: 'link', id: 'languagetool', label: 'LanguageTool', href: 'pages/languagetool.html' }
          ]
        }
      ]
    },
    {
      type: 'group', id: 'orientacao', label: 'Orientação para o uso da IA', href: 'pages/orientacao-para-o-uso-da-ia.html', children: [
        { type: 'link', id: 'ia-como-aliada-da-educacao-4-0', label: 'IA como Aliada da Educação 4.0', href: 'pages/ia-como-aliada-da-educacao-4-0.html' },
        { type: 'link', id: 'etica-no-uso-da-inteligencia-artificial', label: 'Ética no Uso da Inteligência Artificial', href: 'pages/etica-no-uso-da-inteligencia-artificial.html' },
        { type: 'link', id: 'engenharia-de-prompt', label: 'Engenharia de Prompt', href: 'pages/engenharia-de-prompt.html' },
        { type: 'link', id: 'exemplos-praticos', label: 'Exemplos Práticos', href: 'pages/exemplos-praticos.html' }
      ]
    },
    { type: 'link', id: 'sobre', label: 'Sobre', href: 'pages/sobre.html' }
  ];

  const LOGO = 'https://lh3.googleusercontent.com/sitesv/APaQ0ST6aLFeeJcdef0jPVVjqgtVv_Qvd1xODidUpoayRt0F2LXE0bHwBCndETIV_5PGBvcekTbLDpBqwdGV_LvS5c-AAmRiUmO1s2ePTsOD3k5cXtjbVmVr19_prIxhkRGVIfGIFfjNTQMpCPslSl5qFNAcxCkc5oJEpJ0iEOtHTba4rpQ6BC6Lbw=w512';

  function normalizeBasePath(value) {
    if (!value || value === '.') return '';
    return value.replace(/\/$/, '');
  }

  function resolveHref(basePath, href) {
    const normalized = normalizeBasePath(basePath);
    return normalized ? normalized + '/' + href : href;
  }

  function containsId(node, currentId) {
    if (node.id === currentId) return true;
    if (!node.children) return false;
    return node.children.some(child => containsId(child, currentId));
  }

  function renderNodes(nodes, currentId, basePath, level) {
    return nodes.map(node => {
      const isActive = node.id === currentId;
      const isOpen = !!node.children && node.children.some(child => containsId(child, currentId));
      const href = resolveHref(basePath, node.href);

      if (node.type === 'link') {
        const cls = ['nav-item'];
        if (level > 0) cls[0] = 'leaf-link';
        if (isActive) cls.push('active');
        return `<a class="${cls.join(' ')}" href="${href}" data-nav-id="${node.id}">${node.label}</a>`;
      }

      const wrapperClass = level === 0 ? 'group' : 'subgroup';
      return `
        <details${isOpen ? ' open' : ''} data-nav-id="${node.id}">
          <summary class="${isActive ? 'active' : ''}">
            <a href="${href}" class="summary-link" data-nav-id="${node.id}">${node.label}</a>
          </summary>
          <div class="${wrapperClass}">
            ${renderNodes(node.children, currentId, basePath, level + 1)}
          </div>
        </details>`;
    }).join('');
  }

  function renderSidebar(sidebar) {
    const basePath = sidebar.dataset.basePath || '.';
    const currentId = sidebar.dataset.currentPage || '';
    const homeHref = resolveHref(basePath, 'index.html');

    sidebar.innerHTML = `
      <div class="search-icon" aria-hidden="true">⌕</div>
      <a href="${homeHref}" class="brand">
        <img src="${LOGO}" alt="Logo PotencIA" />
        <span>PotencIA</span>
      </a>
      <nav aria-label="Navegação do site">
        ${renderNodes(MENU, currentId, basePath, 0)}
      </nav>`;
  }

  document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.querySelector('.sidebar[data-sidebar-source="shared"]');
    if (sidebar) {
      renderSidebar(sidebar);
    }
  });
})();
