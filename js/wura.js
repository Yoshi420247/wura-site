/* WURA shared interactions */
(function(){
  /* reveal + hairline */
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.14,rootMargin:'0px 0px -8% 0px'});
  document.querySelectorAll('.reveal,.hairline').forEach(function(el){io.observe(el);});

  /* progressive "develop": trigger on view and on image load */
  var dio=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){setTimeout(function(){e.target.classList.add('developed');},100);dio.unobserve(e.target);}});},{threshold:.08});
  document.querySelectorAll('.ph.develop').forEach(function(el){
    dio.observe(el);
    var img=el.querySelector('img');
    if(img){ if(img.complete) el.classList.add('ready'); else img.addEventListener('load',function(){el.classList.add('ready');}); }
  });

  /* seal stamp */
  var sio=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('stamp-in');sio.unobserve(e.target);}});},{threshold:.5});
  document.querySelectorAll('.float-seal,.card-seal,.vbadge,.trust-strip .seal').forEach(function(el){sio.observe(el);});

  /* nav scroll + sticky buy bar */
  var nav=document.querySelector('header.nav'),buybar=document.getElementById('buybar');
  window.addEventListener('scroll',function(){
    if(nav) nav.classList.toggle('scrolled',window.scrollY>10);
    if(buybar){
      var show=window.scrollY>520 && (window.innerHeight+window.scrollY) < (document.body.offsetHeight-280);
      buybar.classList.toggle('show',show);
    }
  },{passive:true});

  /* mobile drawer */
  var drawer=document.getElementById('drawer'),menuBtn=document.getElementById('menuBtn');
  if(menuBtn) menuBtn.onclick=function(){drawer.classList.add('open');};
  if(drawer) drawer.onclick=function(e){if(e.target===drawer||e.target.tagName==='A')drawer.classList.remove('open');};

  /* toast */
  var toast=document.getElementById('toast');
  window.wuraToast=function(msg){ if(!toast)return; toast.querySelector('span').textContent=msg; toast.classList.add('show'); clearTimeout(window._wt); window._wt=setTimeout(function(){toast.classList.remove('show');},2300); };

  /* saved (hearts) */
  var saved=0,savedCount=document.getElementById('savedCount');
  document.querySelectorAll('.heart').forEach(function(h){h.onclick=function(e){e.preventDefault();h.classList.toggle('on');saved+=h.classList.contains('on')?1:-1;if(savedCount){savedCount.textContent=saved;savedCount.style.display=saved>0?'grid':'none';}wuraToast(h.classList.contains('on')?'Saved to your looks':'Removed');};});

  /* cart / buy / book */
  var cart=parseInt((document.getElementById('cartCount')||{}).textContent||'0',10),cartCount=document.getElementById('cartCount');
  window.wuraAdd=function(){cart++;if(cartCount)cartCount.textContent=cart;wuraToast('Added. Your payment stays protected until you confirm.');};
  document.querySelectorAll('[data-buy]').forEach(function(b){b.addEventListener('click',function(e){e.preventDefault();wuraAdd();});});
  document.querySelectorAll('[data-book]').forEach(function(b){b.addEventListener('click',function(e){e.preventDefault();wuraToast('Opening booking. Your deposit stays protected.');});});
  document.querySelectorAll('[data-release]').forEach(function(b){b.addEventListener('click',function(e){e.preventDefault();wuraToast('Held safely by Wura ✦');});});

  /* currency toggle */
  document.querySelectorAll('.cur-toggle button').forEach(function(b){b.onclick=function(){
    document.querySelectorAll('.cur-toggle button').forEach(function(x){x.classList.remove('on');});
    b.classList.add('on');var cur=b.dataset.cur;
    document.querySelectorAll('[data-ngn]').forEach(function(el){el.textContent=cur==='USD'?el.dataset.usd:el.dataset.ngn;});
  };});

  /* PDP gallery */
  var main=document.getElementById('galMain');
  document.querySelectorAll('.thumbs .ph').forEach(function(t){t.onclick=function(){
    if(!main)return;var src=t.querySelector('img').getAttribute('src');
    main.querySelector('img').setAttribute('src',src);
    document.querySelectorAll('.thumbs .ph').forEach(function(x){x.classList.remove('sel');});t.classList.add('sel');
  };});

  /* calendar + slots (booking pages) */
  document.querySelectorAll('.cal .d:not(.off)').forEach(function(d){d.onclick=function(){document.querySelectorAll('.cal .d').forEach(function(x){x.classList.remove('sel');});d.classList.add('sel');};});
  document.querySelectorAll('.slot').forEach(function(s){s.onclick=function(){document.querySelectorAll('.slot').forEach(function(x){x.classList.remove('sel');});s.classList.add('sel');};});

  /* simple filter chips (PLP) */
  document.querySelectorAll('.chip[data-filter]').forEach(function(c){c.onclick=function(){c.classList.toggle('on');};});

  /* newsletter / forms no-op */
  document.querySelectorAll('form[data-noop]').forEach(function(f){f.onsubmit=function(e){e.preventDefault();wuraToast('Welcome to The Edit. Looks worth wanting, in your inbox.');};});

  /* payment method selection */
  document.querySelectorAll('.pay-opt').forEach(function(o){o.onclick=function(){document.querySelectorAll('.pay-opt').forEach(function(x){x.classList.remove('sel');});o.classList.add('sel');};});

  /* remove a cart item */
  document.querySelectorAll('[data-remove]').forEach(function(b){b.onclick=function(e){e.preventDefault();var item=b.closest('.cart-item'); if(item){item.style.transition='opacity .25s';item.style.opacity='0';setTimeout(function(){item.style.display='none';},250);} wuraToast('Removed from your bag');};});

  /* pay (checkout) */
  document.querySelectorAll('[data-pay]').forEach(function(b){b.addEventListener('click',function(e){e.preventDefault();wuraToast('Payment received and held safe. We’ll confirm your order shortly.');});});
})();
