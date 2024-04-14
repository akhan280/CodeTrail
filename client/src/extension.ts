import * as vscode from 'vscode';
import { create } from 'zustand';

// Define the Zustand store
interface SVGState {
    svgData: string;
    updateSVGData: (data: string) => void;
}

const useSVGStore = create<SVGState>((set) => ({
    svgData: '<svg aria-roledescription="flowchart-v2" role="graphics-document document" style="overflow: hidden; max-width: 100%;" xmlns="http://www.w3.org/2000/svg" width="100%" id="graph-div" height="100%" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:ev="http://www.w3.org/2001/xml-events"><g id="viewport-20240413231751154" class="svg-pan-zoom_viewport" transform="matrix(0.7074776269429749,0,0,0.7074776269429749,191.26620941965797,-747.5682625095818)" style="transform: matrix(0.707478, 0, 0, 0.707478, 191.266, -747.568);"><style>#graph-div{font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:16px;fill:#ccc;}#graph-div .error-icon{fill:#a44141;}#graph-div .error-text{fill:#ddd;stroke:#ddd;}#graph-div .edge-thickness-normal{stroke-width:2px;}#graph-div .edge-thickness-thick{stroke-width:3.5px;}#graph-div .edge-pattern-solid{stroke-dasharray:0;}#graph-div .edge-pattern-dashed{stroke-dasharray:3;}#graph-div .edge-pattern-dotted{stroke-dasharray:2;}#graph-div .marker{fill:lightgrey;stroke:lightgrey;}#graph-div .marker.cross{stroke:lightgrey;}#graph-div svg{font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:16px;}#graph-div .label{font-family:"trebuchet ms",verdana,arial,sans-serif;color:#ccc;}#graph-div .cluster-label text{fill:#F9FFFE;}#graph-div .cluster-label span,#graph-div p{color:#F9FFFE;}#graph-div .label text,#graph-div span,#graph-div p{fill:#ccc;color:#ccc;}#graph-div .node rect,#graph-div .node circle,#graph-div .node ellipse,#graph-div .node polygon,#graph-div .node path{fill:#1f2020;stroke:#81B1DB;stroke-width:1px;}#graph-div .flowchart-label text{text-anchor:middle;}#graph-div .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#graph-div .node .label{text-align:center;}#graph-div .node.clickable{cursor:pointer;}#graph-div .arrowheadPath{fill:lightgrey;}#graph-div .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#graph-div .flowchart-link{stroke:lightgrey;fill:none;}#graph-div .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#graph-div .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#graph-div .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#graph-div .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#graph-div .cluster text{fill:#F9FFFE;}#graph-div .cluster span,#graph-div p{color:#F9FFFE;}#graph-div div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#graph-div .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#graph-div :root{--mermaid-font-family:"trebuchet ms",verdana,arial,sans-serif;}</style><g><marker orient="auto" markerHeight="12" markerWidth="12" markerUnits="userSpaceOnUse" refY="5" refX="6" viewBox="0 0 10 10" class="marker flowchart" id="graph-div_flowchart-pointEnd"><path style="stroke-width: 1; stroke-dasharray: 1, 0;" class="arrowMarkerPath" d="M 0 0 L 10 5 L 0 10 z"></path></marker><marker orient="auto" markerHeight="12" markerWidth="12" markerUnits="userSpaceOnUse" refY="5" refX="4.5" viewBox="0 0 10 10" class="marker flowchart" id="graph-div_flowchart-pointStart"><path style="stroke-width: 1; stroke-dasharray: 1, 0;" class="arrowMarkerPath" d="M 0 5 L 10 10 L 10 0 z"></path></marker><marker orient="auto" markerHeight="11" markerWidth="11" markerUnits="userSpaceOnUse" refY="5" refX="11" viewBox="0 0 10 10" class="marker flowchart" id="graph-div_flowchart-circleEnd"><circle style="stroke-width: 1; stroke-dasharray: 1, 0;" class="arrowMarkerPath" r="5" cy="5" cx="5"></circle></marker><marker orient="auto" markerHeight="11" markerWidth="11" markerUnits="userSpaceOnUse" refY="5" refX="-1" viewBox="0 0 10 10" class="marker flowchart" id="graph-div_flowchart-circleStart"><circle style="stroke-width: 1; stroke-dasharray: 1, 0;" class="arrowMarkerPath" r="5" cy="5" cx="5"></circle></marker><marker orient="auto" markerHeight="11" markerWidth="11" markerUnits="userSpaceOnUse" refY="5.2" refX="12" viewBox="0 0 11 11" class="marker cross flowchart" id="graph-div_flowchart-crossEnd"><path style="stroke-width: 2; stroke-dasharray: 1, 0;" class="arrowMarkerPath" d="M 1,1 l 9,9 M 10,1 l -9,9"></path></marker><marker orient="auto" markerHeight="11" markerWidth="11" markerUnits="userSpaceOnUse" refY="5.2" refX="-1" viewBox="0 0 11 11" class="marker cross flowchart" id="graph-div_flowchart-crossStart"><path style="stroke-width: 2; stroke-dasharray: 1, 0;" class="arrowMarkerPath" d="M 1,1 l 9,9 M 10,1 l -9,9"></path></marker><g class="root"><g class="clusters"></g><g class="edgePaths"><path marker-end="url(#graph-div_flowchart-pointEnd)" style="fill:none;" class="edge-thickness-normal edge-pattern-solid flowchart-link LS-A LE-B" id="L-A-B-0" d="M383.83,39L383.83,43.167C383.83,47.333,383.83,55.667,383.896,63.2C383.962,70.734,384.094,77.467,384.16,80.834L384.226,84.201"></path><path marker-end="url(#graph-div_flowchart-pointEnd)" style="fill:none;" class="edge-thickness-normal edge-pattern-solid flowchart-link LS-B LE-C" id="L-B-C-0" d="M340.921,256.13L331.396,269.448C321.87,282.766,302.819,309.403,293.293,332.138C283.768,354.872,283.768,373.706,283.768,392.539C283.768,411.372,283.768,430.206,283.768,456.915C283.768,483.625,283.768,518.211,283.768,552.797C283.768,587.383,283.768,621.969,285.699,654.629C287.63,687.29,291.493,718.025,293.424,733.393L295.355,748.761"></path><path marker-end="url(#graph-div_flowchart-pointEnd)" style="fill:none;" class="edge-thickness-normal edge-pattern-solid flowchart-link LS-B LE-D" id="L-B-D-0" d="M417.305,266.564L422.559,278.143C427.814,289.723,438.323,312.881,443.577,329.743C448.832,346.606,448.832,357.172,448.832,362.456L448.832,367.739"></path><path marker-end="url(#graph-div_flowchart-pointEnd)" style="fill:none;" class="edge-thickness-normal edge-pattern-solid flowchart-link LS-D LE-E" id="L-D-E-0" d="M448.832,412.039L448.832,418.206C448.832,424.372,448.832,436.706,448.904,448.239C448.975,459.773,449.118,470.506,449.19,475.873L449.261,481.24"></path><path marker-end="url(#graph-div_flowchart-pointEnd)" style="fill:none;" class="edge-thickness-normal edge-pattern-solid flowchart-link LS-E LE-C" id="L-E-C-0" d="M419.2,589.922L409.911,601.028C400.623,612.133,382.046,634.344,364.159,660.921C346.272,687.499,329.075,718.443,320.477,733.915L311.878,749.387"></path><path marker-end="url(#graph-div_flowchart-pointEnd)" style="fill:none;" class="edge-thickness-normal edge-pattern-solid flowchart-link LS-E LE-F" id="L-E-F-0" d="M460.283,609.103L461.768,617.012C463.253,624.92,466.223,640.738,467.78,654.013C469.336,667.288,469.48,678.022,469.551,683.388L469.623,688.755"></path><path marker-end="url(#graph-div_flowchart-pointEnd)" style="fill:none;" class="edge-thickness-normal edge-pattern-solid flowchart-link LS-F LE-G" id="L-F-G-0" d="M440.665,824.956L434.311,835.878C427.956,846.799,415.247,868.642,408.963,884.93C402.68,901.218,402.823,911.951,402.895,917.318L402.966,922.685"></path><path marker-end="url(#graph-div_flowchart-pointEnd)" style="fill:none;" class="edge-thickness-normal edge-pattern-solid flowchart-link LS-G LE-H" id="L-G-H-0" d="M403.037,1071.094L402.954,1077.177C402.87,1083.26,402.704,1095.427,402.62,1106.794C402.537,1118.16,402.537,1128.727,402.537,1134.01L402.537,1139.294"></path><path marker-end="url(#graph-div_flowchart-pointEnd)" style="fill:none;" class="edge-thickness-normal edge-pattern-solid flowchart-link LS-H LE-I" id="L-H-I-0" d="M402.537,1183.594L402.537,1187.76C402.537,1191.927,402.537,1200.26,407.656,1213.548C412.775,1226.836,423.014,1245.078,428.133,1254.199L433.252,1263.32"></path><path marker-end="url(#graph-div_flowchart-pointEnd)" style="fill:none;" class="edge-thickness-normal edge-pattern-solid flowchart-link LS-F LE-I" id="L-F-I-0" d="M498.721,824.956L504.909,835.878C511.097,846.799,523.474,868.642,529.662,897.655C535.85,926.669,535.85,962.854,535.85,999.039C535.85,1035.224,535.85,1071.409,535.85,1098.918C535.85,1126.427,535.85,1145.26,535.85,1162.094C535.85,1178.927,535.85,1193.76,530.887,1210.293C525.925,1226.825,516,1245.056,511.037,1254.171L506.075,1263.286"></path><path marker-end="url(#graph-div_flowchart-pointEnd)" style="fill:none;" class="edge-thickness-normal edge-pattern-solid flowchart-link LS-I LE-J" id="L-I-J-0" d="M400.047,1353.565L350.274,1371.256C300.5,1388.947,200.953,1424.329,151.18,1464.396C101.406,1504.464,101.406,1549.216,101.406,1593.969C101.406,1638.721,101.406,1683.474,101.406,1726.711C101.406,1769.948,101.406,1811.669,101.406,1853.391C101.406,1895.112,101.406,1936.833,101.406,1962.977C101.406,1989.121,101.406,1999.688,101.406,2004.971L101.406,2010.255"></path><path marker-end="url(#graph-div_flowchart-pointEnd)" style="fill:none;" class="edge-thickness-normal edge-pattern-solid flowchart-link LS-J LE-K" id="L-J-K-0" d="M101.406,2054.555L101.406,2058.721C101.406,2062.888,101.406,2071.221,136.417,2089.332C171.428,2107.442,241.449,2135.33,276.46,2149.273L311.471,2163.217"></path><path marker-end="url(#graph-div_flowchart-pointEnd)" style="fill:none;" class="edge-thickness-normal edge-pattern-solid flowchart-link LS-I LE-L" id="L-I-L-0" d="M516.028,1376.876L529.29,1390.682C542.552,1404.488,569.076,1432.099,582.409,1451.272C595.743,1470.444,595.886,1481.178,595.957,1486.545L596.029,1491.911"></path><path marker-end="url(#graph-div_flowchart-pointEnd)" style="fill:none;" class="edge-thickness-normal edge-pattern-solid flowchart-link LS-L LE-M" id="L-L-M-0" d="M533.603,1629.23L503.706,1645.729C473.808,1662.229,414.013,1695.228,384.116,1732.588C354.219,1769.948,354.219,1811.669,354.219,1853.391C354.219,1895.112,354.219,1936.833,354.219,1962.977C354.219,1989.121,354.219,1999.688,354.219,2004.971L354.219,2010.255"></path><path marker-end="url(#graph-div_flowchart-pointEnd)" style="fill:none;" class="edge-thickness-normal edge-pattern-solid flowchart-link LS-M LE-K" id="L-M-K-0" d="M354.219,2054.555L354.219,2058.721C354.219,2062.888,354.219,2071.221,354.219,2088.036C354.219,2104.851,354.219,2130.146,354.219,2142.794L354.219,2155.442"></path><path marker-end="url(#graph-div_flowchart-pointEnd)" style="fill:none;" class="edge-thickness-normal edge-pattern-solid flowchart-link LS-L LE-N" id="L-L-N-0" d="M643.264,1644.562L656.387,1658.506C669.511,1672.45,695.758,1700.339,708.954,1719.649C722.149,1738.96,722.292,1749.694,722.364,1755.06L722.435,1760.427"></path><path marker-end="url(#graph-div_flowchart-pointEnd)" style="fill:none;" class="edge-thickness-normal edge-pattern-solid flowchart-link LS-N LE-O" id="L-N-O-0" d="M764.717,1899.843L776.761,1912.962C788.805,1926.08,812.893,1952.317,824.937,1970.719C836.98,1989.121,836.98,1999.688,836.98,2004.971L836.98,2010.255"></path><path marker-end="url(#graph-div_flowchart-pointEnd)" style="fill:none;" class="edge-thickness-normal edge-pattern-solid flowchart-link LS-O LE-P" id="L-O-P-0" d="M836.98,2054.555L836.98,2058.721C836.98,2062.888,836.98,2071.221,837.046,2078.755C837.113,2086.288,837.245,2093.022,837.311,2096.389L837.377,2099.756"></path><path marker-end="url(#graph-div_flowchart-pointEnd)" style="fill:none;" class="edge-thickness-normal edge-pattern-solid flowchart-link LS-P LE-Q" id="L-P-Q-0" d="M804.82,2223.769L795.924,2235.296C787.028,2246.823,769.236,2269.876,760.411,2286.77C751.586,2303.663,751.73,2314.397,751.801,2319.763L751.873,2325.13"></path><path marker-end="url(#graph-div_flowchart-pointEnd)" style="fill:none;" class="edge-thickness-normal edge-pattern-solid flowchart-link LS-Q LE-R" id="L-Q-R-0" d="M716.521,2439.414L704.814,2451.401C693.106,2463.388,669.691,2487.362,657.983,2504.632C646.275,2521.903,646.275,2532.469,646.275,2537.753L646.275,2543.036"></path><path marker-end="url(#graph-div_flowchart-pointEnd)" style="fill:none;" class="edge-thickness-normal edge-pattern-solid flowchart-link LS-R LE-S" id="L-R-S-0" d="M646.275,2587.336L646.275,2591.503C646.275,2595.669,646.275,2604.003,646.341,2611.536C646.407,2619.07,646.539,2625.803,646.605,2629.17L646.671,2632.537"></path><path marker-end="url(#graph-div_flowchart-pointEnd)" style="fill:none;" class="edge-thickness-normal edge-pattern-solid flowchart-link LS-S LE-T" id="L-S-T-0" d="M596.667,2807.977L584.462,2822.412C572.257,2836.847,547.847,2865.716,535.642,2885.434C523.438,2905.153,523.438,2915.719,523.438,2921.003L523.438,2926.286"></path><path marker-end="url(#graph-div_flowchart-pointEnd)" style="fill:none;" class="edge-thickness-normal edge-pattern-solid flowchart-link LS-T LE-U" id="L-T-U-0" d="M523.438,2970.586L523.438,2974.753C523.438,2978.919,523.438,2987.253,534.109,2995.285C544.78,3003.318,566.122,3011.049,576.793,3014.915L587.464,3018.781"></path><path marker-end="url(#graph-div_flowchart-pointEnd)" style="fill:none;" class="edge-thickness-normal edge-pattern-solid flowchart-link LS-S LE-V" id="L-S-V-0" d="M696.884,2807.977L708.922,2822.412C720.961,2836.847,745.037,2865.716,757.075,2885.434C769.113,2905.153,769.113,2915.719,769.113,2921.003L769.113,2926.286"></path><path marker-end="url(#graph-div_flowchart-pointEnd)" style="fill:none;" class="edge-thickness-normal edge-pattern-solid flowchart-link LS-V LE-U" id="L-V-U-0" d="M769.113,2970.586L769.113,2974.753C769.113,2978.919,769.113,2987.253,758.442,2995.285C747.771,3003.318,726.429,3011.049,715.757,3014.915L705.086,3018.781"></path><path marker-end="url(#graph-div_flowchart-pointEnd)" style="fill:none;" class="edge-thickness-normal edge-pattern-solid flowchart-link LS-Q LE-W" id="L-Q-W-0" d="M787.365,2439.414L798.906,2451.401C810.447,2463.388,833.529,2487.362,845.07,2504.632C856.611,2521.903,856.611,2532.469,856.611,2537.753L856.611,2543.036"></path><path marker-end="url(#graph-div_flowchart-pointEnd)" style="fill:none;" class="edge-thickness-normal edge-pattern-solid flowchart-link LS-P LE-X" id="L-P-X-0" d="M870.141,2223.769L878.87,2235.296C887.6,2246.823,905.059,2269.876,913.788,2295.47C922.518,2321.064,922.518,2349.198,922.518,2363.266L922.518,2377.333"></path><path marker-end="url(#graph-div_flowchart-pointEnd)" style="fill:none;" class="edge-thickness-normal edge-pattern-solid flowchart-link LS-N LE-Y" id="L-N-Y-0" d="M680.294,1899.843L668.084,1912.962C655.873,1926.08,631.452,1952.317,619.242,1970.719C607.031,1989.121,607.031,1999.688,607.031,2004.971L607.031,2010.255"></path><path marker-end="url(#graph-div_flowchart-pointEnd)" style="fill:none;" class="edge-thickness-normal edge-pattern-solid flowchart-link LS-Y LE-K" id="L-Y-K-0" d="M607.031,2054.555L607.031,2058.721C607.031,2062.888,607.031,2071.221,572.021,2089.332C537.01,2107.442,466.988,2135.33,431.978,2149.273L396.967,2163.217"></path></g><g class="edgeLabels"><g class="edgeLabel"><g transform="translate(0, 0)" class="label"><foreignObject height="0" width="0"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel"></span></div></foreignObject></g></g><g transform="translate(283.767578125, 449.0390625)" class="edgeLabel"><g transform="translate(-9.3984375, -12)" class="label"><foreignObject height="24" width="18.796875"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel">No</span></div></foreignObject></g></g><g transform="translate(448.83203125, 336.0390625)" class="edgeLabel"><g transform="translate(-11.32421875, -12)" class="label"><foreignObject height="24" width="22.6484375"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel">Yes</span></div></foreignObject></g></g><g class="edgeLabel"><g transform="translate(0, 0)" class="label"><foreignObject height="0" width="0"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel"></span></div></foreignObject></g></g><g transform="translate(363.46875, 656.5546875)" class="edgeLabel"><g transform="translate(-9.3984375, -12)" class="label"><foreignObject height="24" width="18.796875"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel">No</span></div></foreignObject></g></g><g transform="translate(469.193359375, 656.5546875)" class="edgeLabel"><g transform="translate(-11.32421875, -12)" class="label"><foreignObject height="24" width="22.6484375"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel">Yes</span></div></foreignObject></g></g><g transform="translate(402.537109375, 890.484375)" class="edgeLabel"><g transform="translate(-9.3984375, -12)" class="label"><foreignObject height="24" width="18.796875"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel">No</span></div></foreignObject></g></g><g transform="translate(402.537109375, 1107.59375)" class="edgeLabel"><g transform="translate(-9.3984375, -12)" class="label"><foreignObject height="24" width="18.796875"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel">No</span></div></foreignObject></g></g><g class="edgeLabel"><g transform="translate(0, 0)" class="label"><foreignObject height="0" width="0"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel"></span></div></foreignObject></g></g><g transform="translate(535.849609375, 1107.59375)" class="edgeLabel"><g transform="translate(-11.32421875, -12)" class="label"><foreignObject height="24" width="22.6484375"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel">Yes</span></div></foreignObject></g></g><g transform="translate(101.40625, 1728.2265625)" class="edgeLabel"><g transform="translate(-11.32421875, -12)" class="label"><foreignObject height="24" width="22.6484375"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel">Yes</span></div></foreignObject></g></g><g class="edgeLabel"><g transform="translate(0, 0)" class="label"><foreignObject height="0" width="0"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel"></span></div></foreignObject></g></g><g transform="translate(595.599609375, 1459.7109375)" class="edgeLabel"><g transform="translate(-9.3984375, -12)" class="label"><foreignObject height="24" width="18.796875"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel">No</span></div></foreignObject></g></g><g transform="translate(354.21875, 1853.390625)" class="edgeLabel"><g transform="translate(-11.32421875, -12)" class="label"><foreignObject height="24" width="22.6484375"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel">Yes</span></div></foreignObject></g></g><g class="edgeLabel"><g transform="translate(0, 0)" class="label"><foreignObject height="0" width="0"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel"></span></div></foreignObject></g></g><g transform="translate(722.005859375, 1728.2265625)" class="edgeLabel"><g transform="translate(-9.3984375, -12)" class="label"><foreignObject height="24" width="18.796875"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel">No</span></div></foreignObject></g></g><g transform="translate(836.98046875, 1978.5546875)" class="edgeLabel"><g transform="translate(-11.32421875, -12)" class="label"><foreignObject height="24" width="22.6484375"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel">Yes</span></div></foreignObject></g></g><g class="edgeLabel"><g transform="translate(0, 0)" class="label"><foreignObject height="0" width="0"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel"></span></div></foreignObject></g></g><g transform="translate(751.443359375, 2292.9296875)" class="edgeLabel"><g transform="translate(-11.32421875, -12)" class="label"><foreignObject height="24" width="22.6484375"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel">Yes</span></div></foreignObject></g></g><g transform="translate(646.275390625, 2511.3359375)" class="edgeLabel"><g transform="translate(-11.32421875, -12)" class="label"><foreignObject height="24" width="22.6484375"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel">Yes</span></div></foreignObject></g></g><g class="edgeLabel"><g transform="translate(0, 0)" class="label"><foreignObject height="0" width="0"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel"></span></div></foreignObject></g></g><g transform="translate(523.4375, 2894.5859375)" class="edgeLabel"><g transform="translate(-11.32421875, -12)" class="label"><foreignObject height="24" width="22.6484375"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel">Yes</span></div></foreignObject></g></g><g class="edgeLabel"><g transform="translate(0, 0)" class="label"><foreignObject height="0" width="0"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel"></span></div></foreignObject></g></g><g transform="translate(769.11328125, 2894.5859375)" class="edgeLabel"><g transform="translate(-9.3984375, -12)" class="label"><foreignObject height="24" width="18.796875"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel">No</span></div></foreignObject></g></g><g class="edgeLabel"><g transform="translate(0, 0)" class="label"><foreignObject height="0" width="0"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel"></span></div></foreignObject></g></g><g transform="translate(856.611328125, 2511.3359375)" class="edgeLabel"><g transform="translate(-9.3984375, -12)" class="label"><foreignObject height="24" width="18.796875"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel">No</span></div></foreignObject></g></g><g transform="translate(922.517578125, 2292.9296875)" class="edgeLabel"><g transform="translate(-9.3984375, -12)" class="label"><foreignObject height="24" width="18.796875"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel">No</span></div></foreignObject></g></g><g transform="translate(607.03125, 1978.5546875)" class="edgeLabel"><g transform="translate(-9.3984375, -12)" class="label"><foreignObject height="24" width="18.796875"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel">No</span></div></foreignObject></g></g><g class="edgeLabel"><g transform="translate(0, 0)" class="label"><foreignObject height="0" width="0"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel"></span></div></foreignObject></g></g></g><g class="nodes"><g transform="translate(383.830078125, 19.5)" data-id="A" data-node="true" id="flowchart-A-174" class="node default default flowchart-label"><rect height="39" width="78.6328125" y="-19.5" x="-39.31640625" ry="0" rx="0" style="" class="basic label-container"></rect><g transform="translate(-31.81640625, -12)" style="" class="label"><rect></rect><foreignObject height="24" width="63.6328125"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel">vm_fault</span></div></foreignObject></g></g><g transform="translate(383.830078125, 194.01953125)" data-id="B" data-node="true" id="flowchart-B-175" class="node default default flowchart-label"><polygon style="" transform="translate(-105.01953125,105.01953125)" class="label-container" points="105.01953125,0 210.0390625,-105.01953125 105.01953125,-210.0390625 0,-105.01953125"></polygon><g transform="translate(-78.01953125, -12)" style="" class="label"><rect></rect><foreignObject height="24" width="156.0390625"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel">Address within arena?</span></div></foreignObject></g></g><g transform="translate(298.466796875, 773.51953125)" data-id="C" data-node="true" id="flowchart-C-177" class="node default default flowchart-label"><rect height="39" width="81.5234375" y="-19.5" x="-40.76171875" ry="0" rx="0" style="" class="basic label-container"></rect><g transform="translate(-33.26171875, -12)" style="" class="label"><rect></rect><foreignObject height="24" width="66.5234375"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel">Return -1</span></div></foreignObject></g></g><g transform="translate(448.83203125, 392.5390625)" data-id="D" data-node="true" id="flowchart-D-179" class="node default default flowchart-label"><rect height="39" width="115.90625" y="-19.5" x="-57.953125" ry="0" rx="0" style="" class="basic label-container"></rect><g transform="translate(-50.453125, -12)" style="" class="label"><rect></rect><foreignObject height="24" width="100.90625"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel">Calculate VPN</span></div></foreignObject></g></g><g transform="translate(448.83203125, 552.796875)" data-id="E" data-node="true" id="flowchart-E-181" class="node default default flowchart-label"><polygon style="" transform="translate(-66.7578125,66.7578125)" class="label-container" points="66.7578125,0 133.515625,-66.7578125 66.7578125,-133.515625 0,-66.7578125"></polygon><g transform="translate(-39.7578125, -12)" style="" class="label"><rect></rect><foreignObject height="24" width="79.515625"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel">Valid page?</span></div></foreignObject></g></g><g transform="translate(469.193359375, 773.51953125)" data-id="F" data-node="true" id="flowchart-F-185" class="node default default flowchart-label"><polygon style="" transform="translate(-79.96484375,79.96484375)" class="label-container" points="79.96484375,0 159.9296875,-79.96484375 79.96484375,-159.9296875 0,-79.96484375"></polygon><g transform="translate(-52.96484375, -12)" style="" class="label"><rect></rect><foreignObject height="24" width="105.9296875"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel">Resident page?</span></div></foreignObject></g></g><g transform="translate(402.537109375, 999.0390625)" data-id="G" data-node="true" id="flowchart-G-187" class="node default default flowchart-label"><polygon style="" transform="translate(-71.5546875,71.5546875)" class="label-container" points="71.5546875,0 143.109375,-71.5546875 71.5546875,-143.109375 0,-71.5546875"></polygon><g transform="translate(-44.5546875, -12)" style="" class="label"><rect></rect><foreignObject height="24" width="89.109375"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel">File-backed?</span></div></foreignObject></g></g><g transform="translate(402.537109375, 1164.09375)" data-id="H" data-node="true" id="flowchart-H-189" class="node default default flowchart-label"><rect height="39" width="196.625" y="-19.5" x="-98.3125" ry="0" rx="0" style="" class="basic label-container"></rect><g transform="translate(-90.8125, -12)" style="" class="label"><rect></rect><foreignObject height="24" width="181.625"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel">Log non-resident warning</span></div></foreignObject></g></g><g transform="translate(469.193359375, 1328.15234375)" data-id="I" data-node="true" id="flowchart-I-191" class="node default default flowchart-label"><polygon style="" transform="translate(-94.55859375,94.55859375)" class="label-container" points="94.55859375,0 189.1171875,-94.55859375 94.55859375,-189.1171875 0,-94.55859375"></polygon><g transform="translate(-67.55859375, -12)" style="" class="label"><rect></rect><foreignObject height="24" width="135.1171875"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel">Dirty and resident?</span></div></foreignObject></g></g><g transform="translate(101.40625, 2035.0546875)" data-id="J" data-node="true" id="flowchart-J-195" class="node default default flowchart-label"><rect height="39" width="202.8125" y="-19.5" x="-101.40625" ry="0" rx="0" style="" class="basic label-container"></rect><g transform="translate(-93.90625, -12)" style="" class="label"><rect></rect><foreignObject height="24" width="187.8125"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel">Update metadata and PTE</span></div></foreignObject></g></g><g transform="translate(354.21875, 2180.2421875)" data-id="K" data-node="true" id="flowchart-K-197" class="node default default flowchart-label"><rect height="39" width="75.6484375" y="-19.5" x="-37.82421875" ry="0" rx="0" style="" class="basic label-container"></rect><g transform="translate(-30.32421875, -12)" style="" class="label"><rect></rect><foreignObject height="24" width="60.6484375"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel">Return 0</span></div></foreignObject></g></g><g transform="translate(595.599609375, 1593.96875)" data-id="L" data-node="true" id="flowchart-L-199" class="node default default flowchart-label"><polygon style="" transform="translate(-97.2578125,97.2578125)" class="label-container" points="97.2578125,0 194.515625,-97.2578125 97.2578125,-194.515625 0,-97.2578125"></polygon><g transform="translate(-70.2578125, -12)" style="" class="label"><rect></rect><foreignObject height="24" width="140.515625"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel">Inactive dirty page?</span></div></foreignObject></g></g><g transform="translate(354.21875, 2035.0546875)" data-id="M" data-node="true" id="flowchart-M-201" class="node default default flowchart-label"><rect height="39" width="202.8125" y="-19.5" x="-101.40625" ry="0" rx="0" style="" class="basic label-container"></rect><g transform="translate(-93.90625, -12)" style="" class="label"><rect></rect><foreignObject height="24" width="187.8125"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel">Update metadata and PTE</span></div></foreignObject></g></g><g transform="translate(722.005859375, 1853.390625)" data-id="N" data-node="true" id="flowchart-N-205" class="node default default flowchart-label"><polygon style="" transform="translate(-88.1640625,88.1640625)" class="label-container" points="88.1640625,0 176.328125,-88.1640625 88.1640625,-176.328125 0,-88.1640625"></polygon><g transform="translate(-61.1640625, -12)" style="" class="label"><rect></rect><foreignObject height="24" width="122.328125"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel">Clock queue full?</span></div></foreignObject></g></g><g transform="translate(836.98046875, 2035.0546875)" data-id="O" data-node="true" id="flowchart-O-207" class="node default default flowchart-label"><rect height="39" width="157.0859375" y="-19.5" x="-78.54296875" ry="0" rx="0" style="" class="basic label-container"></rect><g transform="translate(-71.04296875, -12)" style="" class="label"><rect></rect><foreignObject height="24" width="142.0859375"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel">Run clock algorithm</span></div></foreignObject></g></g><g transform="translate(836.98046875, 2180.2421875)" data-id="P" data-node="true" id="flowchart-P-209" class="node default default flowchart-label"><polygon style="" transform="translate(-75.6875,75.6875)" class="label-container" points="75.6875,0 151.375,-75.6875 75.6875,-151.375 0,-75.6875"></polygon><g transform="translate(-48.6875, -12)" style="" class="label"><rect></rect><foreignObject height="24" width="97.375"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel">Victim found?</span></div></foreignObject></g></g><g transform="translate(751.443359375, 2402.1328125)" data-id="Q" data-node="true" id="flowchart-Q-211" class="node default default flowchart-label"><polygon style="" transform="translate(-72.203125,72.203125)" class="label-container" points="72.203125,0 144.40625,-72.203125 72.203125,-144.40625 0,-72.203125"></polygon><g transform="translate(-45.203125, -12)" style="" class="label"><rect></rect><foreignObject height="24" width="90.40625"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel">Victim dirty?</span></div></foreignObject></g></g><g transform="translate(646.275390625, 2567.8359375)" data-id="R" data-node="true" id="flowchart-R-213" class="node default default flowchart-label"><rect height="39" width="163.28125" y="-19.5" x="-81.640625" ry="0" rx="0" style="" class="basic label-container"></rect><g transform="translate(-74.140625, -12)" style="" class="label"><rect></rect><foreignObject height="24" width="148.28125"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel">Write victim to swap</span></div></foreignObject></g></g><g transform="translate(646.275390625, 2747.4609375)" data-id="S" data-node="true" id="flowchart-S-215" class="node default default flowchart-label"><polygon style="" transform="translate(-110.125,110.125)" class="label-container" points="110.125,0 220.25,-110.125 110.125,-220.25 0,-110.125"></polygon><g transform="translate(-83.125, -12)" style="" class="label"><rect></rect><foreignObject height="24" width="166.25"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel">Faulting page resident?</span></div></foreignObject></g></g><g transform="translate(523.4375, 2951.0859375)" data-id="T" data-node="true" id="flowchart-T-217" class="node default default flowchart-label"><rect height="39" width="163.8203125" y="-19.5" x="-81.91015625" ry="0" rx="0" style="" class="basic label-container"></rect><g transform="translate(-74.41015625, -12)" style="" class="label"><rect></rect><foreignObject height="24" width="148.8203125"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel">Fill page with zeroes</span></div></foreignObject></g></g><g transform="translate(646.275390625, 3040.0859375)" data-id="U" data-node="true" id="flowchart-U-219" class="node default default flowchart-label"><rect height="39" width="202.8125" y="-19.5" x="-101.40625" ry="0" rx="0" style="" class="basic label-container"></rect><g transform="translate(-93.90625, -12)" style="" class="label"><rect></rect><foreignObject height="24" width="187.8125"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel">Update PTE and metadata</span></div></foreignObject></g></g><g transform="translate(769.11328125, 2951.0859375)" data-id="V" data-node="true" id="flowchart-V-221" class="node default default flowchart-label"><rect height="39" width="227.53125" y="-19.5" x="-113.765625" ry="0" rx="0" style="" class="basic label-container"></rect><g transform="translate(-106.265625, -12)" style="" class="label"><rect></rect><foreignObject height="24" width="212.53125"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel">Load faulting page from swap</span></div></foreignObject></g></g><g transform="translate(856.611328125, 2567.8359375)" data-id="W" data-node="true" id="flowchart-W-225" class="node default default flowchart-label"><rect height="39" width="157.390625" y="-19.5" x="-78.6953125" ry="0" rx="0" style="" class="basic label-container"></rect><g transform="translate(-71.1953125, -12)" style="" class="label"><rect></rect><foreignObject height="24" width="142.390625"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel">Update clock queue</span></div></foreignObject></g></g><g transform="translate(922.517578125, 2402.1328125)" data-id="X" data-node="true" id="flowchart-X-227" class="node default default flowchart-label"><rect height="39" width="97.7421875" y="-19.5" x="-48.87109375" ry="0" rx="0" style="" class="basic label-container"></rect><g transform="translate(-41.37109375, -12)" style="" class="label"><rect></rect><foreignObject height="24" width="82.7421875"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel">Assert false</span></div></foreignObject></g></g><g transform="translate(607.03125, 2035.0546875)" data-id="Y" data-node="true" id="flowchart-Y-229" class="node default default flowchart-label"><rect height="39" width="202.8125" y="-19.5" x="-101.40625" ry="0" rx="0" style="" class="basic label-container"></rect><g transform="translate(-93.90625, -12)" style="" class="label"><rect></rect><foreignObject height="24" width="187.8125"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel">Update PTE and metadata</span></div></foreignObject></g></g></g></g></g></g><defs><style id="svg-pan-zoom-controls-styles" type="text/css">.svg-pan-zoom-control { cursor: pointer; fill: black; fill-opacity: 0.333; } .svg-pan-zoom-control:hover { fill-opacity: 0.8; } .svg-pan-zoom-control-background { fill: white; fill-opacity: 0.5; } .svg-pan-zoom-control-background { fill-opacity: 0.8; }</style></defs><g id="svg-pan-zoom-controls" transform="translate(354 833) scale(0.75)" class="svg-pan-zoom-control"><g id="svg-pan-zoom-zoom-in" transform="translate(30.5 5) scale(0.015)" class="svg-pan-zoom-control"><rect x="0" y="0" width="1500" height="1400" class="svg-pan-zoom-control-background"></rect><path d="M1280 576v128q0 26 -19 45t-45 19h-320v320q0 26 -19 45t-45 19h-128q-26 0 -45 -19t-19 -45v-320h-320q-26 0 -45 -19t-19 -45v-128q0 -26 19 -45t45 -19h320v-320q0 -26 19 -45t45 -19h128q26 0 45 19t19 45v320h320q26 0 45 19t19 45zM1536 1120v-960 q0 -119 -84.5 -203.5t-203.5 -84.5h-960q-119 0 -203.5 84.5t-84.5 203.5v960q0 119 84.5 203.5t203.5 84.5h960q119 0 203.5 -84.5t84.5 -203.5z" class="svg-pan-zoom-control-element"></path></g><g id="svg-pan-zoom-reset-pan-zoom" transform="translate(5 35) scale(0.4)" class="svg-pan-zoom-control"><rect x="2" y="2" width="182" height="58" class="svg-pan-zoom-control-background"></rect><path d="M33.051,20.632c-0.742-0.406-1.854-0.609-3.338-0.609h-7.969v9.281h7.769c1.543,0,2.701-0.188,3.473-0.562c1.365-0.656,2.048-1.953,2.048-3.891C35.032,22.757,34.372,21.351,33.051,20.632z" class="svg-pan-zoom-control-element"></path><path d="M170.231,0.5H15.847C7.102,0.5,0.5,5.708,0.5,11.84v38.861C0.5,56.833,7.102,61.5,15.847,61.5h154.384c8.745,0,15.269-4.667,15.269-10.798V11.84C185.5,5.708,178.976,0.5,170.231,0.5z M42.837,48.569h-7.969c-0.219-0.766-0.375-1.383-0.469-1.852c-0.188-0.969-0.289-1.961-0.305-2.977l-0.047-3.211c-0.03-2.203-0.41-3.672-1.142-4.406c-0.732-0.734-2.103-1.102-4.113-1.102h-7.05v13.547h-7.055V14.022h16.524c2.361,0.047,4.178,0.344,5.45,0.891c1.272,0.547,2.351,1.352,3.234,2.414c0.731,0.875,1.31,1.844,1.737,2.906s0.64,2.273,0.64,3.633c0,1.641-0.414,3.254-1.242,4.84s-2.195,2.707-4.102,3.363c1.594,0.641,2.723,1.551,3.387,2.73s0.996,2.98,0.996,5.402v2.32c0,1.578,0.063,2.648,0.19,3.211c0.19,0.891,0.635,1.547,1.333,1.969V48.569z M75.579,48.569h-26.18V14.022h25.336v6.117H56.454v7.336h16.781v6H56.454v8.883h19.125V48.569z M104.497,46.331c-2.44,2.086-5.887,3.129-10.34,3.129c-4.548,0-8.125-1.027-10.731-3.082s-3.909-4.879-3.909-8.473h6.891c0.224,1.578,0.662,2.758,1.316,3.539c1.196,1.422,3.246,2.133,6.15,2.133c1.739,0,3.151-0.188,4.236-0.562c2.058-0.719,3.087-2.055,3.087-4.008c0-1.141-0.504-2.023-1.512-2.648c-1.008-0.609-2.607-1.148-4.796-1.617l-3.74-0.82c-3.676-0.812-6.201-1.695-7.576-2.648c-2.328-1.594-3.492-4.086-3.492-7.477c0-3.094,1.139-5.664,3.417-7.711s5.623-3.07,10.036-3.07c3.685,0,6.829,0.965,9.431,2.895c2.602,1.93,3.966,4.73,4.093,8.402h-6.938c-0.128-2.078-1.057-3.555-2.787-4.43c-1.154-0.578-2.587-0.867-4.301-0.867c-1.907,0-3.428,0.375-4.565,1.125c-1.138,0.75-1.706,1.797-1.706,3.141c0,1.234,0.561,2.156,1.682,2.766c0.721,0.406,2.25,0.883,4.589,1.43l6.063,1.43c2.657,0.625,4.648,1.461,5.975,2.508c2.059,1.625,3.089,3.977,3.089,7.055C108.157,41.624,106.937,44.245,104.497,46.331z M139.61,48.569h-26.18V14.022h25.336v6.117h-18.281v7.336h16.781v6h-16.781v8.883h19.125V48.569z M170.337,20.14h-10.336v28.43h-7.266V20.14h-10.383v-6.117h27.984V20.14z" class="svg-pan-zoom-control-element"></path></g><g id="svg-pan-zoom-zoom-out" transform="translate(30.5 70) scale(0.015)" class="svg-pan-zoom-control"><rect x="0" y="0" width="1500" height="1400" class="svg-pan-zoom-control-background"></rect><path d="M1280 576v128q0 26 -19 45t-45 19h-896q-26 0 -45 -19t-19 -45v-128q0 -26 19 -45t45 -19h896q26 0 45 19t19 45zM1536 1120v-960q0 -119 -84.5 -203.5t-203.5 -84.5h-960q-119 0 -203.5 84.5t-84.5 203.5v960q0 119 84.5 203.5t203.5 84.5h960q119 0 203.5 -84.5 t84.5 -203.5z" class="svg-pan-zoom-control-element"></path></g></g></svg>',
    updateSVGData: (data) => set({ svgData: data }),
}));

