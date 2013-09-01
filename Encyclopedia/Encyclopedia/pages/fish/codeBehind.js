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
    var addSelectionToFavorite = function () {
    };

    WinJS.Utilities.markSupportedForProcessing(goToPage);
    WinJS.Utilities.markSupportedForProcessing(showListViewInvokedItem);
    WinJS.Utilities.markSupportedForProcessing(addSelectionToFavorite);

    WinJS.Namespace.define("CodeBehind", {
        //callLoadFishesHomePage: function () {
        //    ViewModels.loadFish();
        //},

        goToPage: goToPage,
        showListViewInvokedItem: showListViewInvokedItem,
        addSelectionToFavorite: addSelectionToFavorite,
    })
})();