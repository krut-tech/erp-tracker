import { useState, useEffect, useMemo, useCallback } from "react";

const ALL_PAGES = [
  { id:"SA-01", role:"Super Admin", title:"Login Page" },
  { id:"SA-02", role:"Super Admin", title:"Dashboard" },
  { id:"SA-03", role:"Super Admin", title:"Admin Management" },
  { id:"SA-04", role:"Super Admin", title:"Add/Edit Admin Form" },
  { id:"SA-05", role:"Super Admin", title:"Institute/Branch Setup" },
  { id:"SA-06", role:"Super Admin", title:"Role & Permission Manager" },
  { id:"SA-07", role:"Super Admin", title:"Module On/Off Control" },
  { id:"SA-08", role:"Super Admin", title:"System Configuration" },
  { id:"SA-09", role:"Super Admin", title:"Email/SMS Gateway" },
  { id:"SA-10", role:"Super Admin", title:"Payment Gateway Setup" },
  { id:"SA-11", role:"Super Admin", title:"Subscription/License" },
  { id:"SA-12", role:"Super Admin", title:"Database Backup" },
  { id:"SA-13", role:"Super Admin", title:"Audit Log Viewer" },
  { id:"SA-14", role:"Super Admin", title:"System Announcements" },
  { id:"SA-15", role:"Super Admin", title:"Financial Overview" },
  { id:"SA-16", role:"Super Admin", title:"Support Ticket System" },
  { id:"SA-17", role:"Super Admin", title:"API Access Manager" },
  { id:"SA-18", role:"Super Admin", title:"Profile Settings" },
  { id:"AD-01", role:"Admin", title:"Login Page" },
  { id:"AD-02", role:"Admin", title:"Admin Dashboard" },
  { id:"AD-03", role:"Admin", title:"Department Management" },
  { id:"AD-04", role:"Admin", title:"Course & Program Setup" },
  { id:"AD-05", role:"Admin", title:"Subject Management" },
  { id:"AD-06", role:"Admin", title:"Batch & Section Setup" },
  { id:"AD-07", role:"Admin", title:"Student Admission" },
  { id:"AD-08", role:"Admin", title:"Student List" },
  { id:"AD-09", role:"Admin", title:"Student Profile View/Edit" },
  { id:"AD-10", role:"Admin", title:"Faculty Management" },
  { id:"AD-11", role:"Admin", title:"Faculty Profile" },
  { id:"AD-12", role:"Admin", title:"Timetable Manager" },
  { id:"AD-13", role:"Admin", title:"Attendance Overview" },
  { id:"AD-14", role:"Admin", title:"Leave Management" },
  { id:"AD-15", role:"Admin", title:"Exam Schedule" },
  { id:"AD-16", role:"Admin", title:"Marks Entry & Results" },
  { id:"AD-17", role:"Admin", title:"Hall Ticket Generator" },
  { id:"AD-18", role:"Admin", title:"Fee Structure Setup" },
  { id:"AD-19", role:"Admin", title:"Fee Collection" },
  { id:"AD-20", role:"Admin", title:"Fee Reports & Defaulters" },
  { id:"AD-21", role:"Admin", title:"Payroll Management" },
  { id:"AD-22", role:"Admin", title:"Notice Board" },
  { id:"AD-23", role:"Admin", title:"Event Management" },
  { id:"AD-24", role:"Admin", title:"Library Management" },
  { id:"AD-25", role:"Admin", title:"Hostel Management" },
  { id:"AD-26", role:"Admin", title:"Transport Management" },
  { id:"AD-27", role:"Admin", title:"HR & Staff Records" },
  { id:"AD-28", role:"Admin", title:"Asset & Inventory" },
  { id:"AD-29", role:"Admin", title:"Reports & Analytics" },
  { id:"AD-30", role:"Admin", title:"Placement Cell" },
  { id:"AD-31", role:"Admin", title:"Feedback & Surveys" },
  { id:"AD-32", role:"Admin", title:"Complaint/Grievance" },
  { id:"AD-33", role:"Admin", title:"Settings" },
  { id:"AD-34", role:"Admin", title:"ID Card Generator" },
  { id:"AD-35", role:"Admin", title:"Scholarship Management" },
  { id:"FA-01", role:"Faculty", title:"Login Page" },
  { id:"FA-02", role:"Faculty", title:"Faculty Dashboard" },
  { id:"FA-03", role:"Faculty", title:"My Profile" },
  { id:"FA-04", role:"Faculty", title:"My Timetable" },
  { id:"FA-05", role:"Faculty", title:"Take Attendance" },
  { id:"FA-06", role:"Faculty", title:"Attendance History" },
  { id:"FA-07", role:"Faculty", title:"Attendance Reports" },
  { id:"FA-08", role:"Faculty", title:"Assignment Manager" },
  { id:"FA-09", role:"Faculty", title:"Create Assignment" },
  { id:"FA-10", role:"Faculty", title:"Grade Assignments" },
  { id:"FA-11", role:"Faculty", title:"Marks Entry" },
  { id:"FA-12", role:"Faculty", title:"Syllabus Tracker" },
  { id:"FA-13", role:"Faculty", title:"Lesson Plan" },
  { id:"FA-14", role:"Faculty", title:"Study Material Upload" },
  { id:"FA-15", role:"Faculty", title:"Online Quiz/Exam Creator" },
  { id:"FA-16", role:"Faculty", title:"Live Class Scheduler" },
  { id:"FA-17", role:"Faculty", title:"Discussion Forum" },
  { id:"FA-18", role:"Faculty", title:"Leave Application" },
  { id:"FA-19", role:"Faculty", title:"My Leave History" },
  { id:"FA-20", role:"Faculty", title:"Communication / Messages" },
  { id:"FA-21", role:"Faculty", title:"Notices & Announcements" },
  { id:"FA-22", role:"Faculty", title:"Student Performance View" },
  { id:"FA-23", role:"Faculty", title:"Feedback / Complaints" },
  { id:"FA-24", role:"Faculty", title:"My Payslips" },
  { id:"FA-25", role:"Faculty", title:"Event Participation" },
  { id:"ST-01", role:"Student", title:"Login Page" },
  { id:"ST-02", role:"Student", title:"Student Dashboard" },
  { id:"ST-03", role:"Student", title:"My Profile" },
  { id:"ST-04", role:"Student", title:"My Timetable" },
  { id:"ST-05", role:"Student", title:"My Attendance" },
  { id:"ST-06", role:"Student", title:"Attendance Regularisation" },
  { id:"ST-07", role:"Student", title:"Assignments" },
  { id:"ST-08", role:"Student", title:"Submit Assignment" },
  { id:"ST-09", role:"Student", title:"Study Materials" },
  { id:"ST-10", role:"Student", title:"Results & Marksheet" },
  { id:"ST-11", role:"Student", title:"Online Quiz / Exam" },
  { id:"ST-12", role:"Student", title:"Exam Schedule" },
  { id:"ST-13", role:"Student", title:"Hall Ticket Download" },
  { id:"ST-14", role:"Student", title:"Fee Details" },
  { id:"ST-15", role:"Student", title:"Pay Fees Online" },
  { id:"ST-16", role:"Student", title:"Fee Receipt History" },
  { id:"ST-17", role:"Student", title:"Scholarship Status" },
  { id:"ST-18", role:"Student", title:"Leave Application" },
  { id:"ST-19", role:"Student", title:"My Leave History" },
  { id:"ST-20", role:"Student", title:"Notice Board" },
  { id:"ST-21", role:"Student", title:"Messages / Communication" },
  { id:"ST-22", role:"Student", title:"Discussion Forum" },
  { id:"ST-23", role:"Student", title:"Live Class Schedule" },
  { id:"ST-24", role:"Student", title:"Library Portal" },
  { id:"ST-25", role:"Student", title:"Hostel Details" },
  { id:"ST-26", role:"Student", title:"Transport Details" },
  { id:"ST-27", role:"Student", title:"Complaint / Grievance" },
  { id:"ST-28", role:"Student", title:"Placement Portal" },
  { id:"ST-29", role:"Student", title:"My Resume Builder" },
  { id:"ST-30", role:"Student", title:"Feedback Forms" },
  { id:"ST-31", role:"Student", title:"Events & Activities" },
  { id:"ST-32", role:"Student", title:"Re-evaluation Request" },
  { id:"ST-33", role:"Student", title:"Document Download Center" },
  { id:"ST-34", role:"Student", title:"ID Card Download" },
  { id:"ST-35", role:"Student", title:"Academic Progress Report" },
];

