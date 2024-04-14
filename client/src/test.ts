import { deflate, inflate } from 'pako';
import { toUint8Array, fromUint8Array, toBase64, fromBase64 } from 'js-base64';

// Your encoded pako string
const encoded = 'eNqNlF1v2jAUhv-K5WuCIJABudhE-WjpKOWrdCygyYsNRCQ2dRwYtfjvMybezDa1y5UTP37fk_ccWcKQYQJ9uOZotwHT9oIC9TSDffJthbJYLIHjfAQ3sokxJ2kKDpHYRBQgTij6dLrQN4oBA6bJVjAmIuMUOOWltTsnqd5uBy0Uh1mMBAGz4SBH2nqvI2cojjDYoTUx0p03pTu2dFeOSRphQsWVQtdSuJXdKCbOdxRuCTbArQXcBX22BpRRhxutA-I0ouvc8U5jPdmOuDgCRDEw4JWfqektsGeD98HTDp9DSYhAaoH0keG0k_vea-qzSaC0tDTy2vuyR1Eooj0BWJvaKfRts4d3zB7-bda3zAayFbNwC14ykhGwyuLYOA1sp8dgnFEQahTFa8bV9CS53KMmhnIWqaITsGIZ_dWToS0yMoj-LYOMbGQcPCtpAvYXUDCQHtAuNxprZCK753lWrdTB_NWOia03DdSgxBfwPPHglXBG0lxwqpknk6IKTgdo0lxagnlcMzVXCIPVVQUrzhK7ztl_yY4s2WfDhr-bsbQSzLEvQTNNCRfKP04NMLCA-Tue8z8HAhZgQniCIqyuDnmGFlBsSEIW0FdLjPh2ARf0pDiUCTY50hD6gmekADPt1I6QunES83GH6FfG7FfoS_gD-m61Uaw3vJJbrnmNyodKvVGAR-g7jVq56JYrrutVqrWaV62eCvBVK7jFUr3kVT3PVafcSsmtnn4CSON1ag';
const graph = 'graph TD\n    A[vm_fault] --> B{Address within arena?}\n    B -- No --> C[Return -1]\n    B -- Yes --> D[Calculate VPN]\n    D --> E{Valid page?}\n    E -- No --> C[Return -1]\n    E -- Yes --> F{Resident page?}\n    F -- No --> G{File-backed?}\n    G -- No --> H[Log non-resident warning]\n    H --> I{Dirty and resident?}\n    F -- Yes --> I{Dirty and resident?}\n    I -- Yes --> J[Update metadata and PTE]\n    J --> K[Return 0]\n    I -- No --> L{Inactive dirty page?}\n    L -- Yes --> M[Update metadata and PTE]\n    M --> K[Return 0]\n    L -- No --> N{Clock queue full?}\n    N -- Yes --> O[Run clock algorithm]\n    O --> P{Victim found?}\n    P -- Yes --> Q{Victim dirty?}\n    Q -- Yes --> R[Write victim to swap]\n    R --> S{Faulting page resident?}\n    S -- Yes --> T[Fill page with zeroes]\n    T --> U[Update PTE and metadata]\n    S -- No --> V[Load faulting page from swap]\n    V --> U[Update PTE and metadata]\n    Q -- No --> W[Update clock queue]\n    P -- No --> X[Assert false]\n    N -- No --> Y[Update PTE and metadata]\n    Y --> K[Return 0]';

const testPayload = {
    "code": graph,
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

const serialize = (state: string): string => {
    const data = new TextEncoder().encode(state);
    const compressed = deflate(data, { level: 9 });
    return fromUint8Array(compressed, true);
};

interface MermaidData {
    code: string,
    mermaid: string,
    autoSync: boolean,
    updateDiagram: boolean,
    panZoom: boolean,
    pan: {
        x: number,
        y: number,
    }
    zoom: number,
};

const deserialize = (state: string): MermaidData => {
    const data = toUint8Array(state);
    return JSON.parse(inflate(data, { to: 'string' }));
};

console.log({ actual: serialize(JSON.stringify(testPayload)), expected: encoded });
console.assert(serialize(JSON.stringify(testPayload)) === encoded);
console.log({ actual: deserialize(encoded).code, expected: graph });
console.assert(deserialize(encoded).code === graph);