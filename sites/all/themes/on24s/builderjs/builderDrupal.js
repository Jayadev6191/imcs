//
// PubSub.js
// @author Dhruba Baishya <dhruba.baishya@on24.com>
// @copyright 2012 ON24 Inc.
//


var PubSub = (function (options, undefined) {

    //
    // Private properties and methods
    //
    // PubSub topic/subscription hash
    var topics = { },


    //
    // Subscription
    // Register a callback on a named topic
    // topic   : Channel to subscribe to
    // callback: Handler event. Anytime something is published on a
    //			 subscribed channel, the callback will be called with the
    //			 published array as ordered arguments.
    // returns : A handle which can be used to unsubscribe this particular
    //			 subscription. return subscription handle will be required
    //			 for unsubscription
    // Usage:
    // var subscription = subscription("/some/topic", function(param){ });
    //
        subscription = function(/* String */topic, /* Function */callback){

            if(!topics[topic]){
                topics[topic] = [];
            }
            topics[topic].push(callback);

            return [topic, callback]; // Array
        },


    //
    // Handlers
    // Hash for keeping various subscriptions handles
    // the one which is returned by subscription method
        handlers = { };


    //
    // Public methods
    //
    return {


        // Publish
        // Channel to publish on
        // args : Data to publish. Each array item is converted into
        //		  an ordered arguments on the subscribed functions.
        // Usage:
        // PubSub.publish("/some/topic", ["a","b","c", { data: [1, 2, 3] }]);
        publish : function(/* String */topic, /* [Array] */args){
            topics[topic] && $.each(topics[topic], function(){
                this.apply(null, args || []);
            });
        },


        //
        // Subscribe
        // Wrapper for actual subscriptions
        // Usage:
        // PubSub.subscribe({
        //	 topic: <String>,
        //	 handle: <String>,
        //	 func: <function>
        // });
        subscribe: function(param){
            if(param && "topic" in param && typeof param.topic === "string"
                && "handle" in param && typeof param.handle === "string"
                && "func" in param && typeof param.func === "function"){

                handlers[param.handle] = subscription(param.topic, param.func);
            }
        },


        //
        // Unsubscribe
        // Disconnect a subscribed function for a topic. Use the return value from
        // subscribe API to unsubscribe a broadcast from a channel.
        // Usage:
        //  PubSub.unsubscribe(handle);
        unsubscribe : function(/*String*/handle){
            if(handle in handlers){
                var topicx = handlers[handle][0],
                    funcx  = handlers[handle][1];

                topics[topicx] && $.each(topics[topicx], function(idx){
                    if(this == funcx){
                        topics[topicx].splice(idx, 1);
                    }
                });

            }
        }


    };


})({});


/**
 * jQuery On24 Utils for Builder Plugin
 *
 * @author Alberto Perez  <alberto.perez@on24.com>
 * @copyright 2014 ON24 Inc.
 */
var On24Util = (function (options, undefined) {

    //
    // Public methods
    //
    return {

        /**
         * find all nodes with provider datakey under the "container"
         * @param container
         * @param dataKey
         * @return {*|jQuery}
         */
        findByData : function (container, dataKey) {
            return $(container).find("[" + dataKey + "]");
        },


        /**
         * return all childs and subChilds for the $node
         * @param $node
         * @return {Array}
         */
        getRecursiveChildren : function ($node) {
            var a = [];
            function recursiveIterate($node) {
                a.push($node);
                $node.children().each(function() {
                    a.push(this);
                    recursiveIterate($(this));
                });
            }
            recursiveIterate($node);
            return a;
        },

        /**
         * get current location path
         * @return {*}
         */
        getLocation : function () {
            return window.location;
        },

        /**
         * return selected segment for the pathname attribute
         * @param seg
         * @return {*}
         */
        segment : function( seg ) {
            var urlParts = window.location.pathname.split("/");

            return urlParts[seg];
        },

        /**
         * return actual url parameters
         * @param seg
         * @return {*}
         */
        getParameters : function () {
            return window.location.search;
        },



        getParameterByName : function (sParam) {
            var sPageURL = window.location.search.substring(1);
            var sURLVariables = sPageURL.split('&');
            var value = "",
                i = 0,
                found = false;
            while (!found  && i < sURLVariables.length) {
                var sParameterName = sURLVariables[i].split('=');
                if (sParameterName[0] == sParam){
                    value = sParameterName[1];
                    found = true;
                }
                i++;
            }
            return value;
        },


        getPartnerref : function(partnerrefName) {
            var value = On24Util.getParameterByName(partnerrefName),
                parameters = window.location.search;

            if (value == "") {
                console.log("There is not a " + partnerrefName + " parameter into the url");
            }

            return value;
        },

        /**
         * return actual url host
         * @return {*}
         */
        getHost : function () {
            return window.location.host;
        },


        /**
         * return list of categories
         * @param categories
         * @param model
         * @param parentCategoryId
         * @return {String}
         */
        getCategoryStr : function (categories, list) {
            var str = "";

            var categoryMap = {};
            if (categories && list) {
                $.each(categories, function (index, item) {
                    categoryMap[item.id] = item;
                });

                for (var i= 0; i < list.length; i++) {
                    if (categoryMap[list[i]] != null) {
                        if (str != "") {
                            str += ", ";
                        }
                        str += categoryMap[list[i]].title.toUpperCase();
                    }
                }

            }

            return str;
        },

        isParentCategory : function (categories, categoryTypeId, categoryUrlId) {
            var categoryMap = {};
            if (categories) {
                $.each(categories, function (index, item) {
                    categoryMap[item.id] = item;
                });

                return categoryMap[categoryUrlId].parentId == categoryTypeId;
            } else {
                return false;            }

        },



        checkImage : function (path) {
            return  $.ajax({
                type:       "HEAD",
                url:        path,
                async:      false
            });

        },

        setLink : function (prefix, $item) {
            var link = $item.attr("href");
            if (link && link.indexOf(On24Util.getHost()) > -1
                || $item.data(prefix + "-keep-parameters") == true) {

                var parameters = On24Util.getParameters();
                if (parameters != "") {
                    link = link +  parameters;
                }
                $item.attr("href", link);
            }
        }

    };
})({});



/**
 * jQuery On24 Utils for Builder Plugin
 *
 * @author Alberto Perez  <alberto.perez@on24.com>
 * @copyright 2014 ON24 Inc.
 */
var On24Filter = (function (options, undefined) {

    //
    // Public methods
    //
    return {

        filterByText : function (fields, filterValue, item, matched) {
            $.each(fields, function (index, attr) {
                if (attr == "assetTypeId" || attr == "interestAreas" || attr == "journeys" || attr == "solutions") {
                    var idList = item[attr].split(",");
                    var text = "";
                    if (attr == "assetTypeId" ) {
                        text = On24Util.getCategoryStr(On24Store.getStore().assets, idList);
                    }else if (attr == "interestAreas" ) {
                        text = On24Util.getCategoryStr(On24Store.getStore().interestareas, idList);
                    }else if (attr == "journeys" ) {
                        text = On24Util.getCategoryStr(On24Store.getStore().journeys, idList);
                    }else if (attr == "solutions" ) {
                        text = On24Util.getCategoryStr(On24Store.getStore().solutions, idList);
                    }
                    matched = matched || text.toLowerCase().indexOf(filterValue.toLowerCase()) > -1;
                } else if ($.type( item[attr] ) === "string") {
                    matched = matched || item[attr].toLowerCase().indexOf(filterValue.toLowerCase()) > -1;
                } if ($.type( item[attr] ) === "array") {
                    matched=  ($.inArray(filterValue, item[attr]) > -1) || matched;
                } else  if ($.type( item[attr] ) === "number"){
                    matched=  (item[attr] == filterValue) || matched;
                }
            });

            return matched;
        },


        filterByCategory : function (fields, filterValue, item, matched, preserve) {

            $.each(fields, function (index, attr) {
                if ($.type( item[attr] ) === "string") {
                    if (item[attr].toLowerCase().indexOf(filterValue.toString().toLowerCase()) > -1) {
                        if (preserve === true) {
                            matched = matched && true;
                        } else {
                            matched = true;
                        }
                    } else {
                        matched = false;
                    }
                } if ($.type( item[attr] ) === "array") {
                    if ($.inArray(filterValue, item[attr]) > -1) {
                        if (preserve === true) {
                            matched = matched && true;
                        } else {
                            matched = true;
                        }
                    } else {
                        matched = false;
                    }
                } else  if ($.type( item[attr] ) === "number"){
                    if ((item[attr] == filterValue)) {
                        if (preserve === true) {
                            matched = matched && true;
                        } else {
                            matched = true;
                        }
                    } else {
                        matched = false;
                    }
                }
            });

            return matched;
        }


    };
})({});


/**
 * jQuery On24 Store for Builder Plugin
 *
 * @author Alberto Perez  <alberto.perez@on24.com>
 * @copyright 2014 ON24 Inc.
 */
