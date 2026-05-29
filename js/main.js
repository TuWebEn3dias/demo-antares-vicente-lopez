(function(){
'use strict';

const navbar=document.getElementById('navbar');
const navToggle=document.getElementById('navToggle');
const navMenu=document.getElementById('navMenu');
const navLinks=document.querySelectorAll('.nav-link');
const form=document.getElementById('reservasForm');
const sections=document.querySelectorAll('.section, .hero');

// Navbar scroll
let lastScroll=0;
window.addEventListener('scroll',function(){
const current=window.scrollY;
if(current>60){navbar.classList.add('scrolled')}
else{navbar.classList.remove('scrolled')}
lastScroll=current;
},{passive:true});

// Mobile toggle
navToggle.addEventListener('click',function(){
navToggle.classList.toggle('active');
navMenu.classList.toggle('active');
});

// Close menu on link click
navLinks.forEach(function(link){
link.addEventListener('click',function(){
navToggle.classList.remove('active');
navMenu.classList.remove('active');
});
});

// Close menu on outside click
document.addEventListener('click',function(e){
if(!navToggle.contains(e.target)&&!navMenu.contains(e.target)){
navToggle.classList.remove('active');
navMenu.classList.remove('active');
}
});

// Intersection Observer for scroll animations
const observerOptions={threshold:0.1,rootMargin:'0px 0px -50px 0px'};
const observer=new IntersectionObserver(function(entries){
entries.forEach(function(entry){
if(entry.isIntersecting){
entry.target.classList.add('visible');
observer.unobserve(entry.target);
}
});
},observerOptions);

sections.forEach(function(section){
section.classList.add('fade-up');
observer.observe(section);
});

// Form → WhatsApp
form.addEventListener('submit',function(e){
e.preventDefault();
const nombre=document.getElementById('nombre').value.trim();
const fecha=document.getElementById('fecha').value;
const personas=document.getElementById('personas').value;
const tel=document.getElementById('tel').value.trim();
const mensaje=document.getElementById('mensaje').value.trim();
const phone='5491147965125';
let text='¡Hola! Quiero hacer una reserva:%0A';
text+='%0A👤 Nombre: '+encodeURIComponent(nombre);
text+='%0A📅 Fecha: '+encodeURIComponent(fecha);
text+='%0A👥 Personas: '+encodeURIComponent(personas);
text+='%0A📞 Tel: '+encodeURIComponent(tel);
if(mensaje){text+='%0A💬 Mensaje: '+encodeURIComponent(mensaje);}
window.open('https://wa.me/'+phone+'?text='+text,'_blank');
});

})();
