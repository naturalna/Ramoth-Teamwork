(function () {
    var showListViewInvokedItem = function (event) {
        event.detail.itemPromise.then(function (item) {
            var articleData = item.data;
            var pageHolder = document.getElementById("searchPage-holder");
            if (pageHolder != null) {
                pageHolder.innerHTML = "";
            }
            
            WinJS.UI.Pages.render("/pages/details/details.html", pageHolder, {
                articleDescription: articleData,
            });
        });
    }

    WinJS.Utilities.markSupportedForProcessing(showListViewInvokedItem);

    WinJS.Namespace.define("CodeBehind", {
        showListViewInvokedItem: showListViewInvokedItem,
    })
})();