var On24Store= (function (options, undefined) {

    //
    // Private properties and methods
    //
    var _apiCache = {},
        store = {},
        loadedCategories = [],
        actualSort;



    function  addAPICache (serviceURL, dfd, loading) {
        _apiCache[serviceURL] = {
            url : serviceURL,
            loading : loading,
            dfd : dfd
        };
    };


    function isURLinCache (url) {
        var found = false;

        if (url != "" &&_apiCache[url] != null) {
            found = true;
            if (_apiCache[url].loading === true) {
                console.log("It's loading");
                found = false;
            }
        }
        if (url === "") {
            found = true;
        }

        return found;
    };


    function addIntoStore  (models, modelName) {

        if (!store[modelName]) {
            store[modelName] = [];
        }
        if ($.isArray(models)) {
            //TODO: Performance issue: improve merge
            var found = false;
            for (var i = 0; i < models.length; i++) {
                found = false;
                for (var j = 0; j < store[modelName].length; j++) {
                    if (models[i].id > 0) {
                        if (models[i].id == store[modelName][j].id) {
                            $.extend(true, store[modelName][j], models[i]);
                            found = true;
                            break;
                        }
                    } else {
                        if (models[i].nodeID == store[modelName][j].nodeID) {
                            $.extend(true, store[modelName][j], models[i]);
                            found = true;
                            break;
                        }

                    }
                }
                if (!found) {
                    store[modelName].push(models[i]);
                }
            }
        } else {
            $.extend(true, store[modelName],[models]);
            return store[modelName][0];
        }

        return store[modelName];

    };



    function getServiceURL (parameters) {
        var serviceURL = parameters.serviceURL,
            action = parameters.action;

        if (serviceURL != undefined) {
            serviceURL = serviceURL;
        } else {
            serviceURL = action.url;
        }

        return serviceURL;
    };


    //
    // Public methods
    //
    return {
        //methods for Store

        getStore : function () {
            return store;
        },

        findByIdsList:function (list, type, models) {
            if (!models) {
                models  = store[type];
            }
            var foundedModels = [];

            if (models != null) {
                $.each( models, function (index, item) {
                    if ($.inArray(item.id, list) > -1) {
                        foundedModels.push($.extend(true, {}, item));
                    }
                });
            } else {
                console.log("model of " + type + " is null")
            }

            return foundedModels;
        },


        findById : function (parameters) {
            var dfd = $.Deferred(),
                action = parameters.action,
                serviceURL = action.url,
                models,
                type = parameters.type,
                found = false,
                i = 0;

            if (isURLinCache(serviceURL)) {
                models = store[type];

                while (!found && i < models.length) {
                    if (models[i].id == parameters.externalId) {
                        found = true;
                    } else{
                        i++;
                    }
                }
                if (found) {
                    dfd.resolve(models[i]);
                } else {
                    dfd.resolve(models);
                }

            } else {
                //add loading API
                addAPICache(serviceURL, dfd, true);



                $.ajax({
                    url:            serviceURL,
                    dataType :      action.dataType,
                    contentType :   action.contentType,
                    type:           action.type,
                    success:        function(data) {
                        //add loaded API
                        addAPICache(serviceURL, dfd, false);

                        //check response param name
                        if (action.paramName ) {
                            models = data[action.paramName]
                        } else {
                            models = data;
                        }

                        models = addIntoStore(models, action.modelName);

                        while (!found && i < models.length) {
                            if (models[i].id == parameters.externalId) {
                                found = true;
                            } else{
                                i++;
                            }
                        }
                        if (found) {
                            dfd.resolve(models[i]);
                        } else {
                            dfd.resolve(models);
                        }
                    }
                });
            }

            return dfd;
        },

        findPaginatedByType : function (parameters) {
            var dfd = $.Deferred(),
                models = [],
                action = parameters.action,
                size = parameters.pageSize || action.offset,
                pageNumber = parameters.pageNumber,
                serviceURL = parameters.url,
                selectedFilters = parameters.selectedFilters;

            if (action.loadingView) {
                $(action.loadingView).show();
            }


            var info = {
                serviceURL      : serviceURL,
                action          : action,
                selectedFilters : selectedFilters,
                type            : action.modelName,
                settings        : parameters.settings
            };

            serviceURL = getServiceURL(info);

            if (isURLinCache(serviceURL)) {
                models = store[action.modelName];

                models = On24Store.filterData(action, selectedFilters, action.modelName, null, null, models);

                if (actualSort) {
                    models = On24Store.sortDataModels(models, actualSort);
                }

                if (action.loadingView) {
                    $(action.loadingView).hide();
                }

                if (!size) {
                    dfd.resolve(models, action);
                } else {
                    dfd.resolve(models.slice(pageNumber * size, (pageNumber + 1) * size), action);
                }

            } else {
                addAPICache(serviceURL, dfd, true);


                $.ajax({
                    url: serviceURL,
                    dataType: action.dataType,
                    type: action.type,
                    success: function(data) {

                        if (action.paramName ) {
                            models = [];
                            $.each(data[action.paramName], function (index, item) {
                                models.push(item);
                            });
                            //models = data[action.paramName]
                        } else {
                            models = data;
                        }
                        models = addIntoStore(models, action.modelName);
                        addAPICache(serviceURL, dfd, false);


                        if (action.loadingView) {
                            $(action.loadingView).hide();
                        }

                        if ($.isArray(models)) {
                            models = On24Store.filterData(action, selectedFilters, action.modelName, null, null, models);

                            if (actualSort) {
                                models = On24Store.sortDataModels(models, actualSort);
                            }
                            if (!size) {
                                dfd.resolve(models, action);
                            } else {
                                dfd.resolve(models.slice(pageNumber * size, (pageNumber + 1) * size), action);
                            }

                        } else {
                            dfd.resolve(models, action);
                        }
                    },
                    error: function (error) {
                        //in Windows environment, we get an error. For preventing error, try:

                        var dataInfo = JSON.parse($.trim(error.responseText));

                        if (dataInfo) {
                            if (action.paramName ) {
                                models = [];
                                $.each(dataInfo[action.paramName], function (index, item) {
                                    models.push(item);
                                });
                                //models = data[action.paramName]
                            } else {
                                models = dataInfo;
                            }
                            models = addIntoStore(models, action.modelName);
                            addAPICache(serviceURL, dfd, false);


                            if (action.loadingView) {
                                $(action.loadingView).hide();
                            }

                            if ($.isArray(models)) {
                                models = On24Store.filterData(action, selectedFilters, action.modelName, null, null, models);

                                if (actualSort) {
                                    models = On24Store.sortDataModels(models, actualSort);
                                }
                                if (!size) {
                                    dfd.resolve(models, action);
                                } else {
                                    dfd.resolve(models.slice(pageNumber * size, (pageNumber + 1) * size), action);
                                }

                            } else {
                                dfd.resolve(models, action);
                            }
                        }


                        console.log("error");
                    }
                });
            }

            return dfd;
        },


        filterData : function (action, selectedFilters, type, parent, node, data) {
            var items,
                fields,
                filterValue,
                matched;
            if ($.isArray(data)) {
                items = data.slice();

                //TODO: move filter logic to other javascript package to allow filter any kind of structure.
                if (selectedFilters && selectedFilters[type]) {



                    items = $.grep(items, function (item, index) {
                        matched = false;
                        if (selectedFilters[type]["searchString"]) {
                            fields = selectedFilters[type]["searchString"].fields;
                            filterValue = selectedFilters[type]["searchString"].value;

                            matched = On24Filter.filterByText(fields, filterValue, item, matched);
                        } else {
                            matched = true;
                        }


                        if (matched == true) {

                            if (selectedFilters[type]["interestAreaFilter"] && selectedFilters[type]["interestAreaFilter"].length > 0) {
                                //if exists any role filter, match scenarios, if not, return all content under the page
                                matched = false;
                                $.each(selectedFilters[type]["interestAreaFilter"], function (index, filterField) {
                                    fields = filterField.fields;
                                    filterValue =filterField.value;

                                    matched = On24Filter.filterByCategory(fields, filterValue, item, matched, false);
                                });
                            }
                        }

                        if (matched == true) {

                            if (selectedFilters[type]["roleFilter"] && selectedFilters[type]["roleFilter"].length > 0) {
                                //if exists any role filter, match scenarios, if not, return all content under the page
                                matched = false;
                                $.each(selectedFilters[type]["roleFilter"], function (index, filterField) {
                                    fields = filterField.fields;
                                    filterValue =filterField.value;

                                    matched = On24Filter.filterByCategory(fields, filterValue, item, matched, false);
                                });
                            }
                        }

                        if (matched == true) {
                            if (selectedFilters[type]["assetFilter"] && selectedFilters[type]["assetFilter"].length > 0) {
                                //matched = false;
                                $.each(selectedFilters[type]["assetFilter"], function (index, filterField) {
                                    fields = filterField.fields;
                                    filterValue =filterField.value;

                                    matched = On24Filter.filterByCategory(fields, filterValue, item, matched, true);
                                });
                            }
                        }

                        if (matched == true) {
                            if (selectedFilters[type]["solutionFilter"] && selectedFilters[type]["solutionFilter"].length > 0) {
                                //matched = false;
                                $.each(selectedFilters[type]["solutionFilter"], function (index, filterField) {
                                    fields = filterField.fields;
                                    filterValue =filterField.value;

                                    matched = On24Filter.filterByCategory(fields, filterValue, item, matched, true);
                                });
                            }
                        }

                        return matched;
                    });
                }

            } else {
                items = [data];
            }

            return items;
        },





        getItems : function(parameters ) {
            var dfd = $.Deferred(),
                items,
                models,
                serviceURL = "",
                action  = parameters.action,
                type = parameters.type,
                parent = parameters.parent,
                node = parameters.node,
                selectedFilters = parameters.selectedFilters,
                data = parameters.data;

            if (!data) {

                var info = {
                    serviceURL      : serviceURL,
                    action          : action,
                    selectedFilters : selectedFilters,
                    type            : type,
                    settings        : parameters.settings
                };


                serviceURL = getServiceURL(info);

                if (!isURLinCache(serviceURL)) {
                    addAPICache(serviceURL, dfd, true);
                    $.ajax({
                        url:            serviceURL,
                        dataType:       action.dataType,
                        contentType:    action.contentType,
                        type:           action.type,
                        success: function(data) {
                            if (action.paramName ) {
                                models = data[action.paramName]
                            } else {
                                models = data;
                            }

                            models = addIntoStore(models, action.modelName);
                            addAPICache(serviceURL, dfd, false);

                            items = On24Store.filterData(action, selectedFilters, type, parent, node, data);

                            dfd.resolve(items[0].data);
                        }
                    });
                } else {
                    data = store[type];
                    dfd.resolve(On24Store.filterData(action, selectedFilters, type, parent, node, data));
                }

            } else {
                dfd.resolve(On24Store.filterData(action, selectedFilters, type, parent, node, data));
            }

            return dfd;
        },


        sortDataModels : function(items, data) {
            //sort models
            actualSort = data;

            var filterType = data.split(":")[0];
            var filterField = data.split(":")[1];
            function SortByName(a, b){
                var aName = a[filterField].toLowerCase();
                var bName = b[filterField].toLowerCase();
                return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
            }

            function SortByDate(a, b){
                return -(a[filterField] - b[filterField]);
            }

            function SortByMostPopular(a, b){
                return ((a[filterField] < b[filterField]) ? 1 : ((a[filterField] > b[filterField]) ? -1 : 0));
            }

            if (filterType == "alphabetical") {
                items.sort(SortByName);
            } else if (filterType == "date") {
                items.sort(SortByDate);
            } else if (filterType == "popular") {
                items.sort(SortByMostPopular);
            }

            return items;
        },

        findByType : function (type) {
            var models = store[type];

            return models;
        }

    };
})({});

