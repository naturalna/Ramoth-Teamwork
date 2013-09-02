(function () {

    var goToPage = function (pageIndex) {
        WinJS.Navigation.navigate("/pages/fish/fish.html", {
            pageIndex: pageIndex
        });
    }

    var showListViewInvokedItem = function (event) {

        //var triggeringListView = event.srcElement.winControl;

        event.detail.itemPromise.then(function (item) {
            var articleData = item.data;

            WinJS.Navigation.navigate("/pages/details/details.html", {
                articleId: articleData.id,
            });
        });
    }

    WinJS.Utilities.markSupportedForProcessing(goToPage);
    WinJS.Utilities.markSupportedForProcessing(showListViewInvokedItem);

    WinJS.Namespace.define("HomeCodeBehind", {
        callLoadFishesHomePage: function () {
            ViewModels.loadFish().then(
                function () { },
                function (error) {
                    var msg = new Windows.UI.Popups.MessageDialog("Pleace try again later.");
                    msg.showAsync();
                });
        },

        goToPage: goToPage,
        showListViewInvokedItem: showListViewInvokedItem,
    })
})();