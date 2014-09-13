    $(document).ready(function(){
        //We need to instantiate the framework when DOM is renderer. In this example, all DOM items are static, so when
        //document is ready, all items are renderer and it's the correct moment to call builder framework.
        $('body').builder({
            actionMap: {
                assettype : {
                    url : "/rest/list/assets"
                },
                role : {
                    url : "/rest/list/roles"
                },
                interestareas : {
                    url : "/rest/list/interest-areas"
                },
                singlecontent : {
                    url : "/rest/content-view/41"
                },
                relatedcontent : {
                    url : "/rest/content-related/41"
                }
            },

            preloadFields:              ["assettype", "role", "interestareas"]

        });
    });