const KEY="tsdne-local-metrics-v1";let events=[];try{events=JSON.parse(localStorage.getItem(KEY)||"[]");}catch{events=[];}
export function mark(name,data={}){const event={name,at:new Date().toISOString(),performanceMs:Math.round(performance.now()),...data};events.push(event);events=events.slice(-250);try{localStorage.setItem(KEY,JSON.stringify(events));}catch{}return event;}
export function measure(name,start,data={}){return mark(name,{durationMs:+(performance.now()-start).toFixed(1),...data});}
export function recentMetrics(){return [...events];}
export function metricSummary(){const durations={};for(const e of events){if(Number.isFinite(e.durationMs)){durations[e.name]??=[];durations[e.name].push(e.durationMs);}}return Object.fromEntries(Object.entries(durations).map(([name,values])=>[name,{count:values.length,last:values.at(-1),mean:+(values.reduce((a,b)=>a+b,0)/values.length).toFixed(1),min:Math.min(...values),max:Math.max(...values)}]));}
export function clearMetrics(){events=[];try{localStorage.removeItem(KEY);}catch{}}
