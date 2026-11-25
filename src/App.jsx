import { useMemo, useState } from "react";
import { MessageCircle, Moon, Sun, ShoppingBag, Plus, Menu as MenuIcon, X, ArrowLeft } from "lucide-react";
import { catalog } from "./data/catalog";
import { getOrders, saveOrder } from "./utils/createorders.js";
import ServiceCard from "./components/servicecard.jsx";

const money = n => `₹${Number(n).toFixed(2)}`;

export default function App() {
  const [dark, setDark] = useState(true);
  const [offer, setOffer] = useState(true);
  const [screen, setScreen] = useState("home");
  const [service, setService] = useState(catalog[0]);
  const [plan, setPlan] = useState(catalog[0].items[0]);
  const [qty, setQty] = useState(1);
  const [target, setTarget] = useState("");
  const [orders, setOrders] = useState(getOrders());
  const [notice, setNotice] = useState("");
  const total = useMemo(() => plan[1] * qty, [plan, qty]);

  function chooseService(s) { setService(s); setPlan(s.items[0]); setQty(1); setTarget(""); setScreen("plans"); }
  function placeDemoOrder() {
    if (!target.trim()) { setNotice("Please enter your public profile, reel or comment link."); return; }
    const order = { id: "PN" + Date.now().toString().slice(-8), service: service.name, package: plan[0], quantity: qty, target: target.trim(), amount: total, status: "Payment not connected", createdAt: new Date().toLocaleString() };
    const updated = saveOrder(order); setOrders(updated); setNotice("Demo order saved. Live payment is not enabled yet."); setScreen("orders");
  }

  return <div className={dark ? "app dark" : "app light"}>
    <header className="topbar">
      <div className="brand"><span className="brand-mark">P</span><span>MAXX<span className="neon">GROW</span><small>SOCIAL GROWTH STORE</small></span></div>
      <div className="top-actions"><button className="icon-btn" aria-label="Toggle theme" onClick={() => setDark(!dark)}>{dark ? <Sun size={18}/> : <Moon size={18}/>}</button><button className="login-btn" onClick={() => setNotice("Account login will be added in the next version.")}>Login</button></div>
    </header>

    {offer && <div className="offer"><span>✦</span> Diwali offer — extra 10% on all orders! <button aria-label="Dismiss offer" onClick={() => setOffer(false)}><X size={16}/></button></div>}

    <main className="main">
      {screen === "home" && <>
        <section className="hero"><div className="eyebrow">WELCOME TO MAXX GROW</div><h1>Grow your social<br/><span className="gradient-text">presence.</span></h1><p>Simple packages for your social media goals.</p><button className="primary-btn" onClick={() => document.getElementById("services")?.scrollIntoView({behavior:"smooth"})}>Explore services <span>→</span></button><div className="hero-orb orb-one"/><div className="hero-orb orb-two"/></section>
        <section className="comparison"><div className="section-heading"><span>CHOOSE YOUR SERVICE</span><h2>Find your best fit</h2></div><div className="compare-grid">
          <article className="compare-card"><span className="compare-tag">BUDGET OPTION</span><h3>Followers Service</h3><ul><li>Cheap price</li><li>Higher drop rate</li><li>No refill</li><li>Repeat orders may be required</li><li>Best for lower-cost requirements</li></ul></article>
          <article className="compare-card featured"><span className="compare-tag">STABLE OPTION</span><h3>Indian Followers</h3><ul><li>Slightly higher price</li><li>Low drop rate</li><li>Stable service</li><li>Refill available</li><li>Better for long-term use</li></ul></article>
        </div></section>
        <section id="services" className="services"><div className="section-heading"><span>OUR CATALOG</span><h2>Choose a service</h2><p>Tap a card to view available packages.</p></div><div className="service-grid">{catalog.map(s => <ServiceCard key={s.id} service={s} onChoose={chooseService}/>)}</div></section>
        <section className="review"><div className="stars">★★★★★</div><h3>What our customers say</h3><p>“Good quality and fast”</p><small>Rahul · Bhiwani</small><small className="demo-label">Sample review — replace with verified customer feedback</small></section>
      </>}

      {screen === "plans" && <section className="panel">
        <button className="back-btn" onClick={() => setScreen("home")}><ArrowLeft size={16}/> Back to services</button>
        <div className="section-heading left"><span>SELECT PACKAGE</span><h2>{service.name}</h2>{service.note && <p>{service.note}</p>}</div>
        <div className="plan-grid">{service.items.map((item, i) => <button key={i} className={`plan ${plan === item ? "selected" : ""}`} onClick={() => {setPlan(item);setQty(1);}}><b>{item[0]}</b><span>{money(item[1])}</span></button>)}</div>
        <div className="order-box"><h3>Order details</h3><label>Quantity multiplier</label><div className="qty-control"><button onClick={() => setQty(Math.max(1, qty-1))}>−</button><strong>{qty}</strong><button onClick={() => setQty(Math.min(100, qty+1))}>+</button></div><label>Target link</label><input value={target} onChange={e => setTarget(e.target.value)} placeholder="Paste public profile / reel / comment link"/><p className="hint">Make sure the account or content is public while processing.</p><div className="summary"><span>Package</span><b>{service.name} · {plan[0]}</b><span>Quantity</span><b>{qty}</b><span>You pay</span><strong>{money(total)}</strong></div><button className="primary-btn full" onClick={placeDemoOrder}>Continue to checkout <span>→</span></button><p className="hint">Demo mode: no payment will be collected.</p></div>
      </section>}

      {screen === "orders" && <section className="panel"><div className="section-heading left"><span>ORDER HISTORY</span><h2>My Orders</h2><p>Orders are stored only in this browser.</p></div>{orders.length === 0 ? <div className="empty"><ShoppingBag size={30}/><h3>No orders yet</h3><p>Your orders will appear here.</p><button className="primary-btn" onClick={() => setScreen("home")}>Create new order</button></div> : <div className="orders-list">{orders.map(o => <article className="order-card" key={o.id}><div className="order-head"><b>{o.id}</b><span className="status">{o.status}</span></div><h3>{o.service}</h3><p>{o.package} units · multiplier {o.quantity}</p><p className="target">{o.target}</p><div className="order-foot"><span>{o.createdAt}</span><b>{money(o.amount)}</b></div><button className="text-btn" onClick={() => {const s=catalog.find(x=>x.name===o.service)||catalog[0];chooseService(s);}}>Order again →</button></article>)}</div>}</section>}

      {screen === "menu" && <section className="panel"><div className="section-heading left"><span>QUICK LINKS</span><h2>Menu</h2></div><button className="menu-row" onClick={() => setScreen("home")}>Home <span>→</span></button><button className="menu-row" onClick={() => setScreen("orders")}>My Orders <span>→</span></button><a className="menu-row" href="https://wa.me/919936903768" target="_blank" rel="noreferrer">WhatsApp Support <span>↗</span></a><p className="hint">Support: +91 99369 03768</p></section>}
    </main>

    {notice && <div className="toast" role="status">{notice}<button onClick={() => setNotice("")}>×</button></div>}
    <a className="whatsapp" href="https://wa.me/919936903768" target="_blank" rel="noreferrer" aria-label="WhatsApp support"><MessageCircle size={22}/></a>
    <nav className="bottom-nav"><button className={screen==="orders"?"active":""} onClick={() => setScreen("orders")}><ShoppingBag size={18}/><span>My Orders</span></button><button className={screen==="home"||screen==="plans"?"active":""} onClick={() => setScreen("home")}><Plus size={20}/><span>New Order</span></button><button className={screen==="menu"?"active":""} onClick={() => setScreen("menu")}><MenuIcon size={18}/><span>Menu</span></button></nav>
    <footer><div className="footer-brand">MAXX<span className="neon">GROW</span></div><div className="trust-row"><span>✦ Secure checkout design</span><span>UPI-ready</span><span>Support</span></div><p>Explore · Services · My Orders · Support</p><a href="https://wa.me/919936903768">WhatsApp Support</a><small>© 2026 Maxxgrow. All rights reserved.</small></footer>
  </div>;
}
