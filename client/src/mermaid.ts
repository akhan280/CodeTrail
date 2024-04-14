import mermaid from 'mermaid';

mermaid.initialize({
  theme: 'default',
  logLevel: 3,
  securityLevel: 'strict',
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

// const el = null;

// mermaid.mermaidAPI.render('mermaidDiagram', diagram, el, (svg) => console.log(svg));
