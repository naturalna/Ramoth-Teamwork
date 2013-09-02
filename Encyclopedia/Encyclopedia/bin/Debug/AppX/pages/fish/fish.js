// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/fish/fish.html", {
        ready: function (element, options) {
            // TODO: Initialize the page here.
            var pageIndex = options.pageIndex;
            var nextPageIndex = pageIndex + 1;
            
            ViewModels.loadPart(options.pageIndex).then(function () {
                WinJS.UI.processAll().then(function () {
                    var listv = document.getElementById("listView").winControl;
                   
                    var bindingList = ViewModels.allPagesDynamicList[pageIndex];

                    listv.itemDataSource = bindingList.dataSource;
                    //termination
                    var session = Session.getAfterTerminationObject();
                    if (session.length > 0) {
                        CodeBehind.selectAfterTermination(session);
                        Session.setAfterTerminationObject([]);
                    }
                    //---------
                    var button = document.getElementById("click").addEventListener("click", function () {
                        CodeBehind.goToPage(nextPageIndex);
                    });
                });
            }, function (error) {
                var msg = new Windows.UI.Popups.MessageDialog("Pleace try again later.");
                msg.showAsync();
            });

            
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        updateLayout: function (element, viewState, lastViewState) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in viewState.
        }
    });
})();
