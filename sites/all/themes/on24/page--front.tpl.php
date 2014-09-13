<?php
/**
 * @file
 * Returns the HTML for a single Drupal page.
 *
 * Complete documentation for this file is available online.
 * @see https://drupal.org/node/1728148
 */
  $path=path_to_theme();
  // print_r($path);
?>
<html>
	<head lang="en">
    <meta charset="UTF-8">
    <title>Drupal Single Content Page</title>
</head>
<div id="fixed-header">
    <div id="header">
        <div class="header-container">
            <img id="ibm-logo" src="/img/ibmLogo.png" alt="ibm logo"/>
            <img id="smarter-logo" src="/img/smarterLogo.png" alt="smarter business logo"/>

            <div class="float-right" style="width: 350px; height: 90px;">
                <div id="shareIcons" style="float:right; margin-top:10px;">
                	<!-- <img src="/<?php print_r($path) ?>/images/screenshot.png" data-on24-event-name="sharePage" data-on24-share-type="facebook"/> -->
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
                        <li id="register" data-on24-visible="!userLogged"><a href="#">Register</a><span>|</span></li>

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
                    <!--<img data-on24-field="socialLinks"/>-->

                    <img src="/img/share/facebook.png" data-on24-event-name="shareContent" data-on24-share-type="facebook" data-on24-attribute="id"/>
                    <img src="/img/share/twitter.png" data-on24-event-name="shareContent" data-on24-share-type="twitter" data-on24-attribute="id"/>
                    <img src="/img/share/linkedIn.png" data-on24-event-name="shareContent" data-on24-share-type="linkedIn" data-on24-attribute="id"/>
                    <img src="/img/share/mail.png" data-on24-event-name="shareContent" data-on24-share-type="mail" data-on24-attribute="id"/>

                    <!--<img src="/img/share/digg.png" data-on24-event-name="sharePage" data-on24-share-type="digg"/>
                    <img src="/img/share/delicious.png" data-on24-event-name="sharePage" data-on24-share-type="delicious"/>
                    <img src="/img/share/stumbleUpon.png" data-on24-event-name="sharePage" data-on24-share-type="stumbleUpon"/>-->


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
<!----------------------------------------------------------------------------------------------------------------------
                                           Start Pop Up Section
----------------------------------------------------------------------------------------------------------------------->
<!-- pop up-->
<div id="loginUser" title="Login">
    <form method="post"> <!--data-on24-user="false"-->
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


<div id="signUpUser" title="signUp">
    <form> <!--data-on24-user="false"-->
        
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


        /**var editPreferencesDialog = $( "#editPreferences" ).dialog({
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
        });*/

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
	
		var signUpDialog = $( "#signUpUser" ).dialog({
            autoOpen: false,
            height: 475,
            width: 500,
            modal: true,
            buttons: {

            },
            close: function() {

            }
        });
        
        $("#register").click(function() {
            signUpDialog.dialog( "open" );
        });
        
        $('#signUpUser #reg').click(function(){
        	return false;
        });

        //We need to instantiate the framework when DOM is renderer. In this example, all DOM items are static, so when
        //document is ready, all items are renderer and it's the correct moment to call builder framework.
        $('body').builder({
        	supportedFields:[ "roles", "interestareas","journeys", "solutions", "content", "featuredcontent","relatedcontent", "singlecontent"],
			preloadFields:[ "roles", "interestareas", "journeys","solutions"],
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

</html>