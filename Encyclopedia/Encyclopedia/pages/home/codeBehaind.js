(function () {

    var goToPage = function (pageIndex) {
        WinJS.Navigation.navigate("/pages/fish/fish.html", {
            pageIndex: pageIndex
        });
    }

    var showListViewInvokedItem = function (event) {
        event.detail.itemPromise.then(function (item) {
            var articleData = item.data;
            WinJS.Navigation.navigate("/pages/details/details.html", {
                articleId: articleData.id,
            });
        });
    }

    var selectAfterTermination = function (object) {
        lView = document.getElementById("listView").winControl;
        var forSelect = [];

        for (var j = 0; j < object.length; j++) {
            for (var i = 0; i < lView.itemDataSource.list.length; i++) {
                var current = lView.itemDataSource.list.getItem(i);
                if (current.data.id == object[j].id) {
                    forSelect.push(i);
                }
            }
        }
        lView.selection.add(forSelect);
    };

    WinJS.Utilities.markSupportedForProcessing(goToPage);
    WinJS.Utilities.markSupportedForProcessing(showListViewInvokedItem);

    WinJS.Namespace.define("HomeCodeBehind", {
        callLoadFishesHomePage: function () {
            ViewModels.loadFish();
        },

        goToPage: goToPage,
        showListViewInvokedItem: showListViewInvokedItem,
        selectAfterTermination: selectAfterTermination,
    })
})();