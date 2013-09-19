(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/home/home.html", {
        init: function (element, options) {
        },
        ready: function (element, options) {
            if (options == undefined) {
                options = { pageIndex: 1 };
            }

            var pageIndex = options.pageIndex;
            var nextPageIndex = pageIndex + 1;

            if (pageIndex == 37) {
                nextPageIndex++;
            }

            if (pageIndex == 40) {
                nextPageIndex = 1;
            }

            ViewModels.loadPart(options.pageIndex).then(function () {
                WinJS.UI.processAll().then(function () {
                    var listv = document.getElementById("listView").winControl;

                    var bindingList = ViewModels.allPagesDynamicList[pageIndex];

                    listv.itemDataSource = bindingList.dataSource;
                    //termination
                    var session = Session.getAfterTerminationObject();
                    if (session.length > 0) {
                        HomeCodeBehind.selectAfterTermination(session);
                        Session.setAfterTerminationObject([]);
                    }
                    //---------
                    document.getElementById("nextPage").addEventListener("click", function () {
                        HomeCodeBehind.goToPage(nextPageIndex);
                    });
                });
            }, function (error) {
                var msg = new Windows.UI.Popups.MessageDialog("An error has occurred. Pleace try again later.");
                msg.showAsync();
            });
        }
    });
})();
