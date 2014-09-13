<?php

/**
 * @file
 * Main view template.
 *
 * Variables available:
 * - $classes_array: An array of classes determined in
 *   template_preprocess_views_view(). Default classes are:
 *     .view
 *     .view-[css_name]
 *     .view-id-[view_name]
 *     .view-display-id-[display_name]
 *     .view-dom-id-[dom_id]
 * - $classes: A string version of $classes_array for use in the class attribute
 * - $css_name: A css-safe version of the view name.
 * - $css_class: The user-specified classes names, if any
 * - $header: The view header
 * - $footer: The view footer
 * - $rows: The results of the view query, if any
 * - $empty: The empty text to display if the view is empty
 * - $pager: The pager next/prev links to display, if any
 * - $exposed: Exposed widget form/info to display
 * - $feed_icon: Feed icon to display, if any
 * - $more: A link to view more, if any
 *
 * @ingroup views_templates
 */
?>
<!-- start header template -->


<!----------------------------------------------------------------------------------------------------------------------
                                           Start Header Section
----------------------------------------------------------------------------------------------------------------------->
<div id="fixed-header">
    <div id="header">
        <div class="header-container">
            <img id="ibm-logo" src="img/ibmLogo.png" alt="ibm logo"/>
            <img id="smarter-logo" src="img/smarterLogo.png" alt="smarter business logo"/>
            <ul id="nav-top-header" class="float-right">
                <li id="preferences" data-on24-visible="userLogged"><a>Edit Preferences</a><span>|</span></li>
                <li id="login" data-on24-visible="!userLogged"><a>Login</a><span>|</span></li>
                <li><a>About this Site</a><span>|</span></li>
                <li><a>Talk with IBM</a></li>
            </ul>
        </div>

        <div class="sections-container">
            <div class="section-item interest-header">
                <a>INTEREST AREAS</a>
            </div>
            <div class="section-item role-header">
                <a>ROLES</a>
            </div>
            <div class="section-item grid-item signup-header" data-on24-visible="userLogged">
                <button>Sign Up Now</button>
            </div>
        </div>


        <div id="role-menu" style="display: none;">
            <div class="menu-item-list" data-on24-roles="repeat">
                <div class="slider-menu" data-on24-attribute="id">
                    <a data-on24-field="role_url"><span data-on24-field="title"></span></a>
                </div>
            </div>
            <div class="slider-container" data-on24-roles="repeat" data-on24-groupname="slider-role">
                <div class="slider-content" data-on24-attribute="id">
                    <div >
                        <img src="img/leftArrow.png" class="prev-button" data-on24-attribute="id"/>
                        <img src="img/contentImage.png" class=""/> <!--data-on24-field="content_image" -->
                        <img src="img/rightArrow.png" class="next-button" data-on24-attribute="id"/>
                        <h3 data-on24-field="title" ></h3>
                    </div>
                    <p  data-on24-field="description"></p>
                </div>

            </div>
        </div>

        <div id="interest-menu" style="display: none;">
            <div class="menu-item-list" data-on24-interestareas="repeat">
                <div class="slider-menu" data-on24-attribute="id">
                    <a data-on24-field="interest_url"><span data-on24-field="title"></span></a>
                </div>
            </div>
            <div class="slider-container" data-on24-interestareas="repeat" data-on24-groupname="slider-interest">
                <div class="slider-content" data-on24-attribute="id">
                    <div>
                        <img src="img/leftArrow.png" class="prev-button" data-on24-attribute="id"/>
                        <img src="img/contentImage.png" class=""/> <!--data-on24-field="content_image" -->
                        <img src="img/rightArrow.png" class="next-button" data-on24-attribute="id"/>
                        <h3 data-on24-field="title"></h3>
                    </div>
                    <p data-on24-field="description"></p>
                </div>

            </div>
        </div>

    </div>
</div>

<!----------------------------------------------------------------------------------------------------------------------
                                           End Header Section
----------------------------------------------------------------------------------------------------------------------->



<!----------------------------------------------------------------------------------------------------------------------
                                           Start Main Container Section
----------------------------------------------------------------------------------------------------------------------->


