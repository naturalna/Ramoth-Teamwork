(function () {
    //here are DTO objects
    //TODO check for more info in json
    var FishModel =
        WinJS.Class.define(function (name, discription, imageURL) {
            this.name = name;
            this.discription = discription;
            this.imageURL = imageURL;
        }, {
            name: "",
            discription: "",
            imageURL: "",
        })

    WinJS.Namespace.define("Models", {
        FishModel: FishModel,
    })
})();