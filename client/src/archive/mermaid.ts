import mermaid from 'mermaid';

mermaid.initialize({
  theme: 'default',
  logLevel: 3,
  securityLevel: 'loose',
  startOnLoad: true,
  arrowMarkerAbsolute: false,
  });
  
  const diagram = `
  graph TD;
  A-->B;
  A-->C;
  B-->D;
  C-->D;
  `;

mermaid.render('graph-container', diagram).then(x => console.log(x));

// const el = null;

// mermaid.mermaidAPI.render('mermaidDiagram', diagram, el, (svg) => console.log(svg));
