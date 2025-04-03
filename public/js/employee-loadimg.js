//load image

$(document).ready(function () {
    var url = window.location.pathname;
    var empId = url.substring(url.lastIndexOf('/') + 1);

    $.ajax({
        type: "GET",
        url: "/employee-edit/"+empId,
        success: function(response){
        

                if(response.employee.image == null){
                    var image = "../images/No-Image.png"
                }else{
                    var image = response.employee.image;
                }

            if (response.status == 200) {
                
                $('#preview-image').attr("src", "../uploads/employee/"+image);
                
            }
            
        }
    });

});	