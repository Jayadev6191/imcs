<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>Drupal Single Content Page</title>

    <link rel="stylesheet" href="css/style.css">
</head>

<body>

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
                        <img src="img/contentImage.png" class="interest-image"/>
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
                        <img src="img/contentImage.png" class="interest-image"/>
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
        <div id="single-content-container">
            <div class="single-content-item" data-on24-singlecontent="repeat">
                <div class="img-container">
                    <img data-on24-field="thumbnailLarge"/>
                    <p class="asset-type-label" data-on24-field="assets"></p>
                </div>
                <p class="category-label">Category: <span data-on24-field="solutions"></span></p>
                <p class="category-label">Interest Areas: <span data-on24-field="interestAreasType"></span></p>
                <p class="category-label">Roles: <span data-on24-field="rolesType"></span></p>
                <div class="content-info">
                    <p class="title-label"><span data-on24-field="title"></span></p>
                    <p class="abstract-label"><span data-on24-field="description"></span></p>
                    <p class="teaser-label"><span data-on24-field="teaser"></span></p>
                    <div class="login-section">
                        <a class="link-label"><span>Sing in with Email</span></a>
                        <div class="social-link-container">
                            <img data-on24-field="socialLinks"/>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div class="related-content-container" data-on24-relatedcontent="repeat">
            <div class="content-item">
                <div class="img-container">
                    <img data-on24-field="content_image"/>
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



<script type="text/javascript" src="../js/jquery.1.9.1.js"></script>
<script type="text/javascript" src="../js/builderDrupal.js"></script>
<script type="text/javascript" src="../plugins/jquery.header.menu.1.0.0.js"></script>

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
                singlecontent : {
                    url : "/rest/content-view/39"
                },
                relatedcontent : {
                    url : "/rest/content-related/39"
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

</body>
</html>