<div class="main-container">

    <div class="slider-categories-content">
        <img class="image-container" src="img/contentImage.png"/>
        <div class="category-info-container">
            <p class="categoryTitle">Title of the category or interest area selected</p>
            <p class="categoryDescription">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur.</p>
        </div>
    </div>


    <div class="content-container">
        <div id="filters-content" class="float-left">

            <div>
                <div class="filter-section" data-on24-visible="isInterestPage" data-on24-event-name="roleFilter">
                    <label>Roles</label>
                    <select class="filter-content" data-on24-roles="repeat" data-on24-groupname="category-filter" >
                        <option data-on24-field="title"></option>
                    </select>
                </div>

                <div class="filter-section" data-on24-visible="isRolePage" data-on24-event-name="interestAreaFilter">
                    <label>Interest Areas</label>
                    <select class="filter-content" data-on24-interestareas="repeat" data-on24-groupname="category-filter">
                        <option data-on24-field="title"></option>
                    </select>
                </div>

                <div class="filter-section" data-on24-event-name="assetFilter">
                    <label>Asset types</label>
                    <select class="filter-content" data-on24-assets="repeat" data-on24-groupname="category-filter">
                        <option data-on24-field="title"></option>
                    </select>
                </div>
            </div>


            <div class="filter-section">
                <label>Keyword</label>
                <input class="search-featured-content" placeholder="Enter keyword" data-on24-event-name="search" data-on24-groupname="category-filter"/>
            </div>


            <div class="filter-section sort-section">
                <label>Sort Order</label>
                <select class="filter-content" data-on24-event-name="sortContent" data-on24-groupname="category-filter">
                    <option data-on24-sort-field="alphabetical:title">Title (alphabetical)</option>
                    <option data-on24-sort-field="alphabetical:abstract">Abstract (alphabetical)</option>
                    <!--<option data-on24-sort-field="date:createTimeStamp">Newest</option>-->
                    <option data-on24-sort-field="popular:id">Most Popular (use id field)</option>
                </select>
            </div>


        </div>



        <div id="featured-content-repeater" data-on24-content="repeat" data-on24-groupname="category-filter">

            <div class="content-item">
                <div class="img-container">
                    <img data-on24-field="content_image" style="width: 324px; height: 124px;"/>
                    <p class="asset-type-label" data-on24-field="assets"></p>

                </div>

                <p class="title-label"><span data-on24-field="title"></span></p>
                <p class="abstract-label"><span data-on24-field="abstract"></span></p>
                <a class="link-label" data-on24-field="d2c_url"><span>Read More</span></a>
                <div class="social-link-container">
                    <img data-on24-field="socialLinks"/>
                </div>

            </div>

        </div>

        <div class="paginatorContainer" style="text-align: center; width: 100%;margin-top: 20px;">
            <p data-on24-event-name="loadMoreContent">Load More Contents</p>
        </div>

    </div>

</div>

<!----------------------------------------------------------------------------------------------------------------------
                                           End Main Container Section
----------------------------------------------------------------------------------------------------------------------->

<!----------------------------------------------------------------------------------------------------------------------
                                           Start Footer Section
----------------------------------------------------------------------------------------------------------------------->


<div id="footer">
    <div id="footer-container">
        <span class="title">IBM Solutions</span>
        <div class="categories-menu" data-on24-solutions="repeat" data-on24-groupname="solutions-footer">
            <div class="category-footer" data-on24-attribute="id">
                <a data-on24-field="path"><span data-on24-field="title"></span></a>
            </div>
        </div>
    </div>

    <div id="footer--bottom-container">
        <p>
            <span class="link">© 2014 IBM</span>
            <span style=""> | </span>
            <a href="/contact.html"><span class="link">Contact</span></a>
            <span style=""> | </span>
            <a href="/privacy.html"><span class="link">Privacy</span></a>
            <span style=""> | </span>
            <a href="/terms.html"><span class="link">Terms Of Use</span></a>
            <span style=""> | </span>
            <a href="/accessibility.html"> <span class="link">Accessibility</span></a>
        </p>
    </div>
</div>



<!----------------------------------------------------------------------------------------------------------------------
                                           End Footer Section
----------------------------------------------------------------------------------------------------------------------->



<!----------------------------------------------------------------------------------------------------------------------
                                           Start Pop Up Section
----------------------------------------------------------------------------------------------------------------------->


