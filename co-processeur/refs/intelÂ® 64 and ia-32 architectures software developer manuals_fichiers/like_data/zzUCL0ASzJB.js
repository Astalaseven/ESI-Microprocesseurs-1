/*!CK:18322413!*//*1378302400,178191165*/

if (self.CavalryLogger) { CavalryLogger.start_js(["B4vuO"]); }

__d("AsyncSignal",["Env","ErrorUtils","QueryString","URI","XHR","copyProperties"],function(a,b,c,d,e,f){var g=b('Env'),h=b('ErrorUtils'),i=b('QueryString'),j=b('URI'),k=b('XHR'),l=b('copyProperties');function m(n,o){this.data=o||{};if(g.tracking_domain&&n.charAt(0)=='/')n=g.tracking_domain+n;this.uri=n;}m.prototype.setHandler=function(n){this.handler=n;return this;};m.prototype.send=function(){var n=this.handler,o=this.data,p=new Image();if(n)p.onload=p.onerror=function(){h.applyWithGuard(n,null,[p.height==1]);};o.asyncSignal=(Math.random()*10000|0)+1;var q=new j(this.uri).isFacebookURI();if(q){l(o,k.getAsyncParams('POST'));}else throw new Error("'"+this.uri+"' "+"is an external URL, you should not send async signals to offsite links.");p.src=i.appendToUrl(this.uri,o);return this;};e.exports=m;});
__d("detect_broken_proxy_cache",["AsyncSignal","Cookie","URI"],function(a,b,c,d,e,f){var g=b('AsyncSignal'),h=b('Cookie'),i=b('URI');function j(k,l){var m=h.get(l);if((m!=k)&&(m!=null)&&(k!='0')){var n={c:'si_detect_broken_proxy_cache',m:l+' '+k+' '+m},o=new i('/common/scribe_endpoint.php').getQualifiedURI().toString();new g(o,n).send();}}e.exports=j;});
__d("legacy:detect-broken-proxy-cache",["detect_broken_proxy_cache"],function(a,b,c,d){a.detect_broken_proxy_cache=b('detect_broken_proxy_cache');},3);
__d("debounceCore",[],function(a,b,c,d,e,f){function g(h,i,j,k){if(!k)k=setTimeout;var l;function m(){var n=Array.prototype.slice.call(arguments,0);m.reset();l=k(function(){h.apply(j,n);},i);}m.reset=function(){clearTimeout(l);};return m;}e.exports=g;});
__d("debounce",["debounceCore"],function(a,b,c,d,e,f){var g=b('debounceCore');function h(i,j,k,l){if(j==null)j=100;var m=function(n,o,p){return setTimeout(n,o,p,!l);};return g(i,j,k,m);}e.exports=h;});
__d("DimensionTracking",["Cookie","DOMDimensions","Event","debounce","isInIframe"],function(a,b,c,d,e,f){var g=b('Cookie'),h=b('DOMDimensions'),i=b('Event'),j=b('debounce'),k=b('isInIframe');function l(){var m=h.getViewportDimensions();g.set('wd',m.width+'x'+m.height);}if(!k()){l.defer(100);i.listen(window,'resize',j(l,250));i.listen(window,'focus',l);}});
__d("HighContrastMode",["AsyncSignal","Cookie","CSS","DOM","Env","Style","emptyFunction"],function(a,b,c,d,e,f){var g=b('AsyncSignal'),h=b('Cookie'),i=b('CSS'),j=b('DOM'),k=b('Env'),l=b('Style'),m=b('emptyFunction'),n={init:function(o){if(window.top!==window.self)return;var p=j.create('div');j.appendContent(document.body,p);p.style.cssText='border: 1px solid;'+'border-color: red green;'+'position: fixed;'+'height: 5px;'+'top: -999px;'+'background-image: url('+o.spacerImage+');';var q=l.get(p,'background-image'),r=l.get(p,'border-top-color'),s=l.get(p,'border-right-color'),t=r==s||(q&&(q=='none'||q=='url(invalid-url:)'));if(t!==o.isHCM){i.conditionClass(document.documentElement,'highContrast',t);if(k.user){h.set('highContrastMode',t?'true':'false');if(t)new g('/ajax/highcontrast').send();}}j.remove(p);n.init=m;}};e.exports=n;});
__d("LinkshimAsyncLink",["$","AsyncSignal","DOM","UserAgent"],function(a,b,c,d,e,f){var g=b('$'),h=b('AsyncSignal'),i=b('DOM'),j=b('UserAgent'),k={swap:function(l,m){var n=j.ie()<=8;if(n){var o=i.create('wbr',{},null);i.appendContent(l,o);}l.href=m;if(n)i.remove(o);},referrer_log:function(l,m,n){var o=g('meta_referrer');o.content="origin";k.swap(l,m);(function(){o.content="default";new h(n,{}).send();}).defer(100);}};e.exports=k;});