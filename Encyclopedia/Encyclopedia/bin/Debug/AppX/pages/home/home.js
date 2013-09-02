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

        //    var dataTransferManager = Windows.ApplicationModel.DataTransfer.DataTransferManager.getForCurrentView();

           
        //    var shareHtmlHandler = function (e) {
        //        var request = e.request;
        //        request.data.properties.title = "Shared Html";
        //        request.data.properties.description = "Shared Html";
        //        var localImage = "ms-appx:///images/logo.png";
        //        var htmlExample = "<p>Here is a local image: <img src=\"" + localImage + "\">.</p>";
        //        var htmlFormat =
        //            Windows.ApplicationModel.DataTransfer.HtmlFormatHelper.createHtmlFormat(htmlExample);
        //        request.data.setHtmlFormat(htmlFormat);
        //        var streamRef = Windows.Storage.Streams.RandomAccessStreamReference.createFromUri(
        //            new Windows.Foundation.Uri(localImage));
        //        request.data.resourceMap[localImage] = streamRef;
        //    };

        //    dataTransferManager.addEventListener("datarequested", shareHtmlHandler);
        }
    });
})();
