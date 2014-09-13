<?php

/**
 * @file
 * Default theme implementation to display a node.
 *
 * Available variables:
 * - $title: the (sanitized) title of the node.
 * - $content: An array of node items. Use render($content) to print them all,
 *   or print a subset such as render($content['field_example']). Use
 *   hide($content['field_example']) to temporarily suppress the printing of a
 *   given element.
 * - $user_picture: The node author's picture from user-picture.tpl.php.
 * - $date: Formatted creation date. Preprocess functions can reformat it by
 *   calling format_date() with the desired parameters on the $created variable.
 * - $name: Themed username of node author output from theme_username().
 * - $node_url: Direct URL of the current node.
 * - $display_submitted: Whether submission information should be displayed.
 * - $submitted: Submission information created from $name and $date during
 *   template_preprocess_node().
 * - $classes: String of classes that can be used to style contextually through
 *   CSS. It can be manipulated through the variable $classes_array from
 *   preprocess functions. The default values can be one or more of the
 *   following:
 *   - node: The current template type; for example, "theming hook".
 *   - node-[type]: The current node type. For example, if the node is a
 *     "Blog entry" it would result in "node-blog". Note that the machine
 *     name will often be in a short form of the human readable label.
 *   - node-teaser: Nodes in teaser form.
 *   - node-preview: Nodes in preview mode.
 *   The following are controlled through the node publishing options.
 *   - node-promoted: Nodes promoted to the front page.
 *   - node-sticky: Nodes ordered above other non-sticky nodes in teaser
 *     listings.
 *   - node-unpublished: Unpublished nodes visible only to administrators.
 * - $title_prefix (array): An array containing additional output populated by
 *   modules, intended to be displayed in front of the main title tag that
 *   appears in the template.
 * - $title_suffix (array): An array containing additional output populated by
 *   modules, intended to be displayed after the main title tag that appears in
 *   the template.
 *
 * Other variables:
 * - $node: Full node object. Contains data that may not be safe.
 * - $type: Node type; for example, story, page, blog, etc.
 * - $comment_count: Number of comments attached to the node.
 * - $uid: User ID of the node author.
 * - $created: Time the node was published formatted in Unix timestamp.
 * - $classes_array: Array of html class attribute values. It is flattened
 *   into a string within the variable $classes.
 * - $zebra: Outputs either "even" or "odd". Useful for zebra striping in
 *   teaser listings.
 * - $id: Position of the node. Increments each time it's output.
 *
 * Node status variables:
 * - $view_mode: View mode; for example, "full", "teaser".
 * - $teaser: Flag for the teaser state (shortcut for $view_mode == 'teaser').
 * - $page: Flag for the full page state.
 * - $promote: Flag for front page promotion state.
 * - $sticky: Flags for sticky post setting.
 * - $status: Flag for published status.
 * - $comment: State of comment settings for the node.
 * - $readmore: Flags true if the teaser content of the node cannot hold the
 *   main body content.
 * - $is_front: Flags true when presented in the front page.
 * - $logged_in: Flags true when the current user is a logged-in member.
 * - $is_admin: Flags true when the current user is an administrator.
 *
 * Field variables: for each field instance attached to the node a corresponding
 * variable is defined; for example, $node->body becomes $body. When needing to
 * access a field's raw values, developers/themers are strongly encouraged to
 * use these variables. Otherwise they will have to explicitly specify the
 * desired field language; for example, $node->body['en'], thus overriding any
 * language negotiation rule that was previously applied.
 *
 * @see template_preprocess()
 * @see template_preprocess_node()
 * @see template_process()
 *
 * @ingroup themeable
 */
?>
<div id="node-<?php print $node->nid; ?>" class="<?php print $classes; ?> clearfix"<?php print $attributes; ?>>

<?php /*  remove title print code

  <?php print render($title_prefix); ?>
  <?php if (!$page): ?>
    <h2<?php print $title_attributes; ?>><a href="<?php print $node_url; ?>"><?php print $title; ?></a></h2>
  <?php endif; ?>
  <?php print render($title_suffix); ?>

  <?php if ($display_submitted): ?>
    <div class="submitted">
      <?php print $submitted; ?>
    </div>
  <?php endif; ?>

*/ ?>

  <div class="content"<?php print $content_attributes; ?>>
    <?php
      // We hide the comments and links now so that we can render them later.

    // On24 - don't render the content.  Builder will do this.  Just pass it the ID
     // print render($content);
     ?>

<!----------------------------------------------------------------------------------------------------------------------
                                           Start Header Section
