$(document).ready(function () {

    $.getJSON('http://localhost:8080/getlist', function (json) {
        $("table").DataTable({
            "bProcessing": true,
            "sPaginationType": "full_numbers",
            data: json,
            "columns": [
                { "data": "id" },
                { "data": "name" },
                { "data": "email" },
                { "data": "universityName" },
                {
                    "mData": null,
                    "mRender": function (data, type, full) {
                        return '<center><a class="edit1" href ="#edit_" rel = "modal:open"><i class="material-icons">edit</i></a></center>';
                        // 
                        //&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    }
                },
                {
                    "mData": null,
                    "mRender": function (data, type, full) {
                        // return '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class="delete" ' + full[0] + '>' + 'Delete' + '</button>';
                        return '<center><a href="#" class="delete" ' + full[0] + '>' + '<i class="material-icons">delete</i>' + '</a></center>';


                    }
                }
            ]

        });

    });
    console.log(columns)
});

const validateEmail = function (email) {
    const re = /^([a-zA-Z\d+)(\.[a-zA-Z\d]+)?@([a-zA-Z\d]+).([a-zA-Z]{2,8})(\.[a-zA-Z\d]+)?$/;
    return re.test(String(email).toLowerCase());
}
const validateName = function (name) {
    if (name === null || name === "") {
        return false
    }
    else {
        const re = /^([a-zA-Z\s]+)$/;
        return re.test(String(name).toLowerCase());
    }

}

const validateUniversity = function (name) {
    if (name === null || name === "") {

        return false
    }
    else {
        const re = /^([a-zA-Z\s]+)$/;
        return re.test(String(name));
    }

}

$(document).delegate('#addNew', 'click', function (event) {
    event.preventDefault();
    for
    var id = $('#id').val();

    var name = $('#name').val();
    var email = $('#email').val();
    var uname = $('#uname').val();


    var jsonformat = { "id": id, "name": name, "email": email, "universityName": uname };

    if (!validateName(name)) {
        console.log('okay')
        alert('invalid name!!');
    }
    else if (!validateEmail(email)) {

        alert('invalid email!!');
    }
    else if (!validateUniversity(uname)) {
        alert('invalid university name!!');
    }
    else {
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "http://localhost:8080/create",
            data: JSON.stringify(jsonformat),
            cache: false,
            success: function (result) {
                console.log(uname)
                $('#name').val('');
                $('#email').val('');
                $('#uname').val('');
                $("#msg").html("<span style='color: green'>Student added successfully</span>");
                window.setTimeout(function () { location.reload() }, 1000)
            },
            error: function (err) {
                $("#msg").html("<span style='color: red'>Name is required</span>");
            }
        });

    }

});
var deleteContextObj;
var editContextObj

function deleteContext() {
    var parent = $(deleteContextObj).parent().parent();
    var idw = $(deleteContextObj).closest('tr');
    var id = idw.find('td:eq(0)').text();

    var name = idw.find('td:eq(1)').text();
    var email = idw.find('td:eq(2)').text();
    var uname = idw.find('td:eq(3)').text();

     if (confirm(`Are you sure? you want to delete record?\n\nID\t\t:\t${id}\nName\t:\t${name}\nEmail\t:\t${email}\nUname\t:\t${uname}`)) {
        $.ajax({
            type: "DELETE",
            url: "http://localhost:8080/delete/" + id,
            cache: false,
            success: function () {

                parent.fadeOut('slow', function () {
                    $(this).remove();
                });
                location.reload(true)
            },
            error: function () {
                $('#err').html('<span style=\'color:red; font-weight: bold; font-size: 30px;\'>Error deleting record').fadeIn().fadeOut(4000, function () {
                    $(this).remove();
                });
            }
        });
    }

}

function editContext() {

    var parent = $(editContextObj).parent().parent();
    var idw = $(editContextObj).closest('tr');
    id1 = idw.find('td:eq(0)').text();
    var name = idw.find('td:eq(1)').text();
    var email = idw.find('td:eq(2)').text();
    var university = idw.find('td:eq(3)').text();
    $('#edit_').modal({
        show: true
    });
    $("#name1").val(name);
    $("#email1").val(email);
    $("#uname1").val(university);


}


// window.addEventListener("contextmenu", function (event) {
//     event.preventDefault();
//     var contextElement = document.getElementById("context-menu");
//     contextElement.style.top = event.pageY + "px";
//     contextElement.style.left = event.pageX + "px";
//     contextElement.classList.add("active");
// });
// window.addEventListener("click", function () {
//     document.getElementById("context-menu").classList.remove("active");
// });



$(document).delegate('td', 'contextmenu', function (event) {
    event.preventDefault();
    var contextElement = document.getElementById("context-menu");
    contextElement.style.top = event.pageY + "px";
    contextElement.style.left = event.pageX + "px";
    contextElement.classList.add("active");
    deleteContextObj = this;
    editContextObj = this;
    window.addEventListener("click", function () {
        document.getElementById("context-menu").classList.remove("active");
    });

});



$(document).delegate('.delete', 'click', function (event) {
    event.preventDefault();
    

    var parent = $(this).parent().parent();
    var idw = $(this).closest('tr');
    var id = idw.find('td:eq(0)').text();

    var name = idw.find('td:eq(1)').text();
    var email = idw.find('td:eq(2)').text();
    var uname = idw.find('td:eq(3)').text();

    if (confirm(`Are you sure? you want to delete record?\n\nID\t\t:\t${id}\nName\t:\t${name}\nEmail\t:\t${email}\nUname\t:\t${uname}`)) {
        $.ajax({
            type: "DELETE",
            url: "http://localhost:8080/delete/" + id,
            cache: false,
            success: function () {

                parent.fadeOut('slow', function () {
                    $(this).remove();
                });
                location.reload(true)
            },
            error: function () {
                $('#err').html('<span style=\'color:red; font-weight: bold; font-size: 30px;\'>Error deleting record').fadeIn().fadeOut(4000, function () {
                    $(this).remove();
                });
            }
        });
    } else {

    }


    // }
});
var id1;
$(document).delegate('.edit1', 'click', function () {

    var parent = $(this).parent().parent();
    var idw = $(this).closest('tr');
    id1 = idw.find('td:eq(0)').text();
    var name = idw.find('td:eq(1)').text();
    var email = idw.find('td:eq(2)').text();
    var university = idw.find('td:eq(3)').text();
    $("#name1").val(name);
    $("#email1").val(email);
    $("#uname1").val(university);
});



$(document).delegate('#save3', 'click', function (event) {
    event.preventDefault();


    var name = $('#name1').val();
    var email = $('#email1').val();
    var uname = $('#uname1').val();

    if (!validateName(name)) {
        console.log('okay')
        alert('invalid name!!');
    }
    else if (!(validateEmail(email))) {
        alert('invalid email!!');
    }
    else if (!validateUniversity(uname)) {
        alert('invalid university name!!');
    }
    else {

        $.ajax({
            type: "PUT",
            contentType: "application/json; charset=utf-8",
            url: "http://localhost:8080/put/",
            data: JSON.stringify({ "id": id1, "name": name, "email": email, "universityName": uname }),
            cache: false,
            success: function (result) {

                $("#msg3").html("<span style='color: green'>Student record edited successfully</span>");
                window.setTimeout(function () { location.reload() }, 1000)
            },
            error: function (err) {

                $("#msg3").html("<span style='color: red'>something went wrong</span>");
            }
        });

    }

});
