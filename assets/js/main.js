!function(){setTimeout(function(){document.getElementById("siteNav").className+=" transitioning"},0),function(){var t=document.querySelectorAll(".post-body a"),n=document.getElementById("post-links-list"),e=0,i="";if(t&&n){for(var o=0,a=t.length;o<a;o++){var d=t[o],c=d.href;c&&c.indexOf(window.location.host+window.location.pathname)===-1&&(d.id=d.id||"p-ref-"+e++,i+='<div class="post-link-entry" data-col="M1-2"><a class="post-link" href="'+c+'">'+c.replace(/https?:\/\//,"")+'</a><div>[<a href="#'+d.id+'" title="Jump to context"><span data-icon="up"></span></a>] '+d.title+"</div></div>")}n.innerHTML=i,n.parentNode.style.display="block"}}(),function(){"requestAnimationFrame"in window&&document.getElementById("topLink").addEventListener("click",function(t){var n,e,i=window.pageYOffset,o=0;t.preventDefault();var a=function(t){return t<.5?2*t*t:-1+(4-2*t)*t},d=function(){e=(o+=60)/3e3,i-=i*a(Math.min(1,e)),window.scrollTo(0,Math.floor(i)),i>0&&(n=requestAnimationFrame(d))};n=requestAnimationFrame(d)})}(),function(){document.getElementById("skip").addEventListener("click",function(){var t=document.getElementById("content-start");t.tabIndex=-1,t.focus()})}()}();