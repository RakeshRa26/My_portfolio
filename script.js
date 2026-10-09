const menuBtn=document.getElementById("menuBtn");
const nav=document.getElementById("nav");
const themeBtn=document.getElementById("themeBtn");

menuBtn.addEventListener("click",()=>{
  nav.classList.toggle("open");
  menuBtn.textContent=nav.classList.contains("open")?"✕":"☰";
});

document.querySelectorAll("#nav a").forEach(a=>{
  a.addEventListener("click",()=>{
    nav.classList.remove("open");
    menuBtn.textContent="☰";
  });
});

themeBtn.addEventListener("click",()=>{
  document.body.classList.toggle("light");
  localStorage.setItem("theme",document.body.classList.contains("light")?"light":"dark");
});

if(localStorage.getItem("theme")==="light") document.body.classList.add("light");

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting) entry.target.classList.add("visible");
  });
},{threshold:.08});

document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const sections=document.querySelectorAll("main section[id]");
const links=document.querySelectorAll("#nav a");

window.addEventListener("scroll",()=>{
  let current="home";
  sections.forEach(section=>{
    if(window.scrollY>=section.offsetTop-180) current=section.id;
  });
  links.forEach(link=>link.classList.toggle("active",link.getAttribute("href")==="#"+current));
});

document.getElementById("contactForm").addEventListener("submit",e=>{
  e.preventDefault();
  const name=e.target.name.value.trim();
  document.getElementById("status").textContent=`Thank you ${name||"there"}! Your message has been received.`;
  e.target.reset();
});
