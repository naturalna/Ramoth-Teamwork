(function () {
    var showListViewInvokedItem = function (event) {
        event.detail.itemPromise.then(function (item) {
            var articleData = item.data;
            var pageHolder = document.getElementById("favoritePage-holder");
            if (pageHolder != null) {
                pageHolder.innerHTML = "";
            }
            
            WinJS.UI.Pages.render("/pages/details/details.html", pageHolder, {
                articleDescription: articleData,
            });
        }, function (error) {
            var msg = new Windows.UI.Popups.MessageDialog("An error has occurred. Pleace try again later.");
            msg.showAsync();
        });
    }

    WinJS.Utilities.markSupportedForProcessing(showListViewInvokedItem);

    WinJS.Namespace.define("CodeBehind", {
        showListViewInvokedItem: showListViewInvokedItem,
    })
})();