const ROLE_COLORS = {
  "Super Admin":{ bg:"#fde8e8", text:"#c00000", dot:"#e53e3e" },
  "Admin":      { bg:"#f3e8fb", text:"#7030a0", dot:"#805ad5" },
  "Faculty":    { bg:"#e8f1fb", text:"#0070c0", dot:"#3182ce" },
  "Student":    { bg:"#e8f9ee", text:"#00b050", dot:"#38a169" },
};

const STATUS_CFG = {
  "Not Started":{ bg:"#1e293b", text:"#64748b", bar:"#334155", icon:"○" },
  "In Progress": { bg:"#451a03", text:"#fbbf24", bar:"#d97706", icon:"◑" },
  "Review":      { bg:"#1e1b4b", text:"#818cf8", bar:"#6366f1", icon:"◈" },
  "Completed":   { bg:"#052e16", text:"#4ade80", bar:"#16a34a", icon:"●" },
};

const SHARED = true;
const TASKS_KEY = "erp_tasks_v3";
const NAMES_KEY = "erp_names_v3";
const toDay = () => new Date().toISOString().split("T")[0];

async function cloudGet(key) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

async function cloudSet(key, val) {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch {}
}

function Toast({msg}){
  return msg?(
    <div style={{position:"fixed",bottom:24,right:24,background:"#22c55e",color:"#fff",
      padding:"10px 22px",borderRadius:10,fontWeight:700,fontSize:13,zIndex:9999,
      boxShadow:"0 4px 24px #0008",animation:"fi .25s"}}>✓ {msg}</div>
  ):null;
}

