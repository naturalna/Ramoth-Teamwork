(function () {

    var printManager = Windows.Graphics.Printing.PrintManager.getForCurrentView();
    printManager.onprinttaskrequested = onPrintTaskRequested;

    function onPrintTaskRequested(printEvent) {
        var printTask = printEvent.request.createPrintTask("Print Sample", function (args) {
            var test = MSApp.getHtmlPrintDocumentSource(document)
            args.setSource(test);
            printTask.oncompleted = onPrintTaskCompleted;
        });
    }

    function onPrintTaskCompleted(printTaskCompletionEvent) {
        if (printTaskCompletionEvent.completion === Windows.Graphics.Printing.PrintTaskCompletion.failed) {
            WinJS.log && WinJS.log("Failed to print.", "sample", "error");
        }
    }
})();