<!-- pop up-->
<div id="editPreferences" title="Edit Preferences">
    <form > <!--data-on24-user="false"-->
        <fieldset>

            <div class="form-container">
                <div class="form-item">
                    <div class="form-label">
                        <label>First Name</label>
                    </div>
                    <div class="form-field">
                        <input type="text"  name="firstName" value="" class="text ui-widget-content ui-corner-all"> <!--data-on24-field="firstName" -->
                    </div>
                </div>

                <div class="form-item">
                    <div class="form-label">
                        <label>Last Name</label>
                    </div>
                    <div class="form-field">
                        <input type="text"  name="lastName" value="" class="text ui-widget-content ui-corner-all"><!-- data-on24-field="lastName" -->
                    </div>
                </div>

                <div class="form-item">
                    <div class="form-label">
                        <label>Email</label>
                    </div>
                    <div class="form-field">
                        <input type="text"  name="email" value="" class="text ui-widget-content ui-corner-all"><!--data-on24-field="email" -->
                    </div>
                </div>
            </div>

            <div class="submit-container">
                <input type="submit" style="" value="Update Preferences"> <!-- data-on24-event-name="updateProfile"-->
            </div>

        </fieldset>
    </form>
</div>


<!-- pop up-->
<div id="loginUser" title="Login">
    <form > <!--data-on24-user="false"-->
        <fieldset>
            <div class="form-container">
                <div class="form-item">
                    <div class="form-label">
                        <label>Email</label>
                    </div>
                    <div class="form-field">
                        <input type="text"  name="email" value="" class="text ui-widget-content ui-corner-all">
                    </div>
                </div>

                <div class="form-item">
                    <div class="form-label">
                        <label>Password</label>
                    </div>
                    <div class="form-field">
                        <input type="text"  name="password" value="" class="text ui-widget-content ui-corner-all">
                    </div>
                </div>
            </div>

            <div class="submit-container">
                <input type="submit" style="" value="Sign In"> <!-- data-on24-event-name="updateProfile"-->
            </div>
        </fieldset>
    </form>
</div>


<!----------------------------------------------------------------------------------------------------------------------
                                           End Pop Up Section
----------------------------------------------------------------------------------------------------------------------->




<!--jQuery UI -->
<link rel="stylesheet" href="//code.jquery.com/ui/1.11.0/themes/smoothness/jquery-ui.css">
<script src="//code.jquery.com/ui/1.11.0/jquery-ui.js"></script>

<script>


    $(document).ready(function(){


        var editPreferencesDialog = $( "#editPreferences" ).dialog({
            autoOpen: false,
            height: 325,
            width: 500,
            modal: true,
            buttons: {

            },
            close: function() {

            }
        });

        $("#preferences").click(function() {
            editPreferencesDialog.dialog( "open" );
        });

        var loginDialog = $( "#loginUser" ).dialog({
            autoOpen: false,
            height: 275,
            width: 500,
            modal: true,
            buttons: {

            },
            close: function() {

            }
        });

        $("#login").click(function() {
            loginDialog.dialog( "open" );
        });

        //We need to instantiate the framework when DOM is renderer. In this example, all DOM items are static, so when
        //document is ready, all items are renderer and it's the correct moment to call builder framework.
        $('body').builder({
            actionMap: {
                assets : {
                    url : "/rest/list/assets"
                },
                solutions : {
                    url : "/rest/list/solutions"
                },
                roles : {
                    url : "/rest/list/roles"
                },
                interestareas : {
                    url : "/rest/list/interest-areas"
                },
                journeys : {
                    url : "/rest/list/journeys"
                },
                content : {
                    url : "/rest/role/<?php print $header; ?>"
                }

            },
            derived : {
                "isRolePage" : function (categories, rolePageId, categoryUrlId) {
                    return true;
                },

                "isInterestPage" : function (categories, rolePageId, categoryUrlId) {
                    return false;
                },

                "isSolutionPage" : function (categories, rolePageId, categoryUrlId) {
                    return false;
                }
            },
            ready : function () {
                $(".role-header").headerMenu({
                    menu : $("#role-menu"),
                    sliderMenuItem : ".slider-menu",
                    sliderContentItem : ".slider-content",
                    prevButton : ".prev-button",
                    nextButton : ".next-button"
                });

                $(".interest-header").headerMenu({
                    menu : $("#interest-menu"),
                    sliderMenuItem : ".slider-menu",
                    sliderContentItem : ".slider-content",
                    prevButton : ".prev-button",
                    nextButton : ".next-button"
                });
            }
        });
    });

</script>




(This is views-view--role-view.tpl.php - almost stock.)

Argument: <?php //dpm($view->args); ?>

view: <?php //dpm($view); ?>

<br/>header (used as tid): <?php dpm($header); ?>

<?php // <br/>rows: <?php dpm($rows); ?>



</div><?php /* class view */ ?>
