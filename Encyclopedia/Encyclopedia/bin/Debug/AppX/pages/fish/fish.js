// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/fish/fish.html", {
        init: function (element, options) {
            ViewModels.loadPart(options.pageIndex);
        },

        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            var pageIndex = options.pageIndex;
            var nextPageIndex = pageIndex + 1;

            var listv = document.getElementById("listView").winControl;

            var bindingList = new WinJS.Binding.List(ViewModels.allPagesDynamicList[pageIndex]);

            listv.itemDataSource = bindingList.dataSource;
           // WinJS.Binding.processAll(element,
           //ViewModels.allPagesDynamicList[pageIndex]);

            var button = document.getElementById("click").addEventListener("click", function () {
                CodeBehind.goToPage(nextPageIndex);
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