export default function App(){
  const [tasks,setTasks]     = useState({});
  const [names,setNames]     = useState({d1:"Designer 1",d2:"Designer 2"});
  const [loading,setLoading] = useState(true);
  const [saving,setSaving]   = useState(false);
  const [syncTime,setSyncT]  = useState(null);
  const [toast,setToast]     = useState("");
  const [tab,setTab]         = useState("dash");
  const [fRole,setFRole]     = useState("All");
  const [fDes,setFDes]       = useState("All");
  const [fStat,setFStat]     = useState("All");
  const [search,setSearch]   = useState("");
  const [sort,setSort]       = useState("id");
  const [editN,setEditN]     = useState(false);
  const [tmpN,setTmpN]       = useState({d1:"Designer 1",d2:"Designer 2"});
  const [noteModal,setNoteM] = useState(null);
  const [logModal,setLogM]   = useState(null);

  const flash=(m)=>{setToast(m);setTimeout(()=>setToast(""),2600);};

  useEffect(()=>{
    (async()=>{
      const [t,n]=await Promise.all([cloudGet(TASKS_KEY),cloudGet(NAMES_KEY)]);
      if(t)setTasks(t); if(n){setNames(n);setTmpN(n);}
      setSyncT(new Date()); setLoading(false);
    })();
  },[]);

  useEffect(()=>{
    const id=setInterval(async()=>{
      const [t,n]=await Promise.all([cloudGet(TASKS_KEY),cloudGet(NAMES_KEY)]);
      if(t)setTasks(t); if(n)setNames(n); setSyncT(new Date());
    },15000);
    return()=>clearInterval(id);
  },[]);

  const gt=useCallback((id)=>tasks[id]||{status:"Not Started",designer:null,startDate:null,endDate:null,notes:"",log:[]},[tasks]);

  const upd=useCallback(async(id,ups)=>{
    setSaving(true);
    const prev=tasks[id]||{status:"Not Started",designer:null,startDate:null,endDate:null,notes:"",log:[]};
    const next={...prev,...ups};
    const entry={date:new Date().toISOString(),changes:[]};
    if(ups.status&&ups.status!==prev.status) entry.changes.push(`Status: ${prev.status} → ${ups.status}`);
    if(ups.designer!==undefined&&ups.designer!==prev.designer)
      entry.changes.push(`Assigned: ${ups.designer?(ups.designer==="d1"?names.d1:names.d2):"Unassigned"}`);
    if(ups.startDate&&ups.startDate!==prev.startDate) entry.changes.push(`Start: ${ups.startDate}`);
    if(ups.endDate&&ups.endDate!==prev.endDate) entry.changes.push(`End: ${ups.endDate}`);
    if(entry.changes.length) next.log=[...(prev.log||[]),entry];
    const updated={...tasks,[id]:next};
    setTasks(updated);
    await cloudSet(TASKS_KEY,updated);
    setSaving(false); setSyncT(new Date());
  },[tasks,names]);

  const saveNames=async(n)=>{setNames(n);await cloudSet(NAMES_KEY,n);flash("Names saved!");};

  const stats=useMemo(()=>{
    const r={total:ALL_PAGES.length,byS:{},byD:{},byR:{}};
    Object.keys(STATUS_CFG).forEach(s=>r.byS[s]=0);
    ALL_PAGES.forEach(p=>{
      const t=gt(p.id);
      r.byS[t.status]=(r.byS[t.status]||0)+1;
      if(t.designer){
        if(!r.byD[t.designer])r.byD[t.designer]={total:0,done:0,wip:0};
        r.byD[t.designer].total++;
        if(t.status==="Completed")r.byD[t.designer].done++;
        if(t.status==="In Progress")r.byD[t.designer].wip++;
      }
      if(!r.byR[p.role])r.byR[p.role]={total:0,done:0};
      r.byR[p.role].total++;
      if(t.status==="Completed")r.byR[p.role].done++;
    });
    return r;
  },[tasks]);

  const filtered=useMemo(()=>ALL_PAGES
    .filter(p=>fRole==="All"||p.role===fRole)
    .filter(p=>{
      if(fDes==="All")return true;
      if(fDes==="Unassigned")return!gt(p.id).designer;
      return gt(p.id).designer===fDes;
    })
    .filter(p=>fStat==="All"||gt(p.id).status===fStat)
    .filter(p=>!search||p.title.toLowerCase().includes(search.toLowerCase())||p.id.toLowerCase().includes(search.toLowerCase()))
    .sort((a,b)=>{
      if(sort==="id")return a.id.localeCompare(b.id);
      if(sort==="status")return gt(a.id).status.localeCompare(gt(b.id).status);
      if(sort==="designer")return(gt(a.id).designer||"z").localeCompare(gt(b.id).designer||"z");
      return 0;
    }),[tasks,fRole,fDes,fStat,search,sort]);

  const pct=Math.round(((stats.byS["Completed"]||0)/stats.total)*100);

  if(loading)return(
    <div style={{fontFamily:"'DM Sans','Segoe UI',sans-serif",background:"#0f172a",minHeight:"100vh",
      display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",color:"#e2e8f0"}}>
      <div style={{fontSize:52,marginBottom:16}}>🎨</div>
      <div style={{fontSize:18,fontWeight:700,marginBottom:6}}>Cloud data load ho raha hai...</div>
      <div style={{fontSize:13,color:"#64748b"}}>Shared database se connect kar raha hai</div>
      <div style={{marginTop:24,display:"flex",gap:8}}>
        {[0,1,2].map(i=><div key={i} style={{width:10,height:10,background:"#6366f1",borderRadius:"50%",
          animation:`b 0.8s ${i*0.15}s infinite alternate`}}/>)}
      </div>
      <style>{`@keyframes b{to{transform:translateY(-12px);opacity:.2}} @keyframes fi{from{opacity:0;transform:translateY(8px)}to{opacity:1}}`}</style>
    </div>
  );

  const S=(props)=><style>{`@keyframes fi{from{opacity:0;transform:translateY(6px)}to{opacity:1}} @keyframes b{to{transform:translateY(-12px);opacity:.2}}`}</style>;

  return(
    <div style={{fontFamily:"'DM Sans','Segoe UI',sans-serif",background:"#0f172a",minHeight:"100vh",color:"#e2e8f0"}}>
      <S/>

      {/* HEADER */}
      <div style={{background:"#0f172a",borderBottom:"1px solid #1e293b",padding:"12px 20px",
        display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:100}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:38,height:38,background:"linear-gradient(135deg,#6366f1,#8b5cf6)",
            borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>🎨</div>
          <div>
            <div style={{fontWeight:700,fontSize:15,color:"#f1f5f9"}}>Institute ERP — Designer Tracker</div>
            <div style={{fontSize:11,color:"#64748b",display:"flex",alignItems:"center",gap:6}}>
              <span style={{width:7,height:7,background:saving?"#fbbf24":"#22c55e",borderRadius:"50%",display:"inline-block"}}/>
              {saving?"Saving to cloud...":syncTime?`Synced ${syncTime.toLocaleTimeString()}`:""}
              <span onClick={async()=>{const[t,n]=await Promise.all([cloudGet(TASKS_KEY),cloudGet(NAMES_KEY)]);
                if(t)setTasks(t);if(n)setNames(n);setSyncT(new Date());flash("Synced!");}}
                style={{color:"#38bdf8",cursor:"pointer",textDecoration:"underline",marginLeft:4}}>↺ Refresh</span>
            </div>
          </div>
        </div>

        {editN?(
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <input value={tmpN.d1} onChange={e=>setTmpN(n=>({...n,d1:e.target.value}))}
              style={{padding:"5px 10px",borderRadius:7,border:"1px solid #334155",background:"#1e293b",color:"#e2e8f0",fontSize:13,width:130}}/>
            <input value={tmpN.d2} onChange={e=>setTmpN(n=>({...n,d2:e.target.value}))}
              style={{padding:"5px 10px",borderRadius:7,border:"1px solid #334155",background:"#1e293b",color:"#e2e8f0",fontSize:13,width:130}}/>
            <button onClick={async()=>{await saveNames(tmpN);setEditN(false);}}
              style={{padding:"5px 14px",background:"#6366f1",color:"#fff",border:"none",borderRadius:7,cursor:"pointer",fontSize:12,fontWeight:700}}>Save</button>
            <button onClick={()=>{setTmpN(names);setEditN(false);}}
              style={{padding:"5px 10px",background:"#334155",color:"#94a3b8",border:"none",borderRadius:7,cursor:"pointer",fontSize:12}}>✕</button>
          </div>
        ):(
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <span style={{background:"#4c1d95",color:"#c4b5fd",padding:"4px 12px",borderRadius:20,fontSize:12,fontWeight:600}}>👤 {names.d1}</span>
            <span style={{background:"#0c4a6e",color:"#7dd3fc",padding:"4px 12px",borderRadius:20,fontSize:12,fontWeight:600}}>👤 {names.d2}</span>
            <button onClick={()=>{setTmpN(names);setEditN(true);}}
              style={{padding:"4px 10px",background:"#1e293b",color:"#94a3b8",border:"1px solid #334155",borderRadius:7,cursor:"pointer",fontSize:12}}>✏️ Edit</button>
          </div>
        )}
      </div>

      {/* SYNC BANNER */}
      <div style={{background:"#0c1a2e",borderBottom:"1px solid #1e293b",padding:"5px 20px",textAlign:"center"}}>
        <span style={{fontSize:11,color:"#38bdf8"}}>☁️ Shared Cloud Mode — dono designers ka data automatic sync hoga • Ye data sabko visible hai</span>
      </div>

      {/* TABS */}
      <div style={{display:"flex",borderBottom:"1px solid #1e293b",background:"#0a1628",padding:"0 20px"}}>
        {[["dash","📊 Dashboard"],["tasks","📋 All Pages ("+ALL_PAGES.length+")"],["timeline","📅 Timeline"]].map(([t,l])=>(
          <button key={t} onClick={()=>setTab(t)} style={{padding:"11px 18px",background:"none",border:"none",cursor:"pointer",
            fontSize:13,fontWeight:600,color:tab===t?"#818cf8":"#64748b",
            borderBottom:tab===t?"2px solid #818cf8":"2px solid transparent"}}>
            {l}
          </button>
        ))}
      </div>

      <div style={{padding:"20px",maxWidth:1440,margin:"0 auto"}}>

        {/* ─── DASHBOARD ─── */}
        {tab==="dash"&&(
          <div>
            {/* Hero progress */}
            <div style={{background:"linear-gradient(135deg,#1e1b4b,#0f2744)",borderRadius:16,padding:24,
              marginBottom:16,border:"1px solid #312e81",display:"flex",gap:24,alignItems:"center"}}>
              <div style={{flex:1}}>
                <div style={{fontSize:12,color:"#a5b4fc",marginBottom:4}}>Overall Project Progress</div>
                <div style={{fontSize:40,fontWeight:900,color:"#f1f5f9",lineHeight:1}}>{pct}%</div>
                <div style={{fontSize:13,color:"#64748b",marginTop:4}}>{stats.byS["Completed"]||0} / {stats.total} pages completed</div>
                <div style={{background:"#0f172a",borderRadius:99,height:12,overflow:"hidden",marginTop:14}}>
                  <div style={{width:`${pct}%`,height:"100%",background:"linear-gradient(90deg,#6366f1,#a855f7)",
                    borderRadius:99,transition:"width .6s"}}/>
                </div>
              </div>
              <div style={{fontSize:64}}>🚀</div>
            </div>

            {/* Status row */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:16}}>
              {Object.entries(STATUS_CFG).map(([s,c])=>(
                <div key={s} onClick={()=>{setTab("tasks");setFStat(s);}}
                  style={{background:"#1e293b",borderRadius:12,padding:"14px 18px",border:`1px solid ${c.bar}44`,cursor:"pointer"}}>
                  <div style={{fontSize:22,marginBottom:6}}>{c.icon}</div>
                  <div style={{fontSize:26,fontWeight:800,color:"#f1f5f9"}}>{stats.byS[s]||0}</div>
                  <div style={{fontSize:11,color:c.text,fontWeight:600}}>{s}</div>
                </div>
              ))}
            </div>

            {/* Designer cards */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:16}}>
              {["d1","d2"].map((dk,i)=>{
                const d=stats.byD[dk]||{total:0,done:0,wip:0};
                const dp=d.total?Math.round((d.done/d.total)*100):0;
                const col=dk==="d1"?"#6d28d9":"#0369a1";
                const lite=dk==="d1"?"#c4b5fd":"#7dd3fc";
                return(
                  <div key={dk} style={{background:"#1e293b",borderRadius:16,padding:20,border:`1px solid ${col}55`}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
                      <div>
                        <div style={{fontSize:11,color:"#64748b",marginBottom:3}}>Designer {i+1}</div>
                        <div style={{fontSize:20,fontWeight:700,color:lite}}>{names[dk]}</div>
                      </div>
                      <div style={{fontSize:34,fontWeight:900,color:lite}}>{dp}%</div>
                    </div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:14}}>
                      {[["Assigned",d.total,"#f1f5f9"],["Done",d.done,"#4ade80"],["WIP",d.wip,"#fbbf24"]].map(([l,v,c])=>(
                        <div key={l} style={{textAlign:"center",background:"#0f172a",borderRadius:8,padding:"8px 4px"}}>
                          <div style={{fontSize:20,fontWeight:800,color:c}}>{v}</div>
                          <div style={{fontSize:10,color:"#64748b"}}>{l}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{background:"#0f172a",borderRadius:99,height:8}}>
                      <div style={{width:`${dp}%`,height:"100%",background:col,borderRadius:99,transition:"width .5s"}}/>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Role breakdown */}
            <div style={{background:"#1e293b",borderRadius:16,padding:20,border:"1px solid #334155"}}>
              <div style={{fontSize:13,fontWeight:700,color:"#f1f5f9",marginBottom:14}}>Progress by Role</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12}}>
                {Object.entries(stats.byR).map(([role,rd])=>{
                  const rc=ROLE_COLORS[role];
                  const rp=Math.round((rd.done/rd.total)*100);
                  return(
                    <div key={role} onClick={()=>{setTab("tasks");setFRole(role);}}
                      style={{background:"#0f172a",borderRadius:12,padding:16,cursor:"pointer",border:`1px solid ${rc.dot}22`}}>
                      <div style={{fontSize:11,color:rc.dot,fontWeight:700,marginBottom:4}}>{role}</div>
                      <div style={{fontSize:24,fontWeight:800,color:"#f1f5f9"}}>{rd.done}/{rd.total}</div>
                      <div style={{fontSize:11,color:"#64748b",marginBottom:8}}>{rp}% done</div>
                      <div style={{background:"#1e293b",borderRadius:99,height:5}}>
                        <div style={{width:`${rp}%`,height:"100%",background:rc.dot,borderRadius:99}}/>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ─── TASKS ─── */}
        {tab==="tasks"&&(
          <div>
            <div style={{display:"flex",gap:8,marginBottom:10,flexWrap:"wrap",alignItems:"center"}}>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍  Search by ID or title..."
                style={{flex:1,minWidth:200,padding:"8px 14px",borderRadius:8,border:"1px solid #334155",
                  background:"#1e293b",color:"#e2e8f0",fontSize:13}}/>
              {[
                ["Role",fRole,setFRole,["All","Super Admin","Admin","Faculty","Student"]],
                ["Designer",fDes,setFDes,["All","Unassigned","d1","d2"]],
                ["Status",fStat,setFStat,["All",...Object.keys(STATUS_CFG)]],
                ["Sort",sort,setSort,["id","status","designer"]],
              ].map(([lbl,val,set,opts])=>(
                <select key={lbl} value={val} onChange={e=>set(e.target.value)}
                  style={{padding:"8px 10px",borderRadius:8,border:"1px solid #334155",
                    background:"#1e293b",color:"#e2e8f0",fontSize:12,cursor:"pointer"}}>
                  {opts.map(o=><option key={o} value={o}>
                    {o==="d1"?names.d1:o==="d2"?names.d2:
                     o==="id"?"Sort: ID":o==="status"?"Sort: Status":o==="designer"?"Sort: Designer":o}
                  </option>)}
                </select>
              ))}
              <button onClick={()=>{setFRole("All");setFDes("All");setFStat("All");setSearch("");}}
                style={{padding:"7px 12px",background:"#334155",color:"#94a3b8",border:"none",borderRadius:8,cursor:"pointer",fontSize:12}}>✕ Clear</button>
              <span style={{fontSize:12,color:"#64748b"}}>{filtered.length} pages</span>
            </div>

            <div style={{display:"flex",gap:8,marginBottom:10,alignItems:"center",flexWrap:"wrap"}}>
              <span style={{fontSize:12,color:"#64748b"}}>Filtered pages bulk assign karo:</span>
              {["d1","d2"].map(dk=>(
                <button key={dk} onClick={async()=>{
                  setSaving(true);
                  const upd2={...tasks};
                  filtered.forEach(p=>{
                    const t=upd2[p.id]||{status:"Not Started",designer:null,startDate:null,endDate:null,notes:"",log:[]};
                    upd2[p.id]={...t,designer:dk,startDate:t.startDate||toDay(),
                      log:[...(t.log||[]),{date:new Date().toISOString(),changes:[`Assigned: ${names[dk]}`]}]};
                  });
                  setTasks(upd2);await cloudSet(TASKS_KEY,upd2);setSaving(false);
                  flash(`${filtered.length} pages assigned to ${names[dk]}`);
                }} style={{padding:"5px 14px",background:dk==="d1"?"#6d28d9":"#0369a1",color:"#fff",
                  border:"none",borderRadius:7,cursor:"pointer",fontSize:12,fontWeight:700}}>
                  → {names[dk]}
                </button>
              ))}
            </div>

            <div style={{background:"#1e293b",borderRadius:12,border:"1px solid #334155",overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse",minWidth:860}}>
                <thead>
                  <tr style={{background:"#0a1628",borderBottom:"1px solid #334155"}}>
                    {["ID","Role","Page Title","Designer","Status","Start Date","End Date","Actions"].map(h=>(
                      <th key={h} style={{padding:"9px 13px",textAlign:"left",fontSize:10,fontWeight:700,
                        color:"#64748b",textTransform:"uppercase",letterSpacing:"0.06em",whiteSpace:"nowrap"}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((page,idx)=>{
                    const t=gt(page.id);
                    const rc=ROLE_COLORS[page.role];
                    const sc=STATUS_CFG[t.status];
                    return(
                      <tr key={page.id} style={{borderBottom:"1px solid #0f172a",
                        background:idx%2===0?"#1e293b":"#192232"}}
                        onMouseEnter={e=>e.currentTarget.style.background="#253347"}
                        onMouseLeave={e=>e.currentTarget.style.background=idx%2===0?"#1e293b":"#192232"}>
                        <td style={{padding:"7px 13px"}}>
                          <span style={{fontFamily:"monospace",fontSize:12,background:"#0f172a",
                            padding:"2px 8px",borderRadius:5,color:rc.dot,fontWeight:700}}>{page.id}</span>
                        </td>
                        <td style={{padding:"7px 13px"}}>
                          <span style={{background:rc.bg,color:rc.text,padding:"2px 8px",borderRadius:10,fontSize:10,fontWeight:700}}>{page.role}</span>
                        </td>
                        <td style={{padding:"7px 13px",fontSize:13,color:"#e2e8f0"}}>{page.title}</td>
                        <td style={{padding:"7px 13px"}}>
                          <select value={t.designer||""} onChange={e=>upd(page.id,{designer:e.target.value||null,
                            startDate:e.target.value&&!t.startDate?toDay():t.startDate})}
                            style={{padding:"4px 8px",borderRadius:6,border:"1px solid #334155",
                              background:"#0f172a",color:t.designer?(t.designer==="d1"?"#c4b5fd":"#7dd3fc"):"#64748b",
                              fontSize:12,cursor:"pointer"}}>
                            <option value="">— Unassigned —</option>
                            <option value="d1">{names.d1}</option>
                            <option value="d2">{names.d2}</option>
                          </select>
                        </td>
                        <td style={{padding:"7px 13px"}}>
                          <select value={t.status} onChange={e=>upd(page.id,{status:e.target.value,
                            endDate:e.target.value==="Completed"&&!t.endDate?toDay():t.endDate})}
                            style={{padding:"4px 8px",borderRadius:6,border:"none",
                              background:sc.bg,color:sc.text,fontSize:12,fontWeight:700,cursor:"pointer"}}>
                            {Object.keys(STATUS_CFG).map(s=><option key={s} value={s}>{STATUS_CFG[s].icon} {s}</option>)}
                          </select>
                        </td>
                        <td style={{padding:"7px 13px"}}>
                          <input type="date" value={t.startDate||""} onChange={e=>upd(page.id,{startDate:e.target.value})}
                            style={{padding:"3px 6px",borderRadius:6,border:"1px solid #334155",
                              background:"#0f172a",color:"#94a3b8",fontSize:11}}/>
                        </td>
                        <td style={{padding:"7px 13px"}}>
                          <input type="date" value={t.endDate||""} onChange={e=>upd(page.id,{endDate:e.target.value})}
                            style={{padding:"3px 6px",borderRadius:6,border:"1px solid #334155",
                              background:"#0f172a",color:"#94a3b8",fontSize:11}}/>
                        </td>
                        <td style={{padding:"7px 13px"}}>
                          <div style={{display:"flex",gap:4}}>
                            <button onClick={()=>setNoteM({page,task:{...t}})} title="Notes"
                              style={{padding:"4px 8px",background:"#334155",color:t.notes?"#fbbf24":"#94a3b8",
                                border:"none",borderRadius:5,cursor:"pointer",fontSize:12}}>📝</button>
                            <button onClick={()=>setLogM({page,task:{...gt(page.id)}})} title="Activity Log"
                              style={{padding:"4px 8px",background:"#334155",color:"#94a3b8",
                                border:"none",borderRadius:5,cursor:"pointer",fontSize:11}}>
                              📋{(gt(page.id).log||[]).length>0?` ${(gt(page.id).log||[]).length}`:""}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ─── TIMELINE ─── */}
        {tab==="timeline"&&(
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18}}>
            {["d1","d2"].map((dk,i)=>{
              const col=dk==="d1"?"#6d28d9":"#0369a1";
              const lite=dk==="d1"?"#c4b5fd":"#7dd3fc";
              const pages=ALL_PAGES.filter(p=>gt(p.id).designer===dk);
              const byS={};
              Object.keys(STATUS_CFG).forEach(s=>byS[s]=pages.filter(p=>gt(p.id).status===s));
              return(
                <div key={dk} style={{background:"#1e293b",borderRadius:16,padding:20,border:`1px solid ${col}44`}}>
                  <div style={{fontSize:16,fontWeight:700,color:lite,marginBottom:16}}>
                    👤 {names[dk]}
                    <span style={{fontSize:12,color:"#64748b",fontWeight:400,marginLeft:8}}>{pages.length} pages assigned</span>
                  </div>
                  {["In Progress","Review","Completed","Not Started"].map(s=>{
                    const list=byS[s]||[];
                    if(!list.length)return null;
                    const bdr=s==="In Progress"?"#fbbf24":s==="Review"?"#818cf8":s==="Completed"?"#4ade80":"#334155";
                    return(
                      <div key={s} style={{marginBottom:16}}>
                        <div style={{fontSize:10,fontWeight:700,color:bdr,textTransform:"uppercase",
                          letterSpacing:"0.1em",marginBottom:8}}>
                          {STATUS_CFG[s].icon} {s} ({list.length})
                        </div>
                        <div style={{maxHeight:s==="Completed"?"220px":"auto",overflowY:s==="Completed"?"auto":"visible"}}>
                          {list.sort((a,b)=>(gt(b.id).endDate||"").localeCompare(gt(a.id).endDate||"")).map(p=>{
                            const t=gt(p.id);
                            const rc=ROLE_COLORS[p.role];
                            return(
                              <div key={p.id} style={{background:"#0f172a",borderRadius:7,padding:"7px 12px",
                                marginBottom:4,borderLeft:`3px solid ${bdr}`,
                                display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                                <div>
                                  <span style={{fontFamily:"monospace",fontSize:11,color:rc.dot}}>{p.id}</span>
                                  <span style={{fontSize:12,color:s==="Completed"?"#94a3b8":"#e2e8f0",marginLeft:8}}>{p.title}</span>
                                </div>
                                <div style={{fontSize:10,color:"#64748b",marginLeft:8,whiteSpace:"nowrap"}}>
                                  {t.startDate&&<span>{t.startDate}</span>}
                                  {t.endDate&&<span style={{color:"#4ade80"}}> → {t.endDate}</span>}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                  {pages.length===0&&(
                    <div style={{textAlign:"center",padding:"40px 20px",color:"#64748b"}}>
                      <div style={{fontSize:32,marginBottom:8}}>📭</div>
                      <div style={{fontSize:13}}>Koi page assign nahi hua</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* NOTE MODAL */}
      {noteModal&&(
        <div style={{position:"fixed",inset:0,background:"#000000aa",display:"flex",
          alignItems:"center",justifyContent:"center",zIndex:999}}>
          <div style={{background:"#1e293b",borderRadius:16,padding:24,width:500,
            border:"1px solid #334155",animation:"fi .2s"}}>
            <div style={{fontWeight:700,fontSize:15,color:"#f1f5f9",marginBottom:2}}>📝 Notes — {noteModal.page.id}</div>
            <div style={{fontSize:13,color:"#64748b",marginBottom:14}}>{noteModal.page.title}</div>
            <textarea value={noteModal.task.notes||""}
              onChange={e=>setNoteM(m=>({...m,task:{...m.task,notes:e.target.value}}))}
              placeholder="Design notes, revision history, references..."
              style={{width:"100%",minHeight:130,padding:12,borderRadius:8,border:"1px solid #334155",
                background:"#0f172a",color:"#e2e8f0",fontSize:13,resize:"vertical",boxSizing:"border-box"}}/>
            <div style={{display:"flex",gap:8,justifyContent:"flex-end",marginTop:12}}>
              <button onClick={()=>setNoteM(null)}
                style={{padding:"8px 16px",background:"#334155",color:"#94a3b8",border:"none",borderRadius:8,cursor:"pointer"}}>Cancel</button>
              <button onClick={async()=>{await upd(noteModal.page.id,{notes:noteModal.task.notes});setNoteM(null);flash("Notes saved!");}}
                style={{padding:"8px 18px",background:"#6366f1",color:"#fff",border:"none",borderRadius:8,cursor:"pointer",fontWeight:700}}>
                💾 Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LOG MODAL */}
      {logModal&&(
        <div style={{position:"fixed",inset:0,background:"#000000aa",display:"flex",
          alignItems:"center",justifyContent:"center",zIndex:999}}>
          <div style={{background:"#1e293b",borderRadius:16,padding:24,width:520,
            maxHeight:"75vh",overflow:"auto",border:"1px solid #334155",animation:"fi .2s"}}>
            <div style={{fontWeight:700,fontSize:15,color:"#f1f5f9",marginBottom:2}}>📋 Activity Log — {logModal.page.id}</div>
            <div style={{fontSize:13,color:"#64748b",marginBottom:14}}>{logModal.page.title}</div>
            {logModal.task.notes&&(
              <div style={{background:"#0f172a",borderRadius:8,padding:12,marginBottom:14,borderLeft:"3px solid #6366f1"}}>
                <div style={{fontSize:10,color:"#6366f1",marginBottom:4,fontWeight:700,letterSpacing:"0.1em"}}>NOTES</div>
                <div style={{fontSize:13,color:"#94a3b8"}}>{logModal.task.notes}</div>
              </div>
            )}
            {!(logModal.task.log||[]).length?(
              <div style={{textAlign:"center",color:"#64748b",padding:"20px 0",fontSize:13}}>Koi activity nahi hua abhi tak</div>
            ):(
              [...(logModal.task.log||[])].reverse().map((e,i)=>(
                <div key={i} style={{borderLeft:"2px solid #334155",paddingLeft:14,marginBottom:14}}>
                  <div style={{fontSize:11,color:"#475569",marginBottom:4}}>{new Date(e.date).toLocaleString()}</div>
                  {e.changes.map((c,j)=><div key={j} style={{fontSize:13,color:"#a3e635"}}>• {c}</div>)}
                </div>
              ))
            )}
            <button onClick={()=>setLogM(null)}
              style={{marginTop:12,padding:"8px 20px",background:"#334155",color:"#94a3b8",
                border:"none",borderRadius:8,cursor:"pointer",width:"100%",fontWeight:600}}>Close</button>
          </div>
        </div>
      )}

      <Toast msg={toast}/>
    </div>
  );
}
