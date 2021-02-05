var dialogLocation = {
    custom: 1,
    centered: 2,
}

$(document).ready(function () {
    $(".description-show-button").click(function () {
        toggleDescriptionContent(false);
    });
    $(".description-close-button").click(function () {
        toggleDescriptionContent(true);
    });
});

//After loading, this method changes visibility. 
//Time out to create a soft transition.    
function getCanvas() {
    $("#loading-spinner").fadeOut(1000);
    setTimeout(function () { $("#canvas").fadeIn(1000); }, 1000);
}

//The following method for showing modal on the screen. 
//Mouse location for dynamic modal position. 
function getModal(location, selectedPart, mouseX, mouseY) {
    $(".ui-dialog-title").html(selectedPart);
    $("#dialog .dialog-description").html(getModalDescriptionText(selectedPart));

    if (location == dialogLocation.custom) {
        $("#dialog").dialog({
            modal: true,
            show: 'fade',
            open: function () {
                $(".ui-dialog").css("top", mouseY);
                $(".ui-dialog").css("left", mouseX);
                $(".ui-dialog-content").css("min-height", "auto");

                $(".ui-dialog-titlebar button").unbind("click");
                $('.ui-dialog-titlebar button').bind('click', function() { 
                    $("#dialog").dialog('destroy'); 
                }); 

                $('.ui-widget-overlay').bind('click', function(e) { 
                     $("#dialog").dialog('destroy'); 
                }); 
            }
        });
    } else if (location == dialogLocation.centered) {
        $("#dialog").dialog({
            modal: true,
            show: 'fade',
            open: function() {
                $(".ui-dialog-titlebar button").unbind("click");
                $('.ui-dialog-titlebar button').bind('click', function() { 
                    $("#dialog").dialog('destroy'); 
                }); 

                $('.ui-widget-overlay').bind('click', function(e) { 
                    $("#dialog").dialog('destroy'); 
                });
            }
        });
    }
}

//This function for show / hide description content. Function decides to act according to status.
function toggleDescriptionContent(isActive) {
    if (isActive) {
        $(".description-show-button").addClass("load");
        $(".description-show-button").removeClass("unload");
        $(".content-description-area").addClass("unload");
        $(".content-description-area").removeClass("load");
    } else {
        $(".description-show-button").removeClass("load");
        $(".description-show-button").addClass("unload");
        $(".content-description-area").removeClass("unload");
        $(".content-description-area").addClass("load");
    }
}

function getModalDescriptionText(title){
    switch(title) {
        case "Tires":
            return "The car's tires are eco-friendly, ‘talk’ to drivers, fix their own flats and change shape."
        case "Engine":
            return "Plug-in hybrids, which again couples a combustion engine to an electric motor, but allows the battery packs to be charged at any time through external sources, such as a charge point at the drivers home."
        case "Batteries":
            return "Silicon-dominant batteries would likely enable energy densities of up to 400 Wh/kg by 2025. Most vehicles using this technology will likely have charging powers of 300 kW+."
        default:
            return "Content could not found."
    }
}