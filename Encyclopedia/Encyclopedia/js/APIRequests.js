(function () {

    function getAllFishes(page) {
        if (page != Number) {
            page = 1;
        }
        var queryUrl =
            "http://eol.org/api/search/1.0.json?q=fish&page=" + page + "&exact=false&filter_by_taxon_concept_id=1&filter_by_hierarchy_entry_id=143&filter_by_string=&cache_ttl=";
        WinJS.xhr({
            type: "GET",
            url: queryUrl,
            responseType: "json",
            headers: { "Content-Type": "application/json" }
        }).then(function (data) {
            getFishes(data);
        });
    };
    function getFishData(fishId) {
        var queryForPageDataUrl = " http://eol.org/api/pages/1.0/" + pageId+".json?images=10&videos=10&sounds=0&maps=0&text=10&iucn=false&subjects=overview&licenses=all&details=true&common_names=true&synonyms=true&references=true&vetted=0&cache_ttl=";
        
        WinJS.xhr({
            type: "GET",
            url: queryForPageDataUrl,
            responseType: "json",
            headers: { "Content-Type": "application/json" }
        }).then(function (data) {
            fishData(data);
        });
    };
    function searchForFishes(searchQuery) {
        var queryUrl =
            "http://eol.org/api/search/1.0.json?q=" + searchQuery + "&page=1&exact=false&filter_by_taxon_concept_id=1&filter_by_hierarchy_entry_id=143&filter_by_string=&cache_ttl=";
        WinJS.xhr({
            type: "GET",
            url: queryUrl,
            responseType: "json",
            headers: { "Content-Type": "application/json" }
        }).then(function (data) {
            getFishes(data);
        });
    };
    var fishData = function (data) {
        var parsedData = JSON.parse(data.responseText);

        return parsedData;
    };
    var getFishes = function (data) {
        var parsedData = JSON.parse(data.responseText);

        return parsedData;
    };
    var getProvider = function () {
        var fishProvider = {
            "id": 143,
            "label": "FishBase (Fish Species)"
        }
        var data = JSON.parse(fishProvider.responseText);
        return data;
    };

    var getHierarchies = function () {
        var hierarchies = {
            "title": "FishBase (Fish Species)",
            "contributor": "FishBase",
            "dateSubmitted": "2009-05-19 10:57:05",
            "source": "http://www.fishbase.org/",
            "roots": [
              {
                  "taxonID": 24876515,
                  "parentNameUsageID": 0,
                  "taxonConceptID": 1,
                  "scientificName": "Animalia",
                  "taxonRank": "kingdom"
              }
            ]
        }

        var data = JSON.parse(getHierarchies.responseText);
        return data;
    };
    var queryForFishesSearch = function (page) {
        //json
    };

    WinJS.Namespace.define("APIRequests", {
        getProvider: getProvider,//done
        getHierarchies: getHierarchies,//done        
        getFishesByPage: getAllFishes,//done
        getFishData: getFishData,//done
        queryForFishesSearch: searchForFishes
    });
}());