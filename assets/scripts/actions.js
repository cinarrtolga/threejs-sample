function getCanvas() {
    $("#loading-spinner").fadeOut(1000);
    setTimeout(function () { $("#canvas").fadeIn(1000); }, 1000);
}

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