/**
 * jQuery On24 Builder Plugin
 *
 * @author Alberto Perez  <alberto.perez@on24.com>
 *
 *********** Usage:*****************************************************************************************************
 *
 *  Pending complete ...
 *
 * @copyright 2014 ON24 Inc.
 *
 */
(function($){

    $.fn.builder = function(options) {

        var settings = $.extend(true,{
            prefix:                     'on24',
            container:                  'body',
            supportedFields:            ["assets", "roles", "interestareas","journeys", "solutions", "content", "featuredcontent","relatedcontent", "singlecontent"],
            preloadFields:              ["assets", "roles", "interestareas", "journeys","solutions"],
            hideContent:                false,
            showPerformanceInfo:        false,
            partnerref:                 "partnerref",
            derived : {
                "isGated" : function (model, gatedSponsorId) {
                    return model.sponsorId == gatedSponsorId;
                },
                "isDocument" : function (model) {
                    return model.assetTypeId != "8";
                },
                isWebcast : function (model) {
                    return model.assetTypeId == "8";
                },
                userLogged : function (model) {
                    return false;
                },
                "assets" : function (model, categories) {
                    var list;
                    if (model.assetType) {
                        list = model.assetType.split(",");
                    } else if (model.assetTypeId) {
                        list = model.assetTypeId.split(",");
                    }
                    if (list) {
                        return On24Util.getCategoryStr(categories, list);
                    } else {
                        return ""
                    }

                },
                "categoryType" : function (model, categoryType, categories) {

                    return On24Util.getCategoryStr(categories, model, categoryType);
                },
                "interestAreasType" : function (model,categories) {
                    var list;
                    if (model.interestAreas) {
                        list = model.interestAreas.split(",");
                    } else {
                        list = model.interestAreas.split(",");
                    }
                    return On24Util.getCategoryStr(categories,list);
                },
                "solutions": function (model, categories) {
                    var list;
                    if (model.solutionId) {
                        list = $.trim(model.solutionId).split(",");
                    }
                    return On24Util.getCategoryStr(categories,list);
                },
                "rolesType" : function (model, categories) {
                    var list;
                    if (model.roles) {
                        list = model.roles.split(",");
                    } else {
                        list = model.roles.split(",");
                    }
                    return On24Util.getCategoryStr(categories,list);
                },
                "d2c_url" : function (model) {
                    var link =  model.path;

                    return link
                },

                "role_url" : function (model) {
                    var link =  model.path;

                    return link
                },

                "interest_url" : function (model) {
                    var link =  model.path;

                    return link
                },

                "content_image" : function (model) {

                    if (model.thumbnailSmall &&
                        model.thumbnailSmall.length > 0) {
                        return model.thumbnailSmall;
                    } else if (model.thumbnailLarge &&
                        model.thumbnailLarge.length > 0) {
                        return model.thumbnailLarge;
                    } else {
                        return "";
                    }
                }
            },

            actionMap: {
                "assets" : {
                    "paramName":            "nodes",
                    "dataType" :            "json",
                    "contentType":          "text/json",
                    "modelName":            "assets",
                    "type" :                "get",
                    "defaultTriggerEvent":  "assetFilter"
                },
                "roles" : {
                    "paramName":            "nodes",
                    "dataType" :            "json",
                    "contentType":          "text/json",
                    "modelName":            "roles",
                    "type" :                "get",
                    "defaultTriggerEvent":  "roleFilter",
                    "listenEvents" : [
                        "shareContent",
                        "sharePage",
                        "talkIBM"
                    ]
                },
                "interestareas" : {
                    "paramName":            "nodes",
                    "dataType" :            "json",
                    "contentType":          "text/json",
                    "modelName":            "interestareas",
                    "type" :                "get",
                    "defaultTriggerEvent":  "interestAreaFilter"
                },
                "journeys" : {
                    "paramName":            "nodes",
                    "dataType" :            "json",
                    "contentType":          "text/json",
                    "modelName":            "journeys",
                    "type" :                "get",
                    "defaultTriggerEvent":  ""
                },
                "solutions" : {
                    "paramName":            "nodes",
                    "dataType" :            "json",
                    "contentType":          "text/json",
                    "modelName":            "solutions",
                    "type" :                "get",
                    "defaultTriggerEvent":  "solutionFilter"
                },
                "content" : {
                    "dataType" :            "json",
                    "contentType":          "text/json",
                    "paramName":            "nodes",
                    "modelName":            "content",
                    "type" :                "get",
                    "fixture" :             "fixture/contents.json",
                    "defaultSort":          "sortContent",
                    "offset":               9,
                    "helper" : {
                        "resourceCategories" :              "category"
                    },
                    "listenEvents" : [

                        "search",
                        "assetFilter",
                        "roleFilter",
                        "solutionFilter",
                        "interestAreaFilter",
                        "sortContent",
                        "loadMoreContent",
                        "launchContent"
                    ]
                },

                "featuredcontent" : {
                    "dataType" :            "json",
                    "contentType":          "text/json",
                    "paramName":            "nodes",
                    "modelName":            "featuredcontent",
                    "type" :                "get",
                    "defaultSort":          "sortContent",
                    "offset":               5,
                    "helper" : {
                        "resourceCategories" :              "category"
                    },
                    "listenEvents" : [
                        "search-featured",
                        "sortContent",
                        "loadMoreContent",
                        "launchContent"
                    ]
                },

                "relatedcontent" : {
                    "dataType" :            "json",
                    "contentType":          "text/json",
                    "paramName":            "nodes",
                    "modelName":            "relatedcontent",
                    "type" :                "get",
                    "defaultSort":          "sortContent",
                    "offset":               3,
                    "listenEvents" : [
                        "launchContent"
                    ]
                },

                "singlecontent" : {
                    "dataType" :            "json",
                    "contentType":          "text/json",
                    "modelName":            "content",
                    "paramName":            "node",
                    "type" :                "get",
                    "offset":               "1",
                    "listenEvents" : [
                        "downloadContent"
                    ]
                }
            },

            eventMap: {
                "search" : {
                    "fields"    : [
                        "title",
                        "abstract",
                        "assetTypeId",
                        "interestAreas"/**,
                     "journeys",
                     "solutions"**/

                    ],
                    "modelName"  :       "content",
                    "eventName"  :           "keyup"
                },
                "search-featured" : {
                    "fields"    : [
                        "title",
                        "abstract",
                        "assetTypeId",
                        "interestAreas"/**,
                        "journeys",
                        "solutions"**/
                    ],
                    "modelName"  :       "featuredcontent",
                    "eventName"  :           "keyup"
                },
                "sortContent"   : {
                    "fields"    : [
                        "resourceCategories"
                    ],
                    "modelName"  :       "content",
                    "eventName"  :       "change"
                },

                "loadMoreContent"   : {
                    "modelName"  :       "content",
                    "eventName"  :       "click"
                },

                "launchContent" : {
                    modelName:  "content",
                    eventName:  "click"
                },

                "assetFilter" : {
                    "fields"    : [
                        "assetTypeId"
                    ],
                    modelName:      "content",
                    eventName:      "change"
                },

                "roleFilter" : {
                    "fields"    : [
                        "roles"
                    ],
                    modelName:      "content",
                    eventName:      "change"
                },

                "solutionFilter" : {
                    "fields"    : [
                        "solutionId"
                    ],
                    modelName:      "content",
                    eventName:      "change"
                },


                "interestAreaFilter" : {
                    "fields"    : [
                        "interestAreas"
                    ],
                    modelName:      "content",
                    eventName:      "change"
                },

                "downloadContent" : {
                    modelName:      "content",
                    eventName:      "click"
                },

                "talkIBM" : {
                    modelName:      "content",
                    eventName:      "click"
                },

                "sharePage" : {
                    modelName:      "content",
                    eventName:      "click"
                },

                "shareContent" : {
                    modelName:      "content",
                    eventName:      "click"
                }
            },
            urlMap: {
                "solution": {
                    urlMapping:     "solution",
                    varName:        "isSolutionPage",
                    model:          "solutions",
                    isModel:        true,
                    index:          1,
                    mapping:        {

                    }
                },

                "asset": {
                    urlMapping:     "asset",
                    varName:        "isAssetPage",
                    model:          "assets",
                    isModel:        true,
                    index:          2,
                    mapping:        {

                    }
                },

                "journey": {
                    urlMapping:     "journey",
                    varName:        "isJourneyPage",
                    model:          "journeys",
                    isModel:        true,
                    index:          2,
                    mapping:        {

                    }
                },

                "role": {
                    urlMapping:     "role",
                    varName:        "isRolePage",
                    model:          "roles",
                    isModel:        true,
                    index:          1,
                    mapping:        {

                    }
                },
                "interestArea": {
                    urlMapping:     "interest-area",
                    varName:        "isInterestAreaPage",
                    model:          "interestareas",
                    isModel:        true,
                    index:          1,
                    mapping:        {

                    }
                },
                "default" :{
                    urlMapping:     "default",
                    model:          "content",
                    index:          1,
                    isModel:        false,
                    mapping:        {

                    }
                }
            },
            //function
            ready: function() {
                console.log("ready");
            },
            refresh:  function(groupName) {
                console.log("refresh" + groupName);
            },
            hidePaginator:  function(groupName) {
                //console.log("hide paginator" + groupName);
            },
            showPaginator:  function(groupName) {
                //console.log("show paginator" + groupName);
            }
        },  options);


        //Global variables
        var selectedFilters = {},
            templates = {},
            actualContentPage = 0,
            loggedUser,
            urkMapModelId,
            isRolePage,
            isInterestAreaPage,
            isAssetPage,
            isJourneyPage,
            isSolutionPage;

        /***************************************************************************************************************
         *
         * BEGIN :: Initialize Library Functions
         *
         ***************************************************************************************************************/

        /**
         * We need to find every block of code with any dynamic data and
         * automatically hide until get data from server
         * @private
         */
        function _hideElements () {
            var datakey, nodes, queryNodes;
            //only hide items when this property s setting to true. In other case,
            //web designer must be include hidden container into css files.
            if (settings.hideContent == true) {
                //need to hide all items
                $.each(settings.supportedFields, function (index, field) {
                    //find model data
                    datakey = "data-" + settings.prefix + "-" + field;
                    nodes = On24Util.findByData(settings.container, datakey);
                    nodes.hide();

                    //find query model data
                    datakey = "data-" + settings.prefix + "-" + field + "-query";
                    queryNodes = On24Util.findByData(settings.container, datakey);
                    queryNodes.hide();
                });
            }

            //hide all visible conditions
            datakey = "data-" + settings.prefix + "-visible";
            nodes = On24Util.findByData(settings.container, datakey);
            nodes.hide();
        }


        /**
         * check visible conditions to show or hide any container with data-on24-visible
         * attribute. This function is called by the framework when we need to update
         * some DOM properties.
         *
         * @param model
         * @param container
         */
        function checkNonVisibleItems (model, container) {
            var datakey = "data-" + settings.prefix + "-visible",
                nodes = On24Util.findByData(container || settings.container, datakey);


            $.each(nodes, function (index, node) {

                var expr = $.trim($(node).data(settings.prefix + "-visible")),
                    showField = false,
                    applyChange = false,
                    isNegative = expr.indexOf("!") == 0,
                    field = (isNegative)? $.trim(expr.substring(1, expr.length)) : $.trim(expr);

                if (model) {
                    //it's a model
                    if ($.type(model[field]) === "boolean") {
                        if (isNegative) {
                            showField = !model[field];
                        } else {
                            showField = model[field];
                        }
                        applyChange = true;
                    } else {
                        //check derived visible properties
                        if (settings.derived[field]) {
                            if (isNegative) {
                                showField = !settings.derived[field](model, settings.gatedSponsorId);
                            }else {
                                showField = settings.derived[field](model, settings.gatedSponsorId);
                            }
                            applyChange = true;
                        }

                    }
                } else {
                    //check derived visible properties
                    if (settings.derived[field] && (expr.indexOf("userLogged") > -1 || expr.indexOf("isGated") > -1)) {
                        if (isNegative) {
                            showField = !settings.derived[field](loggedUser, settings.gatedSponsorId);
                        }else {
                            showField = settings.derived[field](loggedUser, settings.gatedSponsorId);
                        }
                        applyChange = true;
                    } else {
                        if (field == "isRolePage" || field == "isInterestAreaPage" || field == "isSolutionPage" || field == "isAssetPage" || field == "isJourneyPage") {
                            if (isNegative) {
                                showField = !settings[field];

                            } else {
                                showField = settings[field];
                            }
                            applyChange = true;
                        }
                    }
                }

                if ( applyChange) {
                    if (showField) {
                        $(node).show();
                    } else {
                        $(node).hide();
                    }
                }


            });

        };


        function addFilter (modelName, filterName, fields, value) {
            if (!selectedFilters[modelName]) {
                selectedFilters[modelName] = {};
            }
            if (!selectedFilters[modelName][filterName]) {
                if (filterName == "searchString") {
                    selectedFilters[modelName][filterName] =  {
                        fields : fields,
                        value : value
                    };
                } else {
                    selectedFilters[modelName][filterName] = [];

                    selectedFilters[modelName][filterName].push({
                        fields : fields,
                        value : value
                    });
                }


            } else {
                //find if exits or not
                var found = false;
                if (filterName == "searchString") {
                    found = false;
                    selectedFilters[modelName][filterName] =  {
                        fields : fields,
                        value : value
                    };
                } else {
                    $.each(selectedFilters[modelName][filterName], function (index, item) {
                        if (item.value === value && item.fields == fields) {
                            found = true;
                        }
                    });
                    if(!found) {
                        selectedFilters[modelName][filterName].push({
                            fields : fields,
                            value : value
                        });
                    }
                }


            }
        };



        /**
         * get url params, override if url is matching
         * @private
         */
        function _checkMappingURL () {


            /**
             * replace default URL
             * @param urlMap
             * @param url
             */
            var replaceDefaultURL = function (urlMap, url) {
                var modelId = urlMap.mapping[url],
                    found, i, categories,category, datakey, fields;

                /**if (!modelId) {
                    //find category with actual name
                    found = false;
                    i = 0;
                    categories = On24Store.findByType("category");

                    if (categories) {
                        while (!found && i < categories.length) {
                            if (categories[i].name == url) {
                                found = true;
                                modelId = categories[i].id;
                            }
                            i++;
                        }
                    }

                }
                 if (!modelId) {
                    modelId = parseInt(On24Util.segment(urlMap.index + 1),10);
                }

                 if (modelId > 0) {
                    urkMapModelId = modelId;

                    reloadCheckedRoles();

                    datakey = "data-" + settings.prefix + "-content";
                    fields = On24Util.findByData(settings.container, datakey);

                    $.each(fields, function (index, node) {
                        if ($(node).data(settings.prefix + "-content") == "repeat") {
                            var eventItem = settings.eventMap["categoryPageFilter"];


                            addFilter(eventItem.modelName, "categoryPageFilter" ,eventItem.fields, modelId );

                            _addModelQuery(urlMap.model, $(node), $(node).children());
                            _replaceListenEvents($(node), urlMap.model);

                            $(node).removeAttr(datakey);
                        }

                    });
                }**/
            };


            /**
             * replace a model url (when enter to any content)
             * @param urlMap
             * @param model
             */
            var replaceModelURL = function (urlMap, model) {

                var datakey = "data-" + settings.prefix + "-field",
                    container = $(settings.container).find("[data-" + settings.prefix + "-url]"),
                    fields = On24Util.findByData(container, datakey);

                $.each(fields, function (index, node) {
                    var field = $(node).data(settings.prefix + "-field");
                    overrideFieldData(field,  urlMap.model , model, $(this) );

                });

                var dataAttrKey = "data-" + settings.prefix + "-attribute",
                    attrs = On24Util.findByData(container, dataAttrKey);


                $.each(attrs, function (index, node) {
                    var attr =  $(node).data(settings.prefix + "-attribute");
                    overrideAttrData(attr,  urlMap.model , model, $(this) );
                });
            };

            /**
             * replace collections of items
             * @param model
             */
            var replaceDataProvider = function (model) {

                var datakey = "data-" + settings.prefix + "-field",
                    fields = On24Util.findByData(settings.container, datakey);

                $.each(fields, function (index, node) {
                    var field = $(node).data(settings.prefix + "-field");
                    //console.log("Replace Repeater items: " + field)

                    if (field == "relatedContents") {
                        var groupData = $(node).data(settings.prefix + "-groupname") || "";
                        if (!templates[field + groupData]) {
                            templates[field + groupData] = $(node).children();
                            $(node).children().remove();
                        }

                        var offset  = $(node).data(settings.prefix + "-offset") || model[field].length;

                        if (model[field] && model[field]["relatedResources"]) {
                            var relatedModels = model[field]["relatedResources"].slice(0, offset);
                            var standardModels = [];
                            $.each(relatedModels, function (index, item) {
                                standardModels.push(item["resource"]);
                            })
                            _renderModelItems(standardModels, "content", $(node), templates[field + groupData], true);
                        }
                        $(node).removeAttr(datakey);

                    }
                });
            };


            var replaced = false,
                url;

            $.each(settings.urlMap, function (index, urlMap) {

                if (!replaced) {
                    url = On24Util.segment(urlMap.index);

                    if (urlMap.urlMapping === url) {
                        replaced = true;

                        settings[urlMap.varName] = true;

                        var parameters = {
                            externalId      : settings.categoryId,
                            type            : urlMap.model,
                            action          : settings.actionMap[urlMap.model],
                            settings        : settings
                        };
                        On24Store.findById(parameters)
                            .done(function (models) {
                                var model;

                                if ($.isArray(models)) {
                                    model = models[0];
                                } else {
                                    model = models;
                                }

                                if (model != null) {
                                    if (urlMap.isModel === true) {
                                        replaceModelURL(urlMap, model);
                                    }
                                }
                            });

                    } else {
                        settings[urlMap.varName] = false;
                    }
                    /** var parameters = {
                            externalId      : On24Util.segment(urlMap.index + 1),
                            type            : urlMap.model,
                            action          : settings.actionMap[urlMap.model],
                            settings        : settings
                        };
                     On24Store.findById(parameters)
                     .done(function (models) {
                                var model;

                                if ($.isArray(models)) {
                                    model = models[0];
                                } else {
                                    model = models;
                                }

                                if (model != null) {
                                    replaceDataProvider(model);
                                    if (urlMap.isModel === true) {
                                        replaceModelURL(urlMap, model);


                                    } else {
                                        replaceDefaultURL(urlMap, url);
                                    }
                                    //checkNonVisibleItems(model);
                                    checkNonVisibleItems();
                                }
                            });**/

                }
            });
        }


        function _initEventsLibrary () {
            //trigger events
            var dataKey = "data-" + settings.prefix + "-event-name",
                nodes = On24Util.findByData(settings.container,dataKey );

            $.each( nodes, function (index, node) {
                _replaceTriggerEvents($(node));
            });
        }
        /***************************************************************************************************************
         *
         * END :: Initialize Library Functions
         *
         ***************************************************************************************************************/



        /***************************************************************************************************************
         *
         * BEGIN :: Event Manipulation
         *
         ***************************************************************************************************************/

        /**
         * this function replace non default events
         * @param $node
         * @private
         */
        function _replaceTriggerEvents ($node) {

            var eventList = $node.data(settings.prefix + "-event-name"),
                listOfEvents = eventList.split(";"),
                eventName, handlerName,
                groupName,
                id,
                eventInfo;

            $.each(listOfEvents, function (index, event) {
                if ( event.split(":").length > 1) {
                    eventName = event.split(":")[0];
                    handlerName = event.split(":")[1];
                    eventInfo = settings.eventMap[handlerName];
                } else {

                    handlerName = event.split(":")[0];
                    eventInfo = settings.eventMap[handlerName];
                    eventName = eventInfo.eventName;
                }

                id = $node.data(settings.prefix + "-id");
                groupName = $node.data(settings.prefix + "-groupname") || "";

                //PubSub.unsubscribe(handlerName + groupName);
                $node.off();

                $node.on(eventName, function (e) {

                    if (id > 0) {
                        PubSub.publish(handlerName + groupName, [{
                            data: id,
                            modelName : eventInfo.modelName,
                            $target: $(e.target),
                            checked : ($node.attr('type') == "checkbox" ) ?$node.is(":checked"):true
                        }]);
                    } else {
                        var option = $node.find(":selected");
                        e.preventDefault();
                        //_replaceListenEvents($node,  eventInfo.modelName)
                        PubSub.publish(handlerName + groupName, [{
                            data:  $(option).data(settings.prefix + "-sort-field"),
                            modelName : "content",
                            $target: $(e.target),
                            checked : true,
                            clean : false
                        }]);

                    }
                });
            });
            //$node.removeAttr("data-" + settings.prefix + "-event-name");
        }



        function filterContentByText ($node, data, eventItem) {
            //remove all childs except first One
            //$node.children().not(':first').remove();

            $node.children().remove();

            addFilter(eventItem.modelName, "searchString" ,eventItem.fields,data.$target.val());

            _addModelQuery(eventItem.modelName, $node, $node.children());

        }

        function filterContentByCategory ($node, data, eventItem, eventName) {
            //remove all childs except first One
            //$node.children().not(':first').remove();

            //remove all items
            $node.children().remove();

            if (!selectedFilters[eventItem.modelName]) {
                selectedFilters[eventItem.modelName] = {};
            }
            if (!selectedFilters[eventItem.modelName][eventName]) {
                selectedFilters[eventItem.modelName][eventName] = [];
            }
            if ($.isArray(data)) {
                //if (item.clean) {
                selectedFilters[eventItem.modelName][eventName] = [];
                //}

                $.each(data, function (index, item) {

                    if (item.checked && item.data > 0) {
                        selectedFilters[eventItem.modelName][eventName].push({
                            fields : eventItem.fields,
                            value : item.data
                        });
                    } else {
                        selectedFilters[eventItem.modelName][eventName] =  $.grep(selectedFilters[eventItem.modelName][eventName], function (filter, index) {
                            if (filter.value == item.data) {
                                if (item.checked == true) {
                                    return true;
                                } else {
                                    return false;
                                }
                            } else {
                                return true;
                            }
                        });
                    }
                });

            } else {
                if (data.clean) {
                    selectedFilters[eventItem.modelName][eventName] = [];
                }
                if (data.checked && data.data > 0) {
                    selectedFilters[eventItem.modelName][eventName].push({
                        fields : eventItem.fields,
                        value : data.data
                    });
                } else {
                    selectedFilters[eventItem.modelName][eventName] =  $.grep(selectedFilters[eventItem.modelName][eventName], function (filter, index) {
                        if (filter.value == data.data) {
                            if (data.checked == true) {
                                return true;
                            } else {
                                return false;
                            }
                        } else {
                            return true;
                        }
                    });
                }
            }


            actualContentPage = 0;

            _addModelQuery(eventItem.modelName, $node, $node.children());

        };


        function sortContent ($node, data, eventItem) {
            var actionInfo = settings.actionMap[eventItem.modelName];
            //remove all items
            $node.children().remove();

            actualContentPage = 0;

            var parameters = {
                action          : actionInfo,
                selectedFilters     : selectedFilters,
                type                : eventItem.modelName,
                parent              : $node,
                node                : $node.children(),
                settings            : settings
            }
            On24Store.getItems(parameters)
                .done(function(items) {
                    items = On24Store.sortDataModels(items, data.data);


                    _renderModelItems(items.slice(0, actionInfo.offset), eventItem.modelName, $node, templates[eventItem.modelName + data.$target.data(settings.prefix + "-groupname")]);
                })

        };



        // create popup
        function popupHandler(e, href) {

            // open popup
            var popup = window.open(href, "sharewindow", "width=640,height=480,location=0,menubar=0,toolbar=0,status=0,scrollbars=1,resizable=1");
            if (popup) {
                popup.focus();
                if (e.preventDefault) e.preventDefault();
                e.returnValue = false;
            }

            return !!popup;
        };

        function share(tpl,title,url) {
            if(url) url = encodeURIComponent(url);
            if(title) title = encodeURIComponent(title);
            if (url && title) {
                tpl = tpl.replace("##URL##",url);
                tpl = tpl.replace("##TITLE##",title);

                window.open(tpl,"sharewindow" ,"width=640,height=480,location=0,menubar=0,toolbar=0,status=0,scrollbars=1,resizable=1");
            }
        };


        function onShareContent($node, data, eventItem) {

            var type = $(data.$target).data(settings.prefix + "-share-type");
            var contentId = $(data.$target).data(settings.prefix + "-id");




            //get content by Id

            var contentList = [];

            if (On24Store.getStore()["content"]) {
                contentList = On24Store.getStore()["content"];
            }
            if (On24Store.getStore()["featuredcontent"]) {
                $.merge(contentList, On24Store.getStore()["featuredcontent"]);
            }
            if (On24Store.getStore()["relatedcontent"]) {
                $.merge(contentList, On24Store.getStore()["relatedcontent"]);
            }

            var models = On24Store.findByIdsList([contentId.toString()], "", contentList);
            var model;
            if ($.isArray(models)) {
                model = models[0];
            } else {
                model = models;
            }
            var actualPage = On24Util.getHost() + model.path + On24Util.getParameters();
            switch (type) {
                case "digg" :
                    share('http://digg.com/submit?phase=2&amp;url=##URL##&amp;title=##TITLE##',model.title,actualPage);

                    break;
                case "facebook" :
                    var shareFacebookURL = "https://www.facebook.com/sharer/sharer.php?u==" + actualPage;
                    popupHandler(data.$target,shareFacebookURL );

                    break;
                case "twitter" :

                    /**var shareTwitterURL = "https://twitter.com/intent/tweet?url="  + actualPage
                     +"&text=Check This Page"
                     + "&hashtags=ibm";
                     popupHandler(data.$target,shareTwitterURL );**/

                    share('http://twitter.com/home?status=##URL##+##TITLE##',model.title,actualPage);

                    break;
                case "delicious" :

                    share('http://delicious.com/save?v=5&noui&jump=close&url=##URL##&title=##TITLE##',model.title,actualPage);
                    break;
                case "linkedIn" :
                    var shareLinkedIn = "http://www.linkedin.com/shareArticle?mini=true&url=" + actualPage
                        + "&title=" + model.title
                        + "&source=IBM"
                        + "&summary=Visit the content and enjoy!";

                    popupHandler(data.$target,shareLinkedIn );
                    break;
                case "stumbleUpon" :
                    share('http://www.stumbleupon.com/submit?url=##URL##',model.title,actualPage);
                    break;
                case "mail" :
                    //console.log("mail");
                    var subject = "Check this Website";
                    var body = "Enter to this page " + actualPage;
                    window.open("mailto:?subject=" + model.title + "&body=" + model.abstract);
                    break;
                default :
                    console.log("No type is defined");
                    break;
        }


        };

        function onSharePage($node, data, eventItem) {


            var type = $(data.$target).data(settings.prefix + "-share-type");

            var actualPage = On24Util.getLocation() + On24Util.getParameters();
            console.log(actualPage);

            switch (type) {
                case "digg" :
                    share('http://digg.com/submit?phase=2&amp;url=##URL##&amp;title=##TITLE##',"Smarter Business",actualPage);
                    break;
                case "facebook" :
                    var shareFacebookURL = "https://www.facebook.com/sharer/sharer.php?u==" + actualPage;
                    popupHandler(data.$target,shareFacebookURL );
                    break;
                case "twitter" :
                    /**var shareTwitterURL = "https://twitter.com/intent/tweet?url="  + actualPage
                        +"&text=Check This Page"
                        + "&hashtags=ibm";
                    popupHandler(data.$target,shareTwitterURL );**/

                    share('http://twitter.com/home?status=##URL##+##TITLE##',"Smarter Business",actualPage);

                    break;
                case "delicious" :

                    share('http://delicious.com/save?v=5&noui&jump=close&url=##URL##&title=##TITLE##',"Smarter Business",actualPage);
                    break;
                case "linkedIn" :
                    var shareLinkedIn = "http://www.linkedin.com/shareArticle?mini=true&url=" + actualPage
                        + "&title=Check This Page"
                        + "&source=IBM"
                        + "&summary=Visit the page and enjoy!";

                    popupHandler(data.$target,shareLinkedIn );
                    break;
                case "stumbleUpon" :
                    share('http://www.stumbleupon.com/submit?url=##URL##',"Smarter Business",actualPage);
                    break;
                case "mail" :
                    //console.log("mail");
                    var subject = "Check this Website";
                    var body = "Enter to this page " + actualPage;
                    window.open("mailto:?subject=" + subject + "&body=" + body);
                    break;
                default :
                    console.log("No type is defined");
                    break;

            }
        };

        function onTalkIBM ($node, data, eventItem) {

            var url = "http://sales.liveperson.net/hc/3815120/cmd/url/?site=3815120&SV!click-query-name=chat-swgcci-usen-rethink&SV!click-query-room=chat-swgcci-usen-rethink&SV!click-query-state=Available&SV!click-query-channel=web&page=http%3A//sales.liveperson.net/hc/3815120/%3Fcmd%3Dfile%26file%3DvisitorWantsToChat%26site%3D3815120%26LEAppKey%3Df907f2d9acd64b7f8c00b83bed3c2822%26SV%21chat-button-name%3Dchat-swgcci-usen-rethink%26SV%21chat-button-room%3Dchat-swgcci-usen-rethink%26referrer%3D%28button%2520dynamic-button%3Achat-swgcci-usen-rethink%28IBM%2520Executive%2520-%2520Rethink%2520Business%29%29%2520http%253A//rethinkyourcustomer.com/&id=552081009&waitForVisitor=redirectBack&redirectAttempts=10&redirectTimeout=500&&d=1408566174399";

            window.open(url, '', 'scrollbars=1,height=400,width=450');
        };

        function downloadContent ($node, data, eventItem) {
            var self = this,
                actionInfo = settings.actionMap[eventItem.modelName];

            var models = On24Store.getStore()[eventItem.modelName];

            if ($.isArray(models) && models.length > 0) {
                var model = models[0];
                switch (model.assetTypeId) {
                    case "1":
                        console.log("Solution Briefcase:: Open a link in a new Tab");
                        window.open("/content/test");
                        break;
                    case "2":
                        console.log("Solution Briefcase:: Open a link in a new Tab");
                        window.open("/content/test");
                        break;
                    case "3":
                        console.log("Flyer:: Open a link in an iframe");

                        $("a#fancyIframe").attr("href", "http://www.on24.com");
                        $("a#fancyIframe").click();
                        break;
                    case "4":
                        console.log("Solution Briefcase:: Open a link in a new Tab");
                        window.open("/content/test");
                        break;
                    case "5":
                        console.log("Trial:: Open a link in a layer");

                        $("#data .inline-title").text(model.title);
                        $("#data .inline-description").text(model.abstract);
                        $("a#inline").click();
                        break;
                    case "6":
                        console.log("White Paper:: Open an image");
                        $("a#fancyImage").attr("href", "http://www.on24.com/wp-content/uploads/2014/07/webinar-based-marketing.png");
                        $("a#fancyImage").attr("title", model.title);
                        $("a#fancyImage").click();
                        break;
                    case "7":
                        console.log("Demo:: Open an image");

                        $("a#fancyImage").attr("href", "http://www.on24.com/wp-content/uploads/2014/07/webinar-based-marketing.png");
                        $("a#fancyImage").attr("title", model.title);
                        $("a#fancyImage").click();
                        break;
                    case "8":
                        console.log("Video:: Open a video Vimeo player");
                        $("a#fancyVimeo").attr("href", "http://f.vimeocdn.com/p/flash/moogaloop/6.0.17/moogaloop.swf?clip_id=54495798&z=1408611343524");
                        $("a#fancyVimeo").click();
                        break;
                    case "9":
                        console.log("Webcast:: Open a video YouTube player");
                        $("a#fancyYouTube").attr("href", "http://youtu.be/mXRG0bJt7EA");
                        $("a#fancyYouTube").click();
                        break;
                    case "10":
                        console.log("Webinar:: Open a video Vimeo player");
                        $("a#fancyVimeo").attr("href", "http://f.vimeocdn.com/p/flash/moogaloop/6.0.17/moogaloop.swf?clip_id=54495798&z=1408611343524");
                        $("a#fancyVimeo").click();
                        break;
                    default:
                        console.log("Unknow:: Open a link in the same Tab");
                        window.open("/content/test", "_self");
                        break;
                }

            } else {
                console.log("it's not an array");
            }


        }
        function launchContent ($node, data, eventItem) {
            var self = this,
                actionInfo = settings.actionMap[eventItem.modelName];

            var models = On24Store.getStore()[eventItem.modelName];

            if ($.isArray(models) && models.length > 1) {
                console.log("It's an array and we get more than once");
            } else {
                if ($.isArray(models) &&models.length > 0) {
                    var model = models[0];
                    if (model.isInternal === "Y" && model.classType === "WEBCAST"){
                        console.log("We need to launch Webcast page");
                        var webcastUrl = "";// On24WebcastUtil.getWebcastUrl(model, true);
                        window.open(webcastUrl);
                    } else {
                        console.log("the url is " + model.sourceUrl);
                        window.open(model.sourceUrl);
                    }
                } else {
                    console.log("it's not an array");
                }

            }
        };



        function setNumberOfItems(modelName, models) {
            var datakey = "data-" + settings.prefix + "-" + modelName + "-count",
                nodes = On24Util.findByData(settings.container, datakey);

            $.each( nodes, function (index, node) {
                if (models) {
                    $(node).text(models.length)
                } else {
                    $(node).text(0)
                }

            });

        };

        function renderNextPage ($node, data, eventItem) {
            var self = this,
                actionInfo = settings.actionMap[eventItem.modelName];

            actualContentPage++;

            var parameters = {
                selectedFilters     : selectedFilters,
                action              : actionInfo,
                settings            : settings,
                pageNumber          : actualContentPage
            };

            On24Store.findPaginatedByType(parameters)
                .done(function(models) {
                    setNumberOfItems(eventItem.modelName, models);
                    if (models.length == 0) {
                        settings.hidePaginator();
                    } else {
                        if (models.length < actionInfo.offset) {
                            settings.hidePaginator();
                        } else {
                            settings.showPaginator();
                        }

                        _renderModelItems(models, eventItem.modelName, $node, templates[eventItem.modelName]);
                    }

                }).fail(function (data) {
                    console.log("fail")
                });
        };


        function _replaceListenEvents ($node, type) {
            var listenEventList = settings.actionMap[type].listenEvents,
                defaultTriggerEvent = settings.actionMap[type].defaultTriggerEvent,
                groupName = $node.data(settings.prefix + "-groupname") || "";

            if ( defaultTriggerEvent && defaultTriggerEvent!= "") {

                var inputs = $node.find("input[type='checkbox']");

                //PubSub.unsubscribe(defaultTriggerEvent + groupName);
                inputs.off();
                inputs.on("click", function (e) {
                    //e.preventDefault();
                    if (($(e.target).data(settings.prefix + "-event-name") == null )) {
                        PubSub.publish(defaultTriggerEvent + groupName, [{
                            data:  $(e.target).data(settings.prefix + "-id"),
                            modelName : type,
                            $target: $(e.target),
                            checked : ($(e.target).attr('type') == "checkbox" ) ?$(e.target).is(":checked"):true
                        }]);
                    }
                });

                var select = $node.is('select')?$node: $node.find("select");
                //select.off();
                select.on("change", function (e) {
                    e.preventDefault();
                    var option = this.options[this.selectedIndex];
                    PubSub.publish(defaultTriggerEvent + groupName, [{
                        data:  $(option).data(settings.prefix + "-id"),
                        modelName : type,
                        $target: $(e.target),
                        checked : true,
                        clean : true
                    }]);
                });
            }

            if (listenEventList && listenEventList.length > 0) {
                $.each(listenEventList, function (index, eventName) {
                    PubSub.unsubscribe(eventName + groupName);

                    PubSub.subscribe({
                        topic:eventName + groupName,
                        handle:eventName + groupName,
                        func:function(data){
                            var eventItem = settings.eventMap[eventName];
                            //new Function(self[eventItem.handler]).call(self);
                            if (eventName == "search" || eventName == "search-featured") {
                                filterContentByText($node, data, eventItem);
                            } else if (eventName == "assetFilter" || eventName =="roleFilter" || eventName == "interestAreaFilter" ||  eventName == "solutionFilter") {
                                filterContentByCategory($node, data, eventItem, eventName);
                            } else if (eventName == "sortContent") {
                                sortContent($node, data, eventItem);
                            } else if (eventName == "loadMoreContent") {
                                renderNextPage($node, data, eventItem);
                            } else if (eventName == "launchContent") {
                                launchContent($node, data, eventItem);
                            }  else if (eventName == "downloadContent") {
                                downloadContent($node, data, eventItem);
                            }  else if (eventName == "talkIBM") {
                                onTalkIBM($node, data, eventItem);
                            } else if (eventName == "sharePage") {
                                onSharePage($node, data, eventItem);
                            } else if (eventName == "shareContent") {
                                onShareContent($node, data, eventItem);
                            }
                            settings.refresh(groupName);
                        }
                    });
                });
            }
            //$node.removeAttr("data-" + settings.prefix + "-event-name");
        }

        /***************************************************************************************************************
         *
         * END :: Event Manipulation
         *
         ***************************************************************************************************************/



        function _initDataLibrary () {
            //search Category Items
            var nodes,
                queryNodes,
                sortNodes,
                promises = [],
                datakey;

            $.each($("a"), function (index, field) {
                On24Util.setLink(settings.prefix, $(field));
            });

            $.each(settings.supportedFields, function (index, field) {
                datakey = "data-" + settings.prefix + "-" + field;
                nodes = On24Util.findByData(settings.container, datakey);
                $.each( nodes, function (index, node) {
                    $.merge(promises, _replaceRepeaterFields($(node), field));
                });
                datakey = "data-" + settings.prefix + "-" + field + "-query";
                queryNodes = On24Util.findByData(settings.container, datakey);
                $.each( queryNodes, function (index, node) {
                    $.merge(promises, _replaceRepeaterFields($(node), field, true));
                });
            });



            return promises;
        }


        function _replaceRepeaterFields ($node, field, isQuery) {
            var query, modelName, modelValue;
            //$node.children().hide();

            var promises = [];

            if (!isQuery) {
                //$node.removeAttr("data-" + settings.prefix + "-" + field);
                if ($node.data(settings.prefix + "-" + field) == "repeat") {
                    promises.push(_addModelQuery(field, $node, $node.children()));
                } else {
                    fillData(field, $node);
                }
                _replaceListenEvents($($node), field);
            } else {
                query = $node.data(settings.prefix + "-" + field + "-query");
                modelName = query.split("=")[0];
                modelValue = query.split("=")[1];

                //$node.removeAttr("data-" + settings.prefix + "-" + field + "-query");
                if ($node.data(settings.prefix + "-" + field) == "repeat") {
                    promises.push(_addModelQuery(field, $node, $node.children(), [modelName],modelValue ) );
                }
                _replaceListenEvents($($node), field);
            }

            return promises;


        }

        function fillData( field, $node) {
            var datakey = "data-" + settings.prefix + "-field";
            var nodes = On24Util.findByData($node, datakey);

            $.each(nodes, function (index, domItem ) {
                var field = $(domItem).data(settings.prefix + "-field");

                if (field) {
                    if ($(domItem).is("a")) {
                        On24Util.setLink(settings.prefix, $(domItem));
                    }


                }
            });

        }

        function _addModelQuery ( type, parent, node) {
            var self = this,
                dfd = $.Deferred();
            var actionInfo = settings.actionMap[type];


            var onSuccessCallback = function (data) {
                var parameters = {
                    actionInfo          : actionInfo,
                    selectedFilters     : selectedFilters,
                    type                : type,
                    parent              : parent,
                    node                : node,
                    settings            : settings,
                    data                : data
                }

                On24Store.getItems(parameters)
                    .done(function(items) {
                        var groupData = parent.data(settings.prefix + "-groupname") || "";
                        if (!templates[type + groupData]) {
                            templates[type + groupData] = $(node);
                            $(node).remove();
                        }

                        _renderModelItems(items, type, parent, templates[type + groupData]);

                        dfd.resolve();
                    });

            };


            //if (!store[type] || store[type].length == 0) {

            var parameters = {
                selectedFilters     : selectedFilters,
                action              : actionInfo,
                settings            : settings,
                pageNumber          : actualContentPage,
                url                 : parent.data(settings.prefix + '-url')
            };

            On24Store.findPaginatedByType(parameters)
                .done(function(models) {
                    setNumberOfItems(type, models);
                    if (models) {
                        if (models.length == 0) {
                            settings.hidePaginator();
                        } else {
                            if (models.length < actionInfo.offset) {
                                settings.hidePaginator();
                            } else {
                                settings.showPaginator();
                            }
                            if (actionInfo.defaultSort) {
                                var datakey = "data-" + settings.prefix + "-event-name";
                                var nodes = On24Util.findByData(settings.container, datakey);

                                $.each(nodes, function (index, domItem ) {
                                    if ($(domItem).data() && $(domItem).data().on24EventName && $(domItem).data().on24EventName.indexOf(actionInfo.defaultSort) > -1) {
                                        datakey = "data-" + settings.prefix + "-sort-field";
                                        var sortFieldNodes = On24Util.findByData(domItem, datakey);
                                        if (sortFieldNodes && sortFieldNodes.length >0) {
                                            models = On24Store.sortDataModels(models, $(sortFieldNodes[0]).data().on24SortField);
                                        }

                                    }
                                });
                            }
                        }
                    } else {
                        settings.hidePaginator();
                    }
                    onSuccessCallback(models);


                }).fail(function (data) {
                    console.log("fail")
                });

            return dfd;
        }

        function overrideAttrData ( field, type , model, domItem ) {
            var actionInfo = settings.actionMap[type];
            if (model) {
                if (field && field != "") {
                    var attr = $(domItem).data(settings.prefix + "-attribute");
                    if (attr && attr != "") {
                        attr = attr.split(".") [0];
                        if (actionInfo.replace && actionInfo.replace[attr]) {
                            attr = actionInfo.replace[attr];
                        }
                        if (actionInfo.helper && actionInfo.helper[attr]) {
                            var str = _getloadHelperInfo(domItem, model, field, type, actionInfo);
                            if (str != "") {
                                $(domItem).attr("data-" + settings.prefix + "-" + attr, str );
                            } else {
                                $(domItem).attr("data-" + settings.prefix + "-" + attr, model[attr] );
                            }
                        }else {
                            $(domItem).attr("data-"+  settings.prefix + "-" + attr, model[attr] );
                        }
                        $(domItem).removeAttr("data-" + settings.prefix + "-attribute");
                    }
                }
            }
        }
        function overrideFieldData ( field, type , model, domItem ) {
            var actionInfo = settings.actionMap[type];
            var link = "";
            if (model) {
                if (field && field != "") {
                    field = field.split(".") [0];
                    if (actionInfo.replace && actionInfo.replace[field]) {
                        field = actionInfo.replace[field];
                    }

                    //find if exists any helper info
                    if (actionInfo.helper && actionInfo.helper[field]) {
                        var str = _getloadHelperInfo(domItem, model, field, type, actionInfo);

                        if (str != "") {
                            $(domItem).text(str);
                        } else {
                            $(domItem).text(model[field]);
                        }
                    } else {
                        if ($.isArray(model[field])) {
                            console.log("is Array");
                        } else {
                            if (settings.derived[field]) {
                                if (field == "assets") {
                                    $(domItem).text(settings.derived[field](model, On24Store.getStore()["assets"]));
                                } else if (field == "interestAreasType"){
                                    $(domItem).text(settings.derived[field](model,  On24Store.getStore()["interestareas"]));
                                } else if (field == "rolesType") {
                                    $(domItem).text(settings.derived[field](model,  On24Store.getStore()["roles"]));
                                } else if (field == "solutions") {
                                    $(domItem).text(settings.derived[field](model,  On24Store.getStore()["solutions"]));
                                } else if (field == "d2c_url" || field == "role_url" || field == "interest_url") {

                                    if (settings.derived[field]) {
                                        link = settings.derived[field](model);

                                        var parameters = On24Util.getParameters();
                                        if (parameters != "") {
                                            link = link +  parameters;
                                        }
                                        $(domItem).attr("href", link);

                                    }
                                } else {
                                    if ($(domItem).is("img")) {
                                        $(domItem).attr('src', settings.derived[field](model));
                                    } else {
                                        $(domItem).text(settings.derived[field](model));
                                    }
                                }

                            } else {
                                if ($(domItem).is("img")) {
                                    $(domItem).attr('src', model[field]);
                                } else if ($(domItem).is("a")) {
                                    link = model[field];

                                    var parameters = On24Util.getParameters();
                                    if (parameters != "") {
                                        link = link +  parameters;
                                    }
                                    $(domItem).attr("href", link);
                                } else {
                                    $(domItem).text(model[field]);
                                }

                            }

                        }

                    }




                    //$(domItem).removeAttr("data-" + settings.prefix + "-field");
                }
                $(domItem).attr("data-"+  settings.prefix + "-" + "id", model["id"] );

                var attr = $(domItem).data(settings.prefix + "-attribute");
                if (attr && attr != "") {
                    attr = attr.split(".") [0];
                    if (actionInfo.replace && actionInfo.replace[attr]) {
                        attr = actionInfo.replace[attr];
                    }
                    if (actionInfo.helper && actionInfo.helper[attr]) {
                        var str = _getloadHelperInfo(domItem, model, field, type, actionInfo);
                        if (str != "") {
                            $(domItem).attr("data-" + settings.prefix + "-" + attr, str );
                        } else {
                            $(domItem).attr("data-" + settings.prefix + "-" + attr, model[attr] );
                        }
                    }else {
                        $(domItem).attr("data-"+  settings.prefix + "-" + attr, model[attr] );
                    }
                    $(domItem).removeAttr("data-" + settings.prefix + "-attribute");
                }
            }

        }

        function _renderModelItems (models, type, parent, node, removeAttr) {
            var htmlToInsert = "";

            if (settings.showPerformanceInfo) {
                var start = new Date().getTime();
            }

            $.each(models, function (index, model) {
                var cloneDomItem = $(node).clone(),
                    items = On24Util.getRecursiveChildren(cloneDomItem);
                $.each(items, function (index, domItem ) {
                    var field = $(domItem).data(settings.prefix + "-field");

                    if (field != undefined) {
                        if ($(domItem).is("a") && $(domItem).attr("href") != undefined) {
                            On24Util.setLink(settings.prefix, $(domItem));
                        } else{
                            overrideFieldData(field,  type , model, domItem );
                        }
                    }

                    var attr =  $(domItem).data(settings.prefix + "-attribute");
                    if (attr != undefined) {
                        overrideAttrData(attr, type, model, domItem);
                    }


                });

                if (removeAttr === true) {
                    $(items).removeAttr("data-" + settings.prefix + "-field");
                    $(items).removeAttr("data-" + settings.prefix + "-attribute");
                }
                //cloneDomItem.show();
                checkNonVisibleItems(model, cloneDomItem);

                htmlToInsert += $('<div>').append(cloneDomItem).html();
            });


            if (parent.is("select")) {
                htmlToInsert = "<option selected>select one</option>" + htmlToInsert;
            }
            parent.append($.parseHTML(htmlToInsert));
            parent.show();
            checkNonVisibleItems();

            if (settings.showPerformanceInfo) {
                var end = new Date().getTime();
                var time = end - start;
                console.log('Time to append ' + models.length + ' of ' + type + ':::' + time);
            }
        }


        function _getloadHelperInfo (domItem, model, field, type, actionInfo) {
            var str = "";
            if ($.isArray(model[field]) ) {
                var models = On24Store.findByIdsList(model[field], actionInfo.helper[field]);

                //we need to get second part
                var modelField = $(domItem).data(settings.prefix + "-field").split(".")[1];
                $.each(models, function (index, item) {
                    if (str != "") {
                        str += ", ";
                    }
                    str += item[modelField];
                })
            }

            return str;
        }




        /**
         * init plugin function. First of all, while we getting preload info from the server, we hide
         * all dynamic parts from the app
         */
        function init () {
            var promises = [],
                actionInfo,
                preloadNumberOfItems = 0,
                checkData = function () {
                    _checkMappingURL();
                    promises = _initDataLibrary();

                    $.when.apply($, promises)
                        .then(function(data) {
                            _initEventsLibrary();
                            settings.ready();
                        })
                        .fail(function (data) {
                            console.log("fail")
                        });
                };


            //check if we need to hide all elements with data-on24-visible directive
            _hideElements();

            //if we need to preload some model
            if (settings.preloadFields.length > 0) {
                $.each(settings.preloadFields, function (index, preloadField) {
                    actionInfo = settings.actionMap[preloadField];

                    //create parameters for find method
                    var parameters = {
                        selectedFilters     : selectedFilters,
                        action              : actionInfo,
                        settings            : settings,
                        pageNumber          : actualContentPage
                    };
                    On24Store.findPaginatedByType(parameters)
                        .done(function(models, action) {
                            if (action.modelName == "user") {
                                //load roles for user values
                                loggedUser = models;
                            }
                            preloadNumberOfItems++;

                            if (preloadNumberOfItems == settings.preloadFields.length || settings.preloadFields.length == 0) {
                                checkData();
                            }
                        }).fail(function (data) {
                            console.log("There was an error while getting preload fields")
                        });

                });
            } else {
                checkData();
            }
        }

        //Initialize the plugin
        init();

        return this;

    }

}(jQuery));

