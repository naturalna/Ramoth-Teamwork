(function () {
    var showListViewInvokedItem = function (event) {

        //var triggeringListView = event.srcElement.winControl;

        event.detail.itemPromise.then(function (item) {
            var articleData = item.data;

            WinJS.Navigation.navigate("/pages/details/details.html", {
                articleId: articleData.id,
            });
        });
    }

    WinJS.Utilities.markSupportedForProcessing(showListViewInvokedItem);


    WinJS.Namespace.define("CodeBehind", {

        showListViewInvokedItem: showListViewInvokedItem,
    })
})();