/* ===== EGEL · chrome compartido (nav sólida, menú móvil, reveals, año) ===== */
(function(){
  'use strict';
  var yy = document.getElementById('yy');
  if(yy) yy.textContent = new Date().getFullYear();

  var nav = document.querySelector('.nav');
  if(nav){
    var onScroll = function(){ nav.classList.toggle('scrolled', window.scrollY > 40); };
    addEventListener('scroll', onScroll, {passive:true});
    onScroll();

    var btn = document.querySelector('.menu-btn');
    if(btn){
      var close = function(){ nav.classList.remove('open'); btn.setAttribute('aria-expanded','false'); };
      btn.addEventListener('click', function(){
        var open = nav.classList.toggle('open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      document.addEventListener('click', function(e){ if(nav.classList.contains('open') && !nav.contains(e.target)) close(); });
      document.addEventListener('keydown', function(e){ if(e.key === 'Escape') close(); });
      addEventListener('resize', close);
    }
  }

  var rvs = document.querySelectorAll('.rv');
  var mReduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(mReduce || !('IntersectionObserver' in window)){
    rvs.forEach(function(el){ el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, {threshold:0, rootMargin:'0px 0px -8% 0px'});
  rvs.forEach(function(el){ io.observe(el); });
})();
