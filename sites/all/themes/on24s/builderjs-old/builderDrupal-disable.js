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

var BrowserDetect = {
    init: function () {
        this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
        this.version = this.searchVersion(navigator.userAgent)
            || this.searchVersion(navigator.appVersion)
            || "an unknown version";
        this.OS = this.searchString(this.dataOS) || "an unknown OS";
    },
    searchString: function (data) {
        for (var i=0;i<data.length;i++)	{
            var dataString = data[i].string;
            var dataProp = data[i].prop;
            this.versionSearchString = data[i].versionSearch || data[i].identity;
            if (dataString) {
                if (dataString.indexOf(data[i].subString) != -1)
                    return data[i].identity;
            }
            else if (dataProp)
                return data[i].identity;
        }
    },
    searchVersion: function (dataString) {
        var index = dataString.indexOf(this.versionSearchString);
        if (index == -1) return;
        return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
    },
    dataBrowser: [
        {
            string: navigator.userAgent,
            subString: "Chrome",
            identity: "Chrome"
        },
        { 	string: navigator.userAgent,
            subString: "OmniWeb",
            versionSearch: "OmniWeb/",
            identity: "OmniWeb"
        },
        {
            string: navigator.vendor,
            subString: "Apple",
            identity: "Safari",
            versionSearch: "Version"
        },
        {
            prop: window.opera,
            identity: "Opera"
        },
        {
            string: navigator.vendor,
            subString: "iCab",
            identity: "iCab"
        },
        {
            string: navigator.vendor,
            subString: "KDE",
            identity: "Konqueror"
        },
        {
            string: navigator.userAgent,
            subString: "Firefox",
            identity: "Firefox"
        },
        {
            string: navigator.vendor,
            subString: "Camino",
            identity: "Camino"
        },
        {		// for newer Netscapes (6+)
            string: navigator.userAgent,
            subString: "Netscape",
            identity: "Netscape"
        },
        {
            string: navigator.userAgent,
            subString: "MSIE",
            identity: "IE",
            versionSearch: "MSIE"
        },
        {
            string: navigator.userAgent,
            subString: "Gecko",
            identity: "Mozilla",
            versionSearch: "rv"
        },
        { 		// for older Netscapes (4-)
            string: navigator.userAgent,
            subString: "Mozilla",
            identity: "Netscape",
            versionSearch: "Mozilla"
        }
    ],
    dataOS : [
        {
            string: navigator.platform,
            subString: "Win",
            identity: "Windows"
        },
        {
            string: navigator.platform,
            subString: "Mac",
            identity: "Mac"
        },
        {
            string: navigator.userAgent,
            subString: "iPhone",
            identity: "Apple"
        },
        {
            string: navigator.userAgent,
            subString: "iPod",
            identity: "Apple"
        },
        {
            string: navigator.userAgent,
            subString: "iPad",
            identity: "Apple"
        },
        {
            string: navigator.platform,
            subString: "Linux",
            identity: "Linux"
        }
    ]

};


/**
 * On24 Webcast Utils for Builder Plugin
 *
 * @author Alberto Perez  <alberto.perez@on24.com>
 * @copyright 2014 ON24 Inc.
 */