----------------------------------------------------------------------------------------------------------------------->
<div id="fixed-header">
    <div id="header">
        <div class="header-container">
            <img id="ibm-logo" src="/img/ibmLogo.png" alt="ibm logo"/>
            <img id="smarter-logo" src="/img/smarterLogo.png" alt="smarter business logo"/>

            <div class="float-right" style="width: 350px; height: 90px;">
                <div id="shareIcons" style="float:right; margin-top:10px;">
                    <img src="/img/share/facebook.png" data-on24-event-name="sharePage" data-on24-share-type="facebook"/>
                    <img src="/img/share/twitter.png" data-on24-event-name="sharePage" data-on24-share-type="twitter"/>
                     <img src="/img/share/linkedIn.png" data-on24-event-name="sharePage" data-on24-share-type="linkedIn"/>
                    <img src="/img/share/mail.png" data-on24-event-name="sharePage" data-on24-share-type="mail"/>

                    <!--<img src="/img/share/digg.png" data-on24-event-name="sharePage" data-on24-share-type="digg"/>
                    <img src="/img/share/delicious.png" data-on24-event-name="sharePage" data-on24-share-type="delicious"/>
                    <img src="/img/share/stumbleUpon.png" data-on24-event-name="sharePage" data-on24-share-type="stumbleUpon"/>-->
                 </div>
                <div class="float-right">
                    <ul id="nav-top-header" >
                        <li id="preferences" data-on24-visible="userLogged"><a>Edit Preferences</a><span>|</span></li>
                        <li id="login" data-on24-visible="!userLogged"><a>Login</a><span>|</span></li>
                        <li><a>About this Site</a><span>|</span></li>
                        <li><a data-on24-event-name="talkIBM" >Talk with IBM</a></li>
                        <a id="fancyTalkIBM" class="fancybox fancybox.iframe"></a>
                    </ul>
                </div>

            </div>

        </div>

        <div class="sections-container">
            <div class="sections-buttons">
                <div class="section-item interest-header">
                    <a>INTEREST AREAS</a>
                </div>
                <div class="section-item role-header">
                    <a>ROLES</a>
                </div>
                <div class="section-item grid-item signup-header" data-on24-visible="userLogged">
                    <button>Sign Up Now</button>
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
                                <img src="/img/leftArrow.png" class="prev-button" data-on24-attribute="id"/>
                                <img src="/img/selectCat.png" class="interest-image"/>
                                <img src="/img/rightArrow.png" class="next-button" data-on24-attribute="id"/>
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
                                <img src="/img/leftArrow.png" class="prev-button" data-on24-attribute="id"/>
                                <img src="/img/selectCat.png" class="interest-image"/>
                                <img src="/img/rightArrow.png" class="next-button" data-on24-attribute="id"/>
                                <h3 data-on24-field="title"></h3>
                            </div>
                            <p data-on24-field="description"></p>
                        </div>

                    </div>
                </div>

            </div>
        </div>






    </div>
</div>
<!----------------------------------------------------------------------------------------------------------------------
                                           End Header Section
----------------------------------------------------------------------------------------------------------------------->




<div class="main-container">

    <div class="header-bkg-container">
        <div class="header-bkg2-container">
            <div class="home-categories">
                <div id="home-categories-slider" class="slider-categories-content" data-on24-interestareas="repeat" data-on24-groupname="slider-home">
                    <div class="home-slider-content" data-on24-attribute="id">
                        <h1 class="title-home-slider" data-on24-field="title"></h1>
                        <p class="description-home-slider" data-on24-field="description"></p>
                        <div style="float:right;width: 200px; margin-top : -250px;">
                            <img id="ibm-logo" src="/img/sliderItem.png" alt="ibm logo" style="width:200px;"/>
                        </div>

                        <a class="slider-link" data-on24-field="interest_url"><span>Enter to </span><span data-on24-field="title"></span></a>

                    </div>
                </div>
                <div id="home-categories-slider-menu" class="slider-categories-menu" data-on24-interestareas="repeat" data-on24-groupname="slider-interest-areas" style="display: none;">
                    <div class="categories-menu-item" data-on24-attribute="id">
                        <a><span data-on24-field="title"></span></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="featured-content-container" style="min-height:500px;">
        <h1 class="float-left">Featured Content</h1>
        <div id="searchFeatured" class="float-right">
            <input class="search-featured-content" placeholder="Enter keyword" data-on24-event-name="search-featured"/>
        </div>

        <div id="featured-content-repeater" data-on24-featuredcontent="repeat" style="display: none;">

            <div class="content-item">
                <div class="img-container">
                    <img data-on24-field="content_image"/>
                    <p class="asset-type-label"><span  data-on24-field="assets"></span></p>
                </div>

                <p class="title-label"><span data-on24-field="title"></span></p>
                <p class="abstract-label"><span data-on24-field="abstract"></span></p>
                <a class="link-label" data-on24-field="d2c_url" data-on24-visible="isDocument"><span>Read More</span></a>
                <a class="link-label" data-on24-field="d2c_url" data-on24-visible="isWebcast"><span>Watch now</span></a>
                <div class="social-link-container">
                    <img data-on24-field="socialLinks"/>
                </div>

            </div>

        </div>
         <div id="featureContentLoading" style="display:none;width: 100%; height:300px; text-align: center; margin-top: 150px;">
            <div class="spinner-cube">
                <div></div>
                <div></div>
            </div>
            <p style="margin-top:15px; font-size: 14px;">loading...</p>
        </div>
    </div>
</div>

<!----------------------------------------------------------------------------------------------------------------------
                                           Start Footer Section
----------------------------------------------------------------------------------------------------------------------->



<div id="footer">
    <div class="footer-bkg-content">
        <div class="footer-solutions">
            <div class="footer-section">
                <div id="footer-container">
                    <span class="title">IBM Solutions</span>
                    <div class="categories-menu" data-on24-solutions="repeat" data-on24-groupname="solutions-footer">
                        <div class="category-footer" data-on24-attribute="id">
                            <span class="solutions-separator"> | </span>
                            <a data-on24-field="path"><span data-on24-field="title"></span></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="footer-bkg-content2">
        <img src="/img/followers.png"/>
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

 </div>


  

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
                featuredcontent : {
                    url : "/rest/featured",
                    loadingView : $("#featureContentLoading")
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

                $("#home-categories-slider-menu").homeSlider({
                    menuItem : $(".categories-menu-item"),
                    slider : $("#home-categories-slider"),
                    sliderContentItem : $(".home-slider-content")
                });
            }
        });


    });

</script>




</div>
