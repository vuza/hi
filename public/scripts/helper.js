define([], function(){
    return {
        getUrlParam: function(name, url){
            if (!url) url = window.location.href;
            url = url.toLowerCase(); // This is just to avoid case sensitiveness
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        },

        createRoom: function(){
            var id = Math.floor(Math.random() * 100) + 1  ;

            history.pushState(null, null, '?id=' + id);

            return id;
        }
    }
});