//After loading, this method changes visibility. 
//Time out to create a soft transition.    
function getCanvas() {
    $("#loading-spinner").fadeOut(1000);
    setTimeout(function () { $("#canvas").fadeIn(1000); }, 1000);
}

//The following method for showing modal on the screen. 
//Mouse location for dynamic modal position. 
function getModal(selectedPart, mouseX, mouseY) {
    $(".ui-dialog-title").html(selectedPart);
    $("#dialog .dialog-description").html("Lorem Ipsum");

    $("#dialog").dialog({
        modal: true,
        show: 'fade',
        open: function(){
            $(".ui-dialog").css("top", mouseY);
            $(".ui-dialog").css("left", mouseX);
            $(".ui-dialog-content").css("min-height", "auto");
        }
    });
}