var On24WebcastUtil = (function (options, undefined) {


    function getWebcastConsoleDetails (id, format){
        var dfd = $.Deferred(),
            obj = {
                async: false
            };
        obj.resourceId = id;
        if(format){
            obj.format = format;
        }

        //TODO: generate URL
        var serviceURL = " action:createWebcastLaunchUrl";
        $.ajax({
            url:            serviceURL,
            dataType :      "json",
            contentType:    "text/json",
            data:           obj,
            async:          false,
            type:           "POST",
            success : function (data) {
                dfd.resolve(data);
            },
            error : function (error) {
                dfd.reject(error);
            }
        });

        return dfd;
    }


    return {



        getWebcastUrl : function  (webcast, async){
            var format = "",
                playerFormats,
                formatCodesArray = [],
                filteredFlashVideoPlayerArray,
                filteredNonFlashVideoPlayerArray,
                filteredFlashAudioPlayerArray,
                filteredNonFlashAudioPlayerArray,
                filteredWMPlayerArrayForIE,
                filteredRMPlayerArrayForFF,
                url = "";

            // If it is an external webcast
            if(!(webcast.isInternal === true || webcast.isInternal === "Y")) {
                url = webcast.sourceUrl;
                //return Resource.addTokenToUrl(url); TODO::::
            } else {
                //else internal check for player formats
                playerFormats = webcast.playerFormats || [];
                $.each(playerFormats, function (key, item) {
                    if (item !== "playerFormats") {
                        formatCodesArray.push(item.code);
                    }
                });
                /*for(var i=0; playerFormats && i<playerFormats.length; i++){
                 formatCodesArray.push(playerFormats[i].code);
                 }*/

                filteredFlashVideoPlayerArray = $.grep(formatCodesArray, function(n, i){
                    return (n.toLowerCase().indexOf("fh") === 0 && (n.toLowerCase().indexOf("video") || n.toLowerCase().indexOf("multi")) > -1);
                });

                format = filteredFlashVideoPlayerArray[0] || "";

                if(format === "") {
                    filteredNonFlashVideoPlayerArray = $.grep(formatCodesArray, function(n, i){
                        return (n.toLowerCase().indexOf("mov") === 0 && (n.toLowerCase().indexOf("video") || n.toLowerCase().indexOf("multi")) > -1);
                    });
                    format = filteredNonFlashVideoPlayerArray[0] || "";
                }

                if(format === "") {
                    filteredFlashAudioPlayerArray = $.grep(formatCodesArray, function(n, i){
                        return (n.toLowerCase().indexOf("fh") === 0 && n.toLowerCase().indexOf("audio") > -1);
                    });
                    format = filteredFlashAudioPlayerArray[0] || "";
                }

                if(format === "") {
                    filteredNonFlashAudioPlayerArray = $.grep(formatCodesArray, function(n, i) {
                        return (n.toLowerCase().indexOf("mov") === 0 && n.toLowerCase().indexOf("audio") > -1);
                    });
                    format = filteredNonFlashAudioPlayerArray[0] || "";
                }

                if (format === "" && BrowserDetect.browser == "IE") { //&& !wmaudio ->pick first wm* with default being wmaudio
                    filteredWMPlayerArrayForIE = $.grep(formatCodesArray, function(n, i){
                        return (n.toLowerCase().indexOf("wm") === 0 && n!="wmaudio");
                    });
                    format=(filteredWMPlayerArrayForIE.length>0)? filteredWMPlayerArrayForIE[0] : "wmaudio";
                }

                if (format === "" && BrowserDetect.browser == "Firefox") { //&& !rmaudio && !rmnonstreaming ->pick first rm* with default being rmaudio
                    filteredRMPlayerArrayForFF = $.grep(formatCodesArray, function(n, i){
                        return (n.toLowerCase().indexOf("rm") === 0 && n!="rmaudio");
                    });
                    format=(filteredRMPlayerArrayForFF.length>0)? filteredRMPlayerArrayForFF[0] : "rmaudio";
                }

                if(format === "") {
                    format = formatCodesArray.length > 0 ? formatCodesArray[0] : "";
                }

                var webcastUrlObj = "";
                if (!async) {
                    webcastUrlObj = getWebcastConsoleDetails(webcast.id,format, async);

                    if((webcast.launchLobby && (webcast.launchLobby==true||webcast.launchLobby=="Y")) || webcast.isLiveShow()){
                        url = webcastUrlObj.lobbyUrl;
                    }else{
                        url = webcastUrlObj.url;
                        if(Constants.isMobile == "true" || (Constants.userAgent.indexOf("iPad") > -1 || Constants.userAgent.indexOf("iPhone") > -1 || Constants.userAgent.toLowerCase().indexOf("android") > -1)){ // is Mobile device
                            var domainPart = url.substring(0,url.indexOf("com")+3)
                            //                    var pagePart = domainPart+"/clients/default/presentation/default.html";
                            var pagePart = domainPart+"/eventRegistration/console/EventConsoleApollo.jsp";
                            var stringQueryPart = url.substring(url.indexOf("?")+1);
                            var internalUrlPart = pagePart+"?mobile=true&flashsupportedmobiledevice=false&";
                            url = internalUrlPart+stringQueryPart;
                        }
                    }
                    webcast.consoleUrl = url;

                } else {
                    getWebcastConsoleDetails(webcast.id,format, async).done(function (webcastUrlObj) {
                        if((webcast.launchLobby && (webcast.launchLobby==true||webcast.launchLobby=="Y")) || webcast.isLiveShow()){
                            url = webcastUrlObj.lobbyUrl;
                        }else{
                            url = webcastUrlObj.url;
                            if(Constants.isMobile == "true" || (Constants.userAgent.indexOf("iPad") > -1 || Constants.userAgent.indexOf("iPhone") > -1 || Constants.userAgent.toLowerCase().indexOf("android") > -1)){ // is Mobile device
                                var domainPart = url.substring(0,url.indexOf("com")+3)
                                //                    var pagePart = domainPart+"/clients/default/presentation/default.html";
                                var pagePart = domainPart+"/eventRegistration/console/EventConsoleApollo.jsp";
                                var stringQueryPart = url.substring(url.indexOf("?")+1);
                                var internalUrlPart = pagePart+"?mobile=true&flashsupportedmobiledevice=false&";
                                url = internalUrlPart+stringQueryPart;
                            }
                        }
                        webcast.consoleUrl = url;

                    });
                }
            }

            return url;
        }

    }
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
            if (categories) {
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
            /**var link = "";
             if (settings.derived[field]) {
                link = settings.derived[field]();

                var parameters = On24Util.getParameters();
                if (parameters != "") {
                    link = link +  parameters;
                }
                $(domItem).attr("href", link);

            }**/
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
                if ($.type( item[attr] ) === "string") {
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
                    if (item[attr].toLowerCase().indexOf(filterValue.toLowerCase()) > -1) {
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
        categoryPageIsLoaded = false,
        actualSort,
        baseURL = "";//http://localhost.on24.com/drupal/";



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
        var categoriesList = "",
            serviceURL = parameters.serviceURL,
            action = parameters.action,
            selectedFilters = parameters.selectedFilters,
            type = parameters.type,
            showCode = parameters.settings.showCode,
            showId = parameters.settings.tradeshowId;

        if (serviceURL != undefined) {
            serviceURL = serviceURL;
        } else {
            serviceURL = baseURL +  action.url; //showCode +
        }


        if (action.addPartnerref === true) {
            //we need to add partnerref
            var partnerref = On24Util.getPartnerref(parameters.settings.partnerref);
            if (partnerref && partnerref != "") {
                serviceURL += "&partnerref=" + On24Util.getPartnerref(parameters.settings.partnerref)
            }

        }

        if (selectedFilters[type] && type == "content") {
            if (selectedFilters[type]["categoryPageFilter"] && selectedFilters[type]["categoryPageFilter"].length > 0) {
                serviceURL += "&categoryId=" + selectedFilters[type]["categoryPageFilter"][0].value;
            }

            if (selectedFilters[type]["serverCategoryFilter"] && selectedFilters[type]["serverCategoryFilter"].length > 0) {

                for (var i = 0; i < selectedFilters[type]["serverCategoryFilter"].length; i++) {

                    var value = selectedFilters[type]["serverCategoryFilter"][i].value;
                    if (value != undefined && $.inArray( value , loadedCategories) == -1) {
                        if (categoriesList != "") {
                            categoriesList += ","
                        }
                        categoriesList+= value;
                        loadedCategories.push(value);
                    }
                }
            }

            if (categoriesList != "") {
                serviceURL += "&secondaryCategoryIds=" + categoriesList;
            } else if (categoryPageIsLoaded === true) {
                serviceURL = "";
            }

            categoryPageIsLoaded = true;
        }

        if (type == "category") {
            serviceURL += "&currentTradeshowId=" + showId;
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

        findByIdsList:function (list, type) {
            var models = store[type];
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
                serviceURL = baseURL + action.url,
                models,
                foundedModels,
                showCode = parameters.settings.showCode,
                showId = parameters.settings.tradeshowId,
                externalId = parameters.externalId,
                type = parameters.type,

                cloneItem;

            /**if (type === "singlecontent") {
                serviceURL += "/" + externalId;
            }**/


            if (isURLinCache(serviceURL)) {
                models = store[type];
                foundedModels = [];

                /**if (models != null) {
                    $.each( models, function (index, item) {
                        if (item.externalResourceId == externalId) {
                            foundedModels.push($.extend(true, {}, item));
                        }
                    });
                } else {
                    console.log("model of " + type + " is null");
                }**/
                dfd.resolve(models);
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

                        if ($.isArray(models)) {
                            foundedModels = [];

                            /**if (models != null) {
                                $.each( models, function (index, item) {
                                    if (item.externalResourceId == externalId) {
                                        cloneItem = $.extend(true, {}, item);
                                        foundedModels.push(cloneItem);
                                    }
                                });
                            } else {
                                console.log("model of " + type + " is null")
                            }**/

                            dfd.resolve(models);
                        } else {
                            dfd.resolve(models);
                        }

                    }
                });
            }

            return dfd;
        },



        updateProfile : function (parameters) {

            var serviceURL = "",
                dfd = $.Deferred(),
                selectedFilters = parameters.selectedFilters,
                action = parameters.action,
                showCode = parameters.settings.showCode,
                loggedUser = parameters.loggedUser,
                showId = parameters.settings.showId;

            serviceURL += baseURL + showCode +  action.url;

            serviceURL += "&currentUserId=" + loggedUser.id + "&tradeshowId=" + showId + "&currentTradeshowId=" + showId;


            $.ajax({
                url:            serviceURL,
                dataType :      action.dataType,
                contentType:    action.contentType,
                data:           JSON.stringify(loggedUser),
                async:          true,
                type:           action.type,

                success: function(userData) {
                    loggedUser = userData;
                    dfd.resolve(loggedUser);
                },

                error: function (error) {
                    dfd.reject(error);
                    console.log("Update profile failed: " + error);
                }
            });

            return dfd;
        },


        loginUser: function (parameters) {
            var serviceURL = "",
                selectedFilters = parameters.selectedFilters,
                action = parameters.action,
                showCode = parameters.settings.showCode,
                userData = parameters.user,
                showId = parameters.settings.tradeshowId,
                regPageId = parameters.settings.regPageId,
                dfd = $.Deferred();

            serviceURL += baseURL + showCode +  action.url;
            // serviceURL += "&email=" + userData.email + "&password=" + userData.password;// + "&emailVerificationKey=" + ;



            var userInfo = {
                email       : userData.email,
                password    : userData.password,
                async       : false
            };

            $.ajax({
                url:                serviceURL,
                dataType:           action.dataType,
                contentType :       action.contentType,
                data         :       JSON.stringify(userInfo), //userInfo
                async:              false,
                type:               action.type,
                success: function(userData) {
                    if (!userData || (userData && userData.error != undefined)) {
                        dfd.reject(userData);
                    } else {
                        dfd.resolve(userData);
                    }

                },
                error: function (response) {
                    if (response.error) {
                        //TODO: CHECK ALL EXCEPTIONS
                        /**switch (response.error) {
                        case "USER_ALREADY_REGISTERED" :
                            alert("User already Registered");
                        default:
                            alert("There was an error: " + response.error);
                    }**/
                    }

                    dfd.reject(response);

                }
            });

            return dfd;
        },


        registerUser: function (parameters) {
            var serviceURL = "",
                selectedFilters = parameters.selectedFilters,
                action = parameters.action,
                showCode = parameters.settings.showCode,
                loggedUser = parameters.user,
                showId = parameters.settings.tradeshowId,
                regPageId = parameters.settings.regPageId,
                dfd = $.Deferred();

            serviceURL += baseURL + showCode +  action.url;
            serviceURL += "&currentUserId=" + loggedUser.id + "&tradeshowId=" + showId + "&regPageId=" + regPageId;

            $.ajax({
                url:                serviceURL,
                dataType:           action.dataType,
                contentType :       action.contentType,
                data:               JSON.stringify(loggedUser),
                async:              true,
                type:               action.type,
                success: function(userData) {
                    loggedUser = userData;
                    dfd.resolve(loggedUser);
                },
                error: function (response) {
                    if (response.error) {
                        //TODO: CHECK ALL EXCEPTIONS
                        switch (response.error) {
                            case "USER_ALREADY_REGISTERED" :
                                alert("User already Registered");
                            default:
                                alert("There was an error: " + response.error);
                        }
                    }

                    dfd.reject(response);

                }
            });

            return dfd;
        },


        updateContentLog: function (parameters) {
            var serviceURL = "",
                resourceId = parameters.content.id,
                action = parameters.action,
                showCode = parameters.settings.showCode,
                dfd = $.Deferred();

 console.log('updateContentLog');
            serviceURL =   action.url;
            // serviceURL += "&resourceId=" + resourceId ;

            $.ajax({
                url:                serviceURL,
                dataType:           action.dataType,
                contentType :       action.contentType,
                async:              true,
                type:               action.type,
                success: function(data) {
                    dfd.resolve();
                },
                error: function (response) {
                    if (response.error) {
                        alert("There was an error: " + response.error);
                    }

                    dfd.reject(response);
                }
            });

            return dfd;
        },


        findPaginatedByType : function (parameters) {
            var dfd = $.Deferred(),
                models = [],
                action = parameters.action,
                size = parameters.pageSize || action.offset,
                pageNumber = parameters.pageNumber,
                serviceURL = parameters.url,
                showCode = parameters.settings.showCode,
                showId = parameters.settings.tradeshowId,
                selectedFilters = parameters.selectedFilters;


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
                    error: function () {
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

                            if (selectedFilters[type]["serverCategoryFilter"] && selectedFilters[type]["serverCategoryFilter"].length > 0) {
                                //if exists any role filter, match scenarios, if not, return all content under the page
                                matched = false;
                                $.each(selectedFilters[type]["serverCategoryFilter"], function (index, filterField) {
                                    fields = filterField.fields;
                                    filterValue =filterField.value;

                                    matched = On24Filter.filterByCategory(fields, filterValue, item, matched, false);
                                });
                            }

                            if (selectedFilters[type]["categoryFilter"] && selectedFilters[type]["categoryFilter"].length > 0) {
                                //matched = false;
                                $.each(selectedFilters[type]["categoryFilter"], function (index, filterField) {
                                    fields = filterField.fields;
                                    filterValue =filterField.value;

                                    matched = On24Filter.filterByCategory(fields, filterValue, item, matched, true);
                                });
                            }
                        }

                        if (matched == true) {
                            if (selectedFilters[type]["categoryPageFilter"] && selectedFilters[type]["categoryPageFilter"].length > 0) {
                                //matched = false;
                                $.each(selectedFilters[type]["categoryPageFilter"], function (index, filterField) {
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
                showCode = parameters.settings.showCode,
                showId = parameters.settings.showId,
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
 *  data-on24-<model>="repeat" means our DOM Element need to load data. Plugin support any data structure (array or model).
 *          Also, repeat means for any data, repeat children structure
 *      data-on24-category="repeat"    -->     load Category Models
 *      data-on24-content="repeat"     -->     load Content Models
 *      data-on24-tradeshow="repeat"   -->     load Tradeshow Models
 *
 *      data-on24-category="no-repeat"    -->    hardcoder Category Models
 *      data-on24-content="no-repeat"     -->    hardcoder Content Models
 *      data-on24-tradeshow="no-repeat"   -->    hardcoder Content Models
 *
 *      Also, plugin support query format for supported models:
 *
 *      data-on24-category-query="parentId=3"    -->     where parentId is Category Attribute we need to filter by value equals 3
 *      data-on24-content-query="sponsorId=2"    -->     where sponsorId is Content Attribute and we need to filter by value equals 2
 *
 *      We repeat this block of code same times as models we get from server when value is "repeat". We usually use "no-repeat" when
 *      we need to hardcoder some value.
 *
 *
 *
 *          data-on24-field="name"      -->      we need to set "name" field of category model to invoke text function of
 *                                              the DOM element with this value
 *          data-on24-attribute="id"    -->      we need to set "id" field of category model as attribute ("data-id")
 *                                              inside of the DOM element. This is setting by DEFAULT
 *          data-on24-field="title"      -->     we need to set "name" field of category model to invoke text function of
 *                                              the DOM element with this value
 *
 *          data-on24-field="relatedContent"-->  if "relatedContent" is an Array, we get info and repeat all childrens under
 *                                              this node.
 *
 *
 *********** Usage:*****************************************************************************************************
 *
 *
 *********** Events:*****************************************************************************************************
 *
 *  data-on24-event-name     --> name of the event;
 *
 *          @example:
 *
 *              onChangeCategory; mouseOver:showCategoryTooltip  --> any time we click inside DOM item,
 *                  we launch onChangeCategory and any time we launch mouseOver, we call to showCategoryTooltip. Click
 *                  is setting by DEFAULT
 *

 *
 *********** Events:*****************************************************************************************************
 *
 *********** options:***************************************************************************************************
 *
 *      prefix                  -->     data-on24* means, by default, on24 is our prefix for data conflicts values
 *      container               -->     container where plugin is applicable.
 *      supportedFields         -->     fields (models) plugin support. If we don't use "content", we can override thius value
 *                                      to get better performance.
 *      hideContent             -->     automatically hidden dynamic content until load data. By dafault, setting to FALSE. It means,
 *                                      web designer should be hidden dinamic content. Automatically, framework call to jquery show()
 *                                      function when data is loaded.
 *      showPerformanceInfo     -->     performance information. Only true for development mode.
 *      site                    -->     path where we save portal images.
 *      partnerref              -->     name of the partnerref url parameter. By default, "partnerref".
 *      preloadFields           -->     data we need to load at the beginning
 *      gatedSponsorId          -->     id of Gated Sponsor configuration of our show
 *      tradeshowId             -->     id of the show
 *      regPageId               -->     id of the registration page id
 *      assetTypes              -->     id of asset type main category
 *      categoryType            -->     id of the solutions main category
 *      interestAreasTypes      -->     id of interest area main category
 *      rolesTypes              -->     if od role main category
 *
 *
 *
 *      derived                 -->     derived properties. Add some logic to one expressión. We can combine multiple derived properties
 *                                      when it's necessary, merge default derived with our custom derived properties for each project.
 *
 *             @example:
 *
 *                  isGated             -->     return if a content is gated or not
 *                  isDocument          -->     check if a content model is a document or not
 *                  isWebcast           -->     check is a content is a webcast or not
 *                  userLogged          -->     return if an user is logged into app or not
 *                  assetTypes          -->     return the asset types categories for a content model
 *                  categoryType        -->     return the solutions categories for a content model
 *                  interestAreasType   -->     return the interest areas categories for a content model
 *                  rolesType           -->     return the roles categories for a content model
 *                  card_image          -->     return card image path according  /view/sitecom/images/content/<contentid>_card.jpg
 *                  d2c_image           -->     return d2c image path according /view/sitecom/images/content/<contentid>_d2c.jpg
 *                  featured_image      -->     return the feature image path according /view/sitecom/images/content/<contentid>_featured.jpg
 *                  d2c_url             -->     return content link http(s)://site.com/content/<externalid>
 *                  rolesType           -->     return the roles categories for a content model
 *                  isRolePage          -->     determine if we enter into a category page filtered by any role
 *                  isInterestPage      -->     determine if we enter into a category page filtered by any interest area type
 *
 *
 *
 *      actionMap               -->     mapping model logic
 *
 *
 *          @example:
 *
 *              url                 -->     service url we use for getting information
 *              dataType            -->     service data type
 *              contentType         -->     service content type
 *              paramName           -->     server response first json node name. In some scenarios, it is "data", but other APIs
 *                                          are different
 *              modelName           -->     name of the returned model
 *              type                -->     kind of call
 *              fixture             -->     fixture file. For testing, add jQuery.fixture.js plugin
 *              defaultSort         -->     default Sort of the collection
 *              offset          -->     number of items to show. We get all information from the server, and show the "offset"
 *                                      first.
 *              replace         -->     some model attributes are not very clear for end users, so we can rename it
 *                                      using this structure:
 *
 *                                          @example:
 *                                              "cat" : "categories",
 *                                              "classType" : "lastUpdateTimestamp"
 *
 *                                       any time user put into the html data-content-field="cat.classType", instead of
 *                                       try to search "classType" attributte in content model, we return value for
 *                                       "lastUpdateTimestamp".
 *
 *                                       Use only when you need some name replacements.
 *              helper          -->     is several scenarios, we have an attribute, and it's a list of models ids. For
 *                                      searching info in the correct model structure, we need to create a helper.
 *
 *                                          @example:
 *                                              "categories" : "category"
 *
 *                                       any time user put into the html data-content-field="cat.name" , first, according
 *                                       replace example, cat means categories, so categories helper exists and return us
 *                                       the category model, and we need to return all categories name than match with ids.
 *                                       Note, plugin, at the moment, only support an array of ids.
 *
 *              listenEvents    -->     events we need to subscribe.
 *
 *                                          @example:
 *
 *                                           "listenEvents" : [
 *                                               "search",
 *                                               "categoryFilter"
 *                                            ]
 *
 *                                          this block of models listen search event and categoryFilter event
 *
 *              defaultTriggerEvent    -->    default event published by default
 *
 *
 *
 *
 *
 *     eventMap    -->    event metadata information
 *
 *                  @example:
 *
 *                  "search" : {
 *                       "fields"    : [
 *                           "title",
 *                           "description"
 *                       ],
 *                       "modelName"  :       "content"
 *                   },
 *
 *                   search event find in title and description fields, inside the content model.
 *
 *
 *      urlMap      -->   mapping url items:
 *
 *          content     -->   http://www.site.com/content/<id>
 *
 *                  get content id and show it automatically into the html
 *
 *                  @example:    <a data-on24-field="name"/>
 *
 *          default     -->   http://www.site.com/security
 *
 *                  get all content inside the "security" category. By default, mapping is execute and compare with the name,
 *                  but we can set the options to allow better url
 *
 *                  @example:    <a data-on24-field="name"/>
 *
 *                       mapping:        {
 *                            "security"  : 2
 *                       }
 *
 *
 * @copyright 2014 ON24 Inc.
 *
 */
(function($){

    $.fn.builder = function(options) {

        var settings = $.extend(true,{
            prefix:                     'on24',
            container:                  'body',
            supportedFields:            ["content", "user", "featuredcontent", "role", "interestareas", "assettype", "relatedcontent", "singlecontent"
],
            hideContent:                false,
            showPerformanceInfo:        true,
            site:                       "newwccportal",
            partnerref:                 "partnerref",
            derived : {
                "isGated" : function (model, gatedSponsorId) {
                    return model.sponsorId == gatedSponsorId;
                },
                "isDocument" : function (model) {
                    return model.classType == "DOCUMENT";
                },
                isWebcast : function (model) {
                    return model.classType == "WEBCAST";
                },
                userLogged : function (model) {
                    return model.source == "DELAYED_REGISTRATION";
                },
                "assetTypes" : function (model, assetType, categories) {
                    var list;
                    if (model.assetType) {
                        list = model.assetType.split(",");
                    } else {
                        list = model.assetTypeId.split(",");
                    }
                    return On24Util.getCategoryStr(categories, list);
                },
                "categoryType" : function (model, categoryType, categories) {

                    return On24Util.getCategoryStr(categories, model, categoryType);
                },
                "interestAreasType" : function (model, interestAreasType, categories) {
                    var list;
                    if (model.interestAreas) {
                        list = model.interestAreas.split(",");
                    } else {
                        list = model.interestAreas.split(",");
                    }
                    return On24Util.getCategoryStr(categories,list);
                },
                "rolesType" : function (model, rolesType, categories) {
                    var list;
                    if (model.roles) {
                        list = model.roles.split(",");
                    } else {
                        list = model.roles.split(",");
                    }
                    return On24Util.getCategoryStr(categories,list);
                },
                "card_image" : function (model,site) {
                    var path =  "/view/" + site  + "/images/content/" + model.id + "_card.jpg",
                        http = On24Util.checkImage(path);

                    if (http.status == 200){
                        return path;
                    } else {
                        return  "/view/" + site  + "/images/content/default_card.jpg";
                    }
                },

                "d2c_image" : function (model,site) {
                    var path =  "/view/" + site  + "/images/content/" + model.id + "_d2c.jpg",
                        http = On24Util.checkImage(path);

                    if (http.status == 200){
                        return path;
                    } else {
                        return  "/view/" + site  + "/images/content/default_d2c.jpg";
                    }
                },
                "featured_image" : function (model,site) {
                    var path =  "/view/" + site  + "/images/content/" + model.id + "_featured.jpg",
                        http = On24Util.checkImage(path);;

                    if (http.status == 200){
                        return path;
                    } else {
                        return  "/view/" + site  + "/images/content/default_featured.jpg";
                    }
                },
                "d2c_url" : function (model,site) {
                    var link =  model.path;//"http://imcs-aws-dev.on24.com/content/";
                    //link += model.id;

                    return link
                },

                "role_url" : function (model,site) {
                    var link =  '/' + model.path;

                    return link
                },

                "interest_url" : function (model,site) {
                    var link =  model.path;

                    return link
                },

                "isRolePage" : function (categories, rolePageId, categoryUrlId) {
                    return On24Util.isParentCategory(categories, rolePageId, categoryUrlId);
                },

                "isInterestPage" : function (categories, rolePageId, categoryUrlId) {
                    return On24Util.isParentCategory(categories, rolePageId, categoryUrlId);
                }

            },
            preloadFields:              ["assettype"],//"user", "category"
            actionMap: {
                /**"user" : {
                    "url" :                 "?command=newlogin&action=registerAnonymousUser&f=json",
                    "dataType" :            "json",//"text/json; charset=utf-8",
                    "contentType":          "text/json",
                    "type" :                "get",
                    "modelName":            "user",
                    "addPartnerref":        true,
                    "offset":               "1",
                    "replace" : {
                    },
                    "helper" : {
                    },
                    "listenEvents" : [
                        "loginUser",
                        "registerUser",
                        "updateProfile",
                        "launchContent"
                    ]
                },

                "updateProfile" : {
                    "url" :                 "?&command=user&action=update&f=json",
                    "dataType" :            "json",
                    "contentType":          "text/json",
                    "type" :                "POST",
                    "modelName":            "user",
                    "replace" : {
                    },
                    "helper" : {
                    }
                },

                "category" : {
                    "url" :                 "/?command=rsrc&action=getResourceCategories&f=json",
                    "paramName":            "categories",
                    "dataType" :            "json",//"text/json; charset=utf-8",
                    "contentType":          "text/json",
                    "modelName":            "category",
                    "type" :                "get",
                    "fixture" :             "fixture/categories.json",
                    "defaultTriggerEvent":  "categoryFilter",
                    "listenEvents" : [

                    ]
                },**/

                "assettype" : {
                    //"url" :                 "/lst/assets",
                    "paramName":            "nodes",
                    "dataType" :            "json",//"text/json; charset=utf-8",
                    "contentType":          "text/json",
                    "modelName":            "assettype",
                    "type" :                "get",
                    "defaultTriggerEvent":  "categoryFilter",
                    "listenEvents" : [

                    ]
                },

                "role" : {
                    //"url" :                 "/txn/3",
                    "paramName":            "nodes",
                    "dataType" :            "json",//"text/json; charset=utf-8",
                    "contentType":          "text/json",
                    "modelName":            "role",
                    "type" :                "get",
                    "defaultTriggerEvent":  "categoryFilter",
                    "listenEvents" : [

                    ]
                },

                "interestareas" : {
                    //"url" :                 "/txn/2",
                    "paramName":            "nodes",
                    "dataType" :            "json",//"text/json; charset=utf-8",
                    "contentType":          "text/json",
                    "modelName":            "interestareas",
                    "type" :                "get",
                    "defaultTriggerEvent":  "categoryFilter",
                    "listenEvents" : [

                    ]
                },

                "content" : {
                    //"url" :                 "/rest/view/role_view",
                    "dataType" :            "json",//"text/json; charset=utf-8",
                    "contentType":          "text/json",
                    "paramName":            "nodes",
                    "modelName":            "content",
                    "type" :                "get",
                    "fixture" :             "fixture/contents.json",
                    "defaultSort":          "sortContent",
                    "offset":               9,
                    "replace" : {
                        "cat" :                     "resourceCategories",
                        "classType" :               "lastUpdateTimestamp"
                    },
                    "helper" : {
                        "resourceCategories" :              "category"
                    },
                    "listenEvents" : [
                        "search",
                        "sortContent",
                        "serverCategoryFilter",
                        "categoryFilter",
                        "loadMoreContent",
                        "launchContent"
                    ]
                },

                "featuredcontent" : {
                    //"url" :                 "/featured_content",
                    "dataType" :            "json",//"text/json; charset=utf-8",
                    "contentType":          "text/json",
                    "paramName":            "nodes",
                    "modelName":            "featuredcontent",
                    "type" :                "get",
                    "defaultSort":          "sortContent",
                    "offset":               5,
                    "replace" : {

                    },
                    "helper" : {
                        "resourceCategories" :              "category"
                    },
                    "listenEvents" : [
                        "search-featured",
                        "sortContent",
                        "serverCategoryFilter",
                        "categoryFilter",
                        "loadMoreContent",
                        "launchContent"
                    ]
                },

                "relatedcontent" : {
                    //"url" :                 "/featured_content",
                    "dataType" :            "json",//"text/json; charset=utf-8",
                    "contentType":          "text/json",
                    "paramName":            "nodes",
                    "modelName":            "relatedcontent",
                    "type" :                "get",
                    "defaultSort":          "sortContent",
                    "offset":               3,
                    "replace" : {

                    },
                    "helper" : {

                    },
                    "listenEvents" : [
                        "launchContent"
                    ]
                },

                "singlecontent" : {
                    //"url" :                 "/rest/node",//&externalResourceId=ext1 resourceId
                    "dataType" :            "json",
                    "contentType":          "text/json",
                    "modelName":            "content",
                    "paramName":            "node",
                    "type" :                "get",
                    "offset":               "1",
                    "replace" : {

                    },
                    "helper" : {

                    },
                    "listenEvents" : [

                    ]
                }
                /**"registerUser" : {
                    "url" :                 "?&command=reg&action=delayedRegistration&f=json",
                    "dataType" :            "json",
                    "contentType":          "text/json",
                    "type" :                "POST",
                    "modelName":            "user",
                    "replace" : {
                    },
                    "helper" : {
                    }
                },

                "loginUser" : {
                    "url" :                 "?&command=login&f=json",
                    "dataType" :            "json",
                    "contentType":          "text/json",
                    "type" :                "POST",
                    "modelName":            "user"
                },

                "updateContentLog" : {
                    "url" :                 "?command=log&action=resource&f=json",
                    "dataType" :            "json",
                    "contentType":          "text/json",
                    "type" :                "get",
                    "modelName":            "content"
                }**/


            },
            eventMap: {
                "search" : {
                    "fields"    : [
                        "title",
                        "abstract"
                    ],
                    "modelName"  :       "content",
                    "eventName"  :           "keyup"
                },
                "search-featured" : {
                    "fields"    : [
                        "title",
                        "abstract"
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

                /**"categoryPageFilter"   : {
                    "fields"    : [
                        "categories"
                    ],
                    "modelName"  :       "content",
                    "eventName"  : "click"
                },

                "categoryFilter"   : {
                    "fields"    : [
                        "categories"
                    ],
                    "modelName"  :       "content",
                    "eventName"  : "click"
                },

                "serverCategoryFilter"   : {
                    "fields"    : [
                        "categories"
                    ],
                    "modelName"  :       "content",
                    "eventName"  : "click"
                },

                "updateProfile" : {
                    "fields" : [
                        "notes"
                    ],
                    "modelName" :   "user",
                    "eventName" :   "click"
                },

                "registerUser" : {
                    "fields" : [
                        ""
                    ],
                    "modelName" :   "user",
                    "eventName" :   "click"
                },

                loginUser : {
                    "fields" : [
                        ""
                    ],
                    "modelName" :   "user",
                    "eventName" :   "click"
                },**/

                "loadMoreContent"   : {
                    "fields"    : [

                    ],
                    "modelName"  :       "content",
                    "eventName"  : "click"
                },

                "launchContent" : {
                    "fields" : {

                    },
                    modelName:  "content",
                    eventName:  "click"
                }
            },
            urlMap: {
                "content" :{
                    urlMapping:     "content",
                    model:          "singlecontent",
                    isModel:        true,
                    index:          1,
                    mapping:        {

                    }
                },
                "role": {
                    urlMapping:     "role",
                    model:          "content",
                    isModel:        false,
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
                console.log("hide paginator" + groupName);
            },
            showPaginator:  function(groupName) {
                console.log("show paginator" + groupName);
            }
        },  options);


        //Global variables
        var selectedFilters = {},
            templates = {},
            actualContentPage = 0,
            loggedUser,
            urkMapModelId;

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
                        if (field == "isRolePage") {
                            if (isNegative) {
                                showField = !settings.derived[field](On24Store.getStore()["category"], settings.rolesType, urkMapModelId);
                            } else {
                                showField = settings.derived[field](On24Store.getStore()["category"], settings.rolesType, urkMapModelId);
                            }
                            applyChange = true;
                        } else if (field == "isInterestPage") {
                            if (isNegative) {
                                showField = !settings.derived[field](On24Store.getStore()["category"], settings.interestAreasType, urkMapModelId);
                            } else {
                                showField = settings.derived[field](On24Store.getStore()["category"], settings.interestAreasType, urkMapModelId);
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

        function reloadCheckedRoles () {
            //find data by categoryId
            var datakey, fields, eventItem, userRoles;

            datakey = "data-" + settings.prefix + "-category";
            fields = On24Util.findByData(settings.container, datakey);

            eventItem = settings.eventMap["serverCategoryFilter"];
            if (!selectedFilters[eventItem.modelName]) {
                selectedFilters[eventItem.modelName] = {};
            }

            //when user has any role, then, load default checkboxes
            userRoles = (loggedUser.notes) ? loggedUser.notes.split("|") : [];
            if (userRoles.length == 0) {
                $.each(fields, function (index, node) {
                    var childs = On24Util.getRecursiveChildren($(node));
                    $.each(childs, function (index, domItem) {
                        if ($(domItem).is('input[type=checkbox]') && $(domItem).is(":checked")) {

                            addFilter(eventItem.modelName, "serverCategoryFilter" ,eventItem.fields, $(domItem).data(settings.prefix + "-id") );
                        }
                    });

                });
            } else {
                $.each(fields, function (index, node) {
                    var childs = On24Util.getRecursiveChildren($(node));
                    $.each(childs, function (index, domItem) {
                        if ($(domItem).is('input[type=checkbox]')) {

                            var dataValue = $(domItem).data(settings.prefix + "-id");

                            if ($.inArray(dataValue.toString(), userRoles) > -1) {
                                $(domItem).prop("checked", true);

                                addFilter(eventItem.modelName, "serverCategoryFilter" ,eventItem.fields, dataValue );

                            } else {
                                $(domItem).prop("checked", false);
                            }
                        }
                    });

                });
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

		/**                if (!modelId) {
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
		    } **/
            };


            /**
             * replace a model url (when enter to any content)
             * @param urlMap
             * @param model
             */
            var replaceModelURL = function (urlMap, model) {

                var datakey = "data-" + settings.prefix + "-field",
                    container = $(settings.container).find("[data-" + settings.prefix + "-singlecontent]"),
                    fields = On24Util.findByData(container, datakey);

                $.each(fields, function (index, node) {
                    var field = $(node).data(settings.prefix + "-field");
                    overrideFieldData(field,  urlMap.model , model, $(this) );
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

                        var parameters = {
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

                                        if (urlMap.model == "singlecontent") {

                                            var parameters = {
                                                content: model,
                                                action: settings.actionMap["singlecontent"],
                                                settings: settings
                                            };

                                            On24Store.updateContentLog(parameters);
                                        }

                                    } else {
                                        replaceDefaultURL(urlMap, url);
                                    }
                                    //checkNonVisibleItems(model);
                                    checkNonVisibleItems();
                                }
                            });

                    } else if (urlMap.urlMapping === "default") {
                        replaced = true;
                        replaceDefaultURL(urlMap, url);
                        checkNonVisibleItems();
                    }
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


                    _renderModelItems(items.slice(0, actionInfo.offset), eventItem.modelName, $node, templates[eventItem.modelName]);
                })

        };


        function serializeUser(loggedUser, form) {

            var fields =  decodeURIComponent($(form).serialize()).split("&");
            var modifiedUser = {};
            $.extend(true, modifiedUser, loggedUser);
            $.each (modifiedUser, function (prop, value) {
                var found = false,
                    i = 0;
                while (!found && i < fields.length) {
                    if ($.trim(fields[i].split("=")[0]) == prop) {
                        if (prop == "notes") {
                            modifiedUser[prop] = ""; //clean notes field
                            modifiedUser[prop] = $.trim(fields[i].split("=")[1]);;
                        } else {
                            modifiedUser[prop] = $.trim(fields[i].split("=")[1]);
                        }
                        fields.splice(i,1);

                        found = true;
                    }
                    i++;
                }
            });
            if (fields.length > 0) {
                $.each (fields, function (prop, value) {
                    if (value.split("=")[0] == "notes") {
                        if (modifiedUser[value.split("=")[0]] && modifiedUser[value.split("=")[0]] !="") {
                            modifiedUser[value.split("=")[0]] = modifiedUser[value.split("=")[0]] + "|" + value.split("=")[1];
                        } else {
                            modifiedUser[value.split("=")[0]] = value.split("=")[1];
                        }
                    } else {
                        modifiedUser[value.split("=")[0]] = value.split("=")[1];
                    }

                })
            }

            return modifiedUser;

        };

        function updateProfile ($node, data, eventItem) {
            var actionInfo = settings.actionMap["updateProfile"],
                form = data.$target.closest("form")[0],
                modifiedUser = serializeUser(loggedUser, form);

            var parameters = {
                selectedFilters     : selectedFilters,
                action              : actionInfo,
                settings            : settings,
                loggedUser          : modifiedUser
            };
            On24Store.updateProfile(parameters)
                .done(function(user) {
                    alert("update profile successfully")
                    loggedUser = user;
                    reloadCheckedRoles();
                    //filterContentByCategory($node, checkBoxDataList, eventItem, "serverCategoryFilter");
                }).fail(function (data) {
                    console.log("fail")

                    //filterContentByCategory($node, checkBoxDataList, eventItem, "serverCategoryFilter");

                });

        };


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
                        var webcastUrl = On24WebcastUtil.getWebcastUrl(model, true);
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

        function loginUser ($node, data, eventItem) {
            var actionInfo = settings.actionMap["loginUser"],
                form = data.$target.closest("form")[0],
                modifiedUser = serializeUser(loggedUser, form);


            var parameters = {
                selectedFilters     : selectedFilters,
                action              : actionInfo,
                settings            : settings,
                user                : modifiedUser
            }
            On24Store.loginUser(parameters)
                .done(function(user) {
                    alert("login user successfully")
                    loggedUser = user;
                    form.reset();

                    var datakey = "data-" + settings.prefix + "-user",
                        nodes = On24Util.findByData(settings.container, datakey);
                    $.each( nodes, function (index, node) {
                        _replaceRepeaterFields($(node), "user");
                    });

                    checkNonVisibleItems();

                }).fail(function (data) {
                    console.log("There was an error while getting user information in login service");
                });
        };


        function registerUser ($node, data, eventItem) {
            var actionInfo = settings.actionMap["registerUser"],
                form = data.$target.closest("form")[0],
                modifiedUser = serializeUser(loggedUser, form);


            var parameters = {
                selectedFilters     : selectedFilters,
                action              : actionInfo,
                settings            : settings,
                user                : modifiedUser
            }

            On24Store.registerUser(parameters)
                .done(function(user) {
                    alert("register user successfully")
                    loggedUser = user;
                    form.reset();

                    var datakey = "data-" + settings.prefix + "-user",
                        nodes = On24Util.findByData(settings.container, datakey);
                    $.each( nodes, function (index, node) {
                        _replaceRepeaterFields($(node), "user");
                    });

                    checkNonVisibleItems();

                    //filterContentByCategory($node, checkBoxDataList, eventItem, "serverCategoryFilter");
                }).fail(function (data) {
                    console.log("fail")

                    //filterContentByCategory($node, checkBoxDataList, eventItem, "serverCategoryFilter");

                });

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
                        console.log("no more items")
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
                select.off();
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
                            } else if (eventName == "categoryFilter" || eventName == "serverCategoryFilter") {
                                filterContentByCategory($node, data, eventItem, eventName);
                            } else if (eventName == "sortContent") {
                                sortContent($node, data, eventItem);
                            } else if (eventName == "loadMoreContent") {
                                renderNextPage($node, data, eventItem);
                            } else if (eventName == "updateProfile") {
                                updateProfile($node, data, eventItem);
                            } else if (eventName == "registerUser") {
                                registerUser($node, data, eventItem);
                            } else if (eventName == "loginUser") {
                                loginUser($node, data, eventItem);
                            } else if (eventName == "launchContent") {
                                launchContent($node, data, eventItem);
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

            if (field == "user") {
                $.each(nodes, function (index, domItem ) {
                    if ($(domItem).data().on24Field != "") {
                        $(domItem).text(loggedUser[$(domItem).data().on24Field])
                        $(domItem).val(loggedUser[$(domItem).data().on24Field])

                    }
                });
            }

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
                            console.log("no more items");
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

        function overrideFieldData ( field, type , model, domItem ) {
            var actionInfo = settings.actionMap[type];
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
                                if (field == "assetTypes") {
                                    $(domItem).text(settings.derived[field](model, settings.assetTypes, On24Store.getStore()["assettype"]));
                                } else if (field == "categoryType"){
                                    $(domItem).text(settings.derived[field](model, settings.categoryType, On24Store.getStore()["category"]));
                                } else if (field == "interestAreasType"){
                                    $(domItem).text(settings.derived[field](model, settings.interestAreasType, On24Store.getStore()["interestareas"]));
                                } else if (field == "rolesType") {
                                    $(domItem).text(settings.derived[field](model, settings.rolesType, On24Store.getStore()["role"]));
                                } else if (field == "d2c_url" || field == "role_url" || field == "interest_url") {
                                    var link = "";
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
                                        $(domItem).attr('src', settings.derived[field](model,  settings.site));
                                    } else {
                                        $(domItem).text(settings.derived[field](model,  settings.site));
                                    }
                                }

                            } else {
                                $(domItem).text(model[field]);
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

                });

                if (removeAttr === true) {
                    $(items).removeAttr("data-" + settings.prefix + "-field");
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


        BrowserDetect.init();


        //Initialize the plugin
        init();

        return this;

    }

}(jQuery));

