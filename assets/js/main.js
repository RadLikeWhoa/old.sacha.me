!function(){setTimeout(function(){document.body.className+="has-transitions"},0),function(){var t=document.querySelectorAll(".post-body a"),e=document.getElementById("post-links-list"),i=0,n="";if(t&&e){for(var s=0,a=t.length;s<a;s++){var o=t[s],r=o.href;r&&r.indexOf(window.location.host+window.location.pathname)===-1&&(o.id=o.id||"p-ref-"+i++,n+='<div class="post-link-entry" data-col="M1-2"><a class="post-link" href="'+r+'">'+r.replace(/https?:\/\//,"")+'</a><div>[<a href="#'+o.id+'" title="Jump to context"><span data-icon="up"></span></a>] '+o.title+"</div></div>")}e.innerHTML=n,e.parentNode.style.display="block"}}(),function(){"requestAnimationFrame"in window&&document.getElementById("topLink").addEventListener("click",function(t){var e,i,n=window.pageYOffset,s=0;t.preventDefault();var a=function(t){return t<.5?2*t*t:-1+(4-2*t)*t},o=function(){i=(s+=60)/3e3,n-=n*a(Math.min(1,i)),window.scrollTo(0,Math.floor(n)),n>0&&(e=requestAnimationFrame(o))};e=requestAnimationFrame(o)})}(),function(){document.getElementById("skip").addEventListener("click",function(){var t=document.getElementById("content-start");t.tabIndex=-1,t.focus()})}(),function(){var t=document.querySelector(".filters");if(t){var e=t.querySelectorAll(".tag"),i=document.querySelectorAll(".post-inline"),n=void 0;Array.prototype.forEach.call(e,function(e){e.addEventListener("click",function(s){s.preventDefault(),t.classList.remove("is-overlaid");var a=document.querySelector(".tag.is-active"),o="right";a&&a.classList.remove("is-active"),n=n===s.target.textContent?void 0:s.target.textContent,n?(e.classList.add("is-active"),t.classList.add("is-filtered")):t.classList.remove("is-filtered"),Array.prototype.forEach.call(i,function(t){t.classList.remove("is-last"),n&&t.getAttribute("data-project-tags").indexOf(n)===-1?(t.classList.add("is-hidden"),t.classList.remove("is-visible")):(t.querySelector("[data-grid]").setAttribute("data-grid","right"===o?"":"rev"),o="right"===o?"left":"right",t.classList.remove("is-hidden"),t.classList.add("is-visible"))});var r=document.querySelectorAll(".is-visible");r[r.length-1].classList.add("is-last")})}),document.querySelector(".filter-toggle").addEventListener("click",function(){t.classList.add("is-overlaid")}),document.querySelector(".filter-shade").addEventListener("click",function(){t.classList.remove("is-overlaid")})}}()}();