// function getMakeGraphWebViewContent() {
//     return `
//         <!DOCTYPE html>
//         <html lang="en">
//         <head>
//             <meta charset="UTF-8">
//             <meta name="viewport" content="width=device-width, initial-scale=1.0">
//             <title>Text Input</title>
//         </head>
//         <body>
//             <input type="text" id="inputField" placeholder="Type here...">
//             <button onclick="sendText()">Submit</button>
//             <div id="displayText"></div>

//             <script>
//                 const vscode = acquireVsCodeApi();
//                 function sendText() {
//                     const input = document.getElementById('inputField').value;
//                     document.getElementById('displayText').innerText = input;
//                 }
//             </script>
//         </body>
//         </html>
//     `;
// }

function getMakeGraphWebViewContent() {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Text Input</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    margin: 20px;
                }
                input[type="text"] {
                    width: 300px; /* Wider input box */
                    padding: 8px;
                    font-size: 16px;
                    margin-bottom: 10px;
                }
                button {
                    padding: 8px 16px;
                    font-size: 16px;
                    cursor: pointer;
                    background-color: #0078d4;
                    color: white;
                    border: none;
                    border-radius: 5px;
                }
                #dropZone {
                    width: 300px;
                    height: 200px;
                    border: 2px dashed #0078d4;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-top: 20px;
                    color: #555;
                }
                #dropZone.dragover {
                    background-color: #f0f0f0;
                }
            </style>
        </head>
        <body>
            <input type="text" id="inputField" placeholder="Type here...">
            <button onclick="sendText()">Submit</button>
            <div id="displayText"></div>
            <div id="dropZone">Drag and drop an image here</div>

            <script>
                const vscode = acquireVsCodeApi();
                
                function sendText() {
                    const input = document.getElementById('inputField').value;
                    document.getElementById('displayText').innerText = input;
                }

                const dropZone = document.getElementById('dropZone');
                dropZone.addEventListener('dragover', (event) => {
                    event.stopPropagation();
                    event.preventDefault();
                    event.dataTransfer.dropEffect = 'copy';
                    dropZone.classList.add('dragover');
                });

                dropZone.addEventListener('dragleave', (event) => {
                    dropZone.classList.remove('dragover');
                });

                dropZone.addEventListener('drop', (event) => {
                    event.stopPropagation();
                    event.preventDefault();
                    dropZone.classList.remove('dragover');
                    const files = event.dataTransfer.files;
                    if (files.length > 0) {
                        const file = files[0];
                        if (file.type.startsWith('image/')) {
                            const reader = new FileReader();
                            reader.onload = function(e) {
                                const img = document.createElement('img');
                                img.src = e.target.result;
                                img.style.width = '100%';
                                img.style.height = 'auto';
                                dropZone.innerHTML = '';
                                dropZone.appendChild(img);
                            };
                            reader.readAsDataURL(file);
                        } else {
                            dropZone.innerText = 'Please drop an image file.';
                        }
                    }
                });
            </script>
        </body>
        </html>
    `;
}


const showGraphHandler = (previewPanel: vscode.WebviewPanel | undefined) => () => {

    console.log("hi")

    if (!previewPanel) {
        previewPanel = vscode.window.createWebviewPanel(
            'showGraph',
            'Show Graph',
            vscode.ViewColumn.Two,
            {}
        );

        previewPanel.onDidDispose(() => {
            previewPanel = undefined;
            // previewPanel = null;
        }, null);
    }
    else {
        previewPanel.reveal(vscode.ViewColumn.Two);
    }


    // previewPanel.webview.html = getMakeGraphWebViewContent();

        // previewPanel.webview.html = getWebviewContent();
    
}

const makeGraphHandler = (previewPanel: vscode.WebviewPanel | undefined) => {
    return () => {
        if (previewPanel) {
            // Bring the panel to the foreground if it's already created
            previewPanel.reveal(vscode.ViewColumn.Two);
        } else {
            // Create a new webview panel
            previewPanel = vscode.window.createWebviewPanel(
                'makeWebview',
                'Make Webview',
                vscode.ViewColumn.Two,
                {
                    // enableScripts: true
                }
            );

            // Set the HTML content for the webview
            previewPanel.webview.html = getMakeGraphWebViewContent();

            // Clean up the panel on dispose
            previewPanel.onDidDispose(() => {
                previewPanel = undefined;
                // previewPanel = null;
            }, null);
        }
    };
};

// const makeGraphHandler = (previewPanel: vscode.WebviewPanel | undefined) => () => {

//     if (previewPanel){
//         return;
//     }

//     previewPanel = vscode.window.createWebviewPanel(
//         'textWebview',
//         'Text Webview',
//         vscode.ViewColumn.One,
//         {
//             enableScripts: true
//         }
//     );

//     // previewPanel.webview.html = getWebviewContent();



// //    previewPanel = vscode.window.createWebviewPanel(
// //         'showGraph',
// //         'Show Graph',
// //         vscode.ViewColumn.Two,
// //         {}
    
//         // previewPanel.webview.html = getWebviewContent();
//     }
// }



export function activate(context: vscode.ExtensionContext) {
    let previewPanel: vscode.WebviewPanel | undefined;

    context.subscriptions.push(
        vscode.commands.registerCommand('contrail.showGraph', showGraphHandler(previewPanel)),
        vscode.commands.registerCommand('contrail.makeGraph', makeGraphHandler(previewPanel))
    );
}

function getWebviewContent(svg: string) {
    return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Cat Coding</title>
  </head>
  <body>
    ${svg}
  </body>
  </html>`;
}

export function deactivate() {}