import { deflate, inflate } from 'pako';
import { toUint8Array, fromUint8Array, toBase64, fromBase64 } from 'js-base64';
import axios from 'axios';

const serialize = (state: string): string => {
    const data = new TextEncoder().encode(state);
    const compressed = deflate(data, { level: 9 });
    return fromUint8Array(compressed, true);
};

const mermaidToSVG = async (mermaid: string) => {
    console.log(mermaid);
    const serialized = serialize(mermaid);
    const endpoint = `https://mermaid.ink/svg/pako:${serialized}`;
    console.log(endpoint);
    const response = await axios.get(endpoint, {
        headers: {
          "Accept-Encoding": "gzip, deflate",  // Note the missing Brotli here (br)
        },
        responseType: 'document'
      });
    console.log(response.data);
    return response.data;
};

// mermaid.initialize({
// theme: 'default',
// logLevel: 3,
// securityLevel: 'strict',
// startOnLoad: true,
// arrowMarkerAbsolute: false,
// });

const diagram = 'graph TD\n    A[vm_fault] --> B{Address within arena?}\n    B -- No --> C[Return -1]\n    B -- Yes --> D[Calculate VPN]\n    D --> E{Valid page?}\n    E -- No --> C[Return -1]\n    E -- Yes --> F{Resident page?}\n    F -- No --> G{File-backed?}\n    G -- No --> H[Log non-resident warning]\n    H --> I{Dirty and resident?}\n    F -- Yes --> I{Dirty and resident?}\n    I -- Yes --> J[Update metadata and PTE]\n    J --> K[Return 0]\n    I -- No --> L{Inactive dirty page?}\n    L -- Yes --> M[Update metadata and PTE]\n    M --> K[Return 0]\n    L -- No --> N{Clock queue full?}\n    N -- Yes --> O[Run clock algorithm]\n    O --> P{Victim found?}\n    P -- Yes --> Q{Victim dirty?}\n    Q -- Yes --> R[Write victim to swap]\n    R --> S{Faulting page resident?}\n    S -- Yes --> T[Fill page with zeroes]\n    T --> U[Update PTE and metadata]\n    S -- No --> V[Load faulting page from swap]\n    V --> U[Update PTE and metadata]\n    Q -- No --> W[Update clock queue]\n    P -- No --> X[Assert false]\n    N -- No --> Y[Update PTE and metadata]\n    Y --> K[Return 0]';
const testPayload = {
    "code": diagram,
    "mermaid": "{\n  \"theme\": \"dark\"\n}",
    "autoSync": true,
    "updateDiagram": true,
    "panZoom": true,
    "pan": {
      "x": 249.89502175936389,
      "y": -971.2132253477544
    },
    "zoom": 2.0805455250223024
};

const fetchSVG = async () => {
    try {
        const svg = await mermaidToSVG(JSON.stringify(testPayload));
        console.log(svg.data);
        // previewPanel?.webview.postMessage({ generated: svg.data });
    }
    catch (error) {
        console.log("Error fetching SVG from Mermaid code");
        console.log(error as string);
    }
}

fetchSVG();