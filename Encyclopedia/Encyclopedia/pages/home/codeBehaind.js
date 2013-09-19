(function () {

    var goToPage = function (pageIndex) {
        WinJS.Navigation.navigate("/pages/home/home.html", {
            pageIndex: pageIndex
        });
    }

    var showListViewInvokedItem = function (event) {
        event.detail.itemPromise.then(function (item) {
            var articleData = item.data;
            var pageHolder = document.getElementById("page-holder");
            pageHolder.innerHTML = "";
            WinJS.UI.Pages.render("/pages/details/details.html", pageHolder, {
                articleDescription: articleData,
            });
        }, function (error) {
            var msg = new Windows.UI.Popups.MessageDialog("An error has occurred. Pleace try again later.");
            msg.showAsync();
        });
    }

    var selectAfterTermination = function (object) {
        lView = document.getElementById("listView").winControl;
        var forSelect = [];

        for (var j = 0; j < object.length; j++) {
            for (var i = 0; i < lView.itemDataSource.list.length; i++) {
                var current = lView.itemDataSource.list.getItem(i);
                if (current.data.id == object[j]) {
                    forSelect.push(i);
                }
            }
        }
        lView.selection.add(forSelect);
    };

    WinJS.Utilities.markSupportedForProcessing(goToPage);
    WinJS.Utilities.markSupportedForProcessing(showListViewInvokedItem);

    WinJS.Namespace.define("HomeCodeBehind", {
        goToPage: goToPage,
        showListViewInvokedItem: showListViewInvokedItem,
        selectAfterTermination: selectAfterTermination,
    })
})();