(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/home/home.html", {
        init: function (element, options) {
            //teglq ot viewmodela
            HomeCodeBehind.callLoadFishesHomePage(1);
        },
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            //load the home page and we will have fishcollection
            var button = document.getElementById("nextPage").addEventListener("click",
                function (event) {
                    HomeCodeBehind.goToPage(2);
                });
        }
    });
})();
