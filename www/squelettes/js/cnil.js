//    Comment me mettre en conformité avec la recommandation "Cookies" de la CNIL ?   // 
//  http://www.cnil.fr/vos-obligations/sites-web-cookies-et-autres-traceurs/outils-et-codes-sources/la-mesure-daudience/ ///
	
	// Remplacez la valeur UA-XXXXXX-Y par l'identifiant analytics de votre site.
gaProperty = 'UA-27471158-1'

// Désactive le tracking si le cookie d’Opt-out existe déjà.

var disableStr = 'ga-disable-' + gaProperty;

if (document.cookie.indexOf('hasConsentopt=false') > -1) {
window[disableStr] = true;
}
else if (document.cookie.indexOf(disableStr+'=true') > -1) {
window[disableStr] = false;
document.cookie = disableStr + '=false;'+ getCookieExpireDate() +' ; path=/';
}
//Cette fonction retourne la date d’expiration du cookie de consentement 

function getCookieExpireDate() { 
 var cookieTimeout = 34214400000;// Le nombre de millisecondes que font 13 mois 
 var date = new Date();
date.setTime(date.getTime()+cookieTimeout);
var expires = "; expires="+date.toGMTString();
return expires;
}

// Cette fonction est appelée pour afficher la demande de consentement
function askConsent(){
    var bodytag = document.getElementsByTagName('body')[0];
    var div = document.createElement('div');
    div.setAttribute('id','cookie-banner');
    div.setAttribute('width','100%');
    // Le code HTML de la demande de consentement
    // Vous pouvez modifier le contenu ainsi que le style
    div.innerHTML =  '<div style="text-align:center" class="container">Ce site utilise Google Analytics.\
    En continuant à naviguer, vous nous autorisez à déposer des cookies à des fins de \
    mesure d\'audience.  </br> \
    <a href="/a-propos/Informations-Legales#cookie">Pour en savoir plus</a>.</div>';
    bodytag.insertBefore(div,bodytag.firstChild); // Ajoute la bannière juste au début de la page
    document.getElementsByTagName('body')[0].className+=' cookiebanner';
}

// Retourne la chaine de caractère correspondant à nom=valeur
function getCookie(NomDuCookie)  {
    if (document.cookie.length > 0) {        
        begin = document.cookie.indexOf(NomDuCookie+"=");
        if (begin != -1)  {
            begin += NomDuCookie.length+1;
            end = document.cookie.indexOf(";", begin);
            if (end == -1) end = document.cookie.length;
            return unescape(document.cookie.substring(begin, end)); 
        }
     }
    return null;
}
   
// Fonction d'effacement des cookies   
function delCookie(name )   {
    path = ";path=" + "/";
    domain = ";domain=" + "."+document.location.hostname;
    var expiration = "Thu, 01-Jan-1970 00:00:01 GMT";       
    document.cookie = name + "=" + path + domain + ";expires=" + expiration;
}
  
// Efface tous les types de cookies utilisés par Google Analytics    
function deleteAnalyticsCookies() {
    var cookieNames = ["__utma","__utmb","__utmc","__utmz","_ga"]
    for (var i=0; i<cookieNames.length; i++)
        delCookie(cookieNames[i])
}
   
// La fonction d'opt-out   
function gaOptout() {
    document.cookie = disableStr + '=true;'+ getCookieExpireDate() +' ; path=/';       
    document.cookie = 'hasConsentopt=false;'+ getCookieExpireDate() +' ; path=/';
    var div = document.getElementById('cookie-banner');
    // Ci dessous le code de la bannière affichée une fois que l'utilisateur s'est opposé au dépôt
    // Vous pouvez modifier le contenu et le style
    if ( div!= null ) div.innerHTML = '<div style="background-color:#eee; padding:1em;"> Vous vous êtes opposé \
    au dépôt de cookies de mesures d\'audience dans votre navigateur </div>'
    window[disableStr] = true;
    deleteAnalyticsCookies();
}

// La fonction d'opt-in
function gaOptin() {
    document.cookie = disableStr + '=false;'+ getCookieExpireDate() +' ; path=/';
    document.cookie = 'hasConsentopt=true;'+ getCookieExpireDate() +' ; path=/';
    var div = document.getElementById('cookie-banner');
    // Ci dessous le code de la bannière affichée une fois que l'utilisateur s'est opposé au dépôt
    // Vous pouvez modifier le contenu et le style
    if ( div!= null ) div.innerHTML = '<div style="background-color:#eee; padding:1em;"> Vous avez accepté \
    le dépôt de cookies de mesures d\'audience dans votre navigateur </div>';
    window[disableStr] = false;
}

//Ce bout de code vérifie que le consentement n'a pas déjà été obtenu avant d'afficher
// la baniére
var consentCookie =  getCookie('hasConsentopt');
if (!consentCookie) {//L'utilisateur n'a pas encore de cookie de consentement
 var referrer_host = document.referrer.split('/')[2]; 
   if ( referrer_host != document.location.hostname ) { //si il vient d'un autre site
   //on désactive le tracking et on affiche la demande de consentement            
     window[disableStr] = true;
     window[disableStr] = true;
     window.onload = askConsent;
   } else { //sinon on lui dépose un cookie 
      document.cookie = 'hasConsentopt=true; '+ getCookieExpireDate() +' ; path=/'; 
   }
}

// Il vous reste à insérer votre tag javascript ici   
$(document).ready(function() {
    if (document.cookie.indexOf('hasConsentopt=true') > -1) {
	var div = document.getElementById('cookie-banner');
        if ( div!= null ) div.innerHTML = '<div style="background-color:#eee; padding:1em;"> Vous avez accepté \
        un cookies de mesures d\'audience dans votre navigateur pour le site de Centre-Inffo.fr</div>';
    }
    else {
	var div = document.getElementById('cookie-banner');
        if ( div!= null ) div.innerHTML = '<div style="background-color:#eee; padding:1em;"> Vous vous êtes opposé \
        au dépôt de cookies de mesures d\'audience dans votre navigateur pour le site de Centre-Inffo.fr</div>';
    }
});

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', gaProperty , 'auto');  // Créer le tracker.
ga('send', 'pageview');             // Envoyer l'information qu'une page a